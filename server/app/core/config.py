import os
from dotenv import load_dotenv

load_dotenv()

class Settings():
    PROJECT_NAME: str = "Tavern"
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    VERSION: str = os.getenv("APP_VERSION", "1.0.0")
    COOKIE_SECURE: bool = os.getenv("COOKIE_SECURE", "false").lower() in {"1", "true", "yes", "on"}
    CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://127.0.0.1:8000,http://localhost:8000,https://tavern.hans-homelab.com"
        ).split(",")
        if origin.strip()
    ]

settings = Settings()
