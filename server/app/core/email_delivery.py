import smtplib
from email.message import EmailMessage

from sqlalchemy.orm import Session

from app.core.app_settings import (
    SMTP_FROM_EMAIL_KEY,
    SMTP_HOST_KEY,
    SMTP_PASSWORD_KEY,
    SMTP_PORT_KEY,
    SMTP_USERNAME_KEY,
    SMTP_USE_SSL_KEY,
    SMTP_USE_TLS_KEY,
    get_bool_setting,
    get_int_setting,
    get_string_setting,
)
from app.core.config import settings


def send_verification_code_email(db: Session, to_email: str, code: str, ttl_minutes: int) -> None:
    host = get_string_setting(db, SMTP_HOST_KEY, settings.SMTP_HOST).strip()
    from_email = get_string_setting(db, SMTP_FROM_EMAIL_KEY, settings.SMTP_FROM_EMAIL).strip()
    if not host or not from_email:
        raise RuntimeError("SMTP is not configured")

    msg = EmailMessage()
    msg["Subject"] = "Your Tavern verification code"
    msg["From"] = from_email
    msg["To"] = to_email
    msg.set_content(
        (
            "Your Tavern verification code is:\n\n"
            f"{code}\n\n"
            f"This code expires in {ttl_minutes} minutes.\n\n"
            "If you did not request this, you can ignore this email."
        )
    )

    port = int(get_int_setting(db, SMTP_PORT_KEY, int(settings.SMTP_PORT or 587)))
    username = get_string_setting(db, SMTP_USERNAME_KEY, settings.SMTP_USERNAME).strip()
    password = get_string_setting(db, SMTP_PASSWORD_KEY, settings.SMTP_PASSWORD)
    use_tls = bool(get_bool_setting(db, SMTP_USE_TLS_KEY, bool(settings.SMTP_USE_TLS)))
    use_ssl = bool(get_bool_setting(db, SMTP_USE_SSL_KEY, bool(settings.SMTP_USE_SSL)))

    if use_ssl:
        with smtplib.SMTP_SSL(host, port, timeout=20) as server:
            if username:
                server.login(username, password)
            server.send_message(msg)
        return

    with smtplib.SMTP(host, port, timeout=20) as server:
        if use_tls:
            server.starttls()
        if username:
            server.login(username, password)
        server.send_message(msg)
