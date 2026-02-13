import sqlite3
from getpass import getpass
from hashing import hash_password, verify_password, validate_password
from jwt import create_access_token

DB_FILE = "users.db"
conn = sqlite3.connect(DB_FILE)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
)
""")
conn.commit()

def create_account():
    username = input("Username: ").strip()
    password = getpass("Password: ").strip()
    
    try:
        validate_password(password)
    except ValueError as e:
        print(f"Password invalid: {e}")
        return

    hashed = hash_password(password)
    
    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            (username, hashed)
        )
        conn.commit()
        print(f"Account for {username} created successfully.")
    except sqlite3.IntegrityError:
        print("Username already exists!")
        
def login_and_issue_token():
    username = input("Username: ").strip()
    password = getpass("Password: ").strip()

    cursor.execute(
        "SELECT password_hash FROM users WHERE username = ?",
        (username,)
    )
    row = cursor.fetchone()
    if not row:
        print("User not found.")
        return

    hashed = row[0]
    if verify_password(password, hashed):
        print("Password verified successfully!")
        token = create_access_token({"sub": username})
        print(f"Your JWT token:\n{token}")
    else:
        print("Invalid password.")
        
if __name__ == "__main__":
    while True:
        choice = input("[1] Create account, [2] Login, [0] Exit: ").strip()
        if choice == "1":
            create_account()
        elif choice == "2":
            login_and_issue_token()
        elif choice == "0":
            break
        else:
            print("Invalid choice.")