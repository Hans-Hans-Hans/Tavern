from __future__ import annotations

import argparse
import os
import sys
from pathlib import Path

from sqlalchemy import MetaData, create_engine, func, select, text
from sqlalchemy.exc import SQLAlchemyError


def _project_root() -> Path:
    return Path(__file__).resolve().parents[1]


def _load_app_models() -> None:
    root = _project_root()
    server_root = root / "server"
    if str(server_root) not in sys.path:
        sys.path.insert(0, str(server_root))
    # Register all mapped tables before Base.metadata.create_all(...)
    from app.features.users import models as _users_models  # noqa: F401
    from app.features.servers import models as _servers_models  # noqa: F401
    from app.features.channels import models as _channels_models  # noqa: F401
    from app.features.messages import models as _messages_models  # noqa: F401
    from app.features.dms import models as _dms_models  # noqa: F401
    from app.features.push import models as _push_models  # noqa: F401


def _table_row_count(conn, table) -> int:
    return int(conn.execute(select(func.count()).select_from(table)).scalar() or 0)


def _truncate_target_tables(conn, metadata: MetaData) -> None:
    for table in reversed(metadata.sorted_tables):
        conn.execute(table.delete())


def _copy_table_rows(source_conn, target_conn, source_table, target_table, chunk_size: int) -> int:
    target_columns = {col.name for col in target_table.columns}
    shared_columns = [col for col in source_table.columns if col.name in target_columns]
    if not shared_columns:
        return 0

    query = select(*shared_columns)
    pk_cols = list(source_table.primary_key.columns)
    if pk_cols:
        query = query.order_by(*pk_cols)

    src_result = source_conn.execution_options(stream_results=True).execute(query).mappings()
    copied = 0
    while True:
        chunk = src_result.fetchmany(chunk_size)
        if not chunk:
            break
        payload = [{k: row[k] for k in row.keys()} for row in chunk]
        target_conn.execute(target_table.insert(), payload)
        copied += len(payload)
    return copied


def _reset_postgres_sequences(conn, metadata: MetaData) -> None:
    if conn.dialect.name != "postgresql":
        return
    for table in metadata.sorted_tables:
        for col in table.columns:
            if not col.primary_key:
                continue
            if str(col.type).upper() not in {"INTEGER", "BIGINT", "SMALLINT"}:
                continue

            seq_name = conn.execute(
                text("SELECT pg_get_serial_sequence(:table_name, :column_name)"),
                {"table_name": table.name, "column_name": col.name},
            ).scalar()
            if not seq_name:
                continue

            max_value = conn.execute(select(func.max(col)).select_from(table)).scalar()
            if max_value is None:
                conn.execute(text("SELECT setval(:seq_name, 1, false)"), {"seq_name": seq_name})
            else:
                conn.execute(
                    text("SELECT setval(:seq_name, :next_value, true)"),
                    {"seq_name": seq_name, "next_value": int(max_value)},
                )


def migrate(sqlite_url: str, postgres_url: str, truncate_target: bool, chunk_size: int) -> None:
    if not sqlite_url.lower().startswith("sqlite"):
        raise ValueError("Source URL must be SQLite")
    if not postgres_url.lower().startswith("postgresql"):
        raise ValueError("Target URL must be PostgreSQL")

    source_engine = create_engine(sqlite_url)
    target_engine = create_engine(postgres_url)

    _load_app_models()
    from app.db.base import Base

    # Ensure target schema exists based on current app models.
    Base.metadata.create_all(bind=target_engine)

    source_md = MetaData()
    source_md.reflect(bind=source_engine)
    source_tables = [t for t in source_md.sorted_tables if t.name != "sqlite_sequence"]

    target_md = MetaData()
    target_md.reflect(bind=target_engine)
    target_by_name = {t.name: t for t in target_md.sorted_tables}

    missing_in_target = [t.name for t in source_tables if t.name not in target_by_name]
    if missing_in_target:
        names = ", ".join(missing_in_target)
        raise RuntimeError(f"Target is missing tables present in source: {names}")

    with source_engine.connect() as source_conn, target_engine.begin() as target_conn:
        replication_role_swapped = False
        if target_conn.dialect.name == "postgresql":
            # Preserve legacy SQLite datasets that may contain FK-orphan rows.
            target_conn.execute(text("SET session_replication_role = replica"))
            replication_role_swapped = True

        try:
            if truncate_target:
                _truncate_target_tables(target_conn, target_md)
            else:
                non_empty = [
                    t.name
                    for t in source_tables
                    if _table_row_count(source_conn, t) > 0 and _table_row_count(target_conn, target_by_name[t.name]) > 0
                ]
                if non_empty:
                    raise RuntimeError(
                        "Target has existing rows for source tables. "
                        "Re-run with --truncate-target if this is intentional. "
                        f"Tables: {', '.join(non_empty)}"
                    )

            total_rows = 0
            for source_table in source_tables:
                target_table = target_by_name[source_table.name]
                copied = _copy_table_rows(source_conn, target_conn, source_table, target_table, chunk_size)
                total_rows += copied
                print(f"[migrate] {source_table.name}: copied {copied} rows")

            _reset_postgres_sequences(target_conn, target_md)
            print(f"[migrate] done: copied {total_rows} total rows")
        finally:
            if replication_role_swapped:
                target_conn.execute(text("SET session_replication_role = origin"))


def main() -> None:
    parser = argparse.ArgumentParser(description="Migrate Tavern data from SQLite to PostgreSQL.")
    parser.add_argument(
        "--source",
        default=os.getenv("SQLITE_DATABASE_URL", "sqlite:///./tavern.db"),
        help="SQLite DATABASE_URL (default: sqlite:///./tavern.db)",
    )
    parser.add_argument(
        "--target",
        default=os.getenv("POSTGRES_DATABASE_URL", ""),
        help="PostgreSQL DATABASE_URL (or set POSTGRES_DATABASE_URL env var)",
    )
    parser.add_argument(
        "--truncate-target",
        action="store_true",
        help="Delete existing target rows before copying.",
    )
    parser.add_argument(
        "--chunk-size",
        type=int,
        default=2000,
        help="Rows per batch insert (default: 2000).",
    )
    args = parser.parse_args()

    if not args.target:
        raise SystemExit("Missing --target PostgreSQL URL (or POSTGRES_DATABASE_URL env var)")

    try:
        migrate(
            sqlite_url=args.source.strip(),
            postgres_url=args.target.strip(),
            truncate_target=bool(args.truncate_target),
            chunk_size=max(1, int(args.chunk_size)),
        )
    except (SQLAlchemyError, RuntimeError, ValueError) as exc:
        raise SystemExit(f"Migration failed: {exc}") from exc


if __name__ == "__main__":
    main()
