from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

engine_kwargs = {}
if str(DATABASE_URL or "").lower().startswith("sqlite"):
    # SQLite-only flag; passing this to PostgreSQL/MySQL raises errors.
    engine_kwargs["connect_args"] = {"check_same_thread": False}

engine = create_engine(DATABASE_URL, **engine_kwargs)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush  = False,
    bind       = engine
)
