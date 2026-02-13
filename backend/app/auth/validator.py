import re

def validate_password(password: str) -> bool:
    if len(password) < 8:
        raise ValueError("Password must be at least 8 characters long.")
    if len(password) > 256:
        raise ValueError("Password is too long.")
    
    # Optional complexity rules
    if not re.search(r"[A-Z]", password):
        raise ValueError("Password must contain at least one uppercase letter.")
    if not re.search(r"[a-z]", password):
        raise ValueError("Password must contain at least one lowercase letter.")
    if not re.search(r"\d", password):
        raise ValueError("Password must contain at least one number.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise ValueError("Password must contain at least one special character.")
    
    # Strip whitespace
    if password.strip() != password:
        raise ValueError("Password cannot start or end with whitespace.")

    return True