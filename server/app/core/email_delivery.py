import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_verification_code_email(to_email: str, code: str, ttl_minutes: int) -> None:
    host = str(settings.SMTP_HOST or "").strip()
    from_email = str(settings.SMTP_FROM_EMAIL or "").strip()
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

    port = int(settings.SMTP_PORT or 587)
    username = str(settings.SMTP_USERNAME or "").strip()
    password = str(settings.SMTP_PASSWORD or "")
    use_tls = bool(settings.SMTP_USE_TLS)
    use_ssl = bool(settings.SMTP_USE_SSL)

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

