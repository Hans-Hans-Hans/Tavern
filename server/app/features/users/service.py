from sqlalchemy.orm import Session
from app.features.users import models, schemas
from app.core.security import hash_password, verify_password

# Creates a new user and persists to database
# Responsibility:
# - Hash password
# - Instantiate User model
# - Commit transaction
# - Return persisted object
def create_user(db: Session, username: str, email: str, password: str):
    # Hash plain-text password before storing
    hashed_pw = hash_password(password)
    
    user = models.User(
        username=username,
        email=email,
        hashed_password=hashed_pw
    )
    
    db.add(user)
    db.commit()         # Writes to database
    db.refresh(user)    # Refresh to get generated fields (id, public_id, timestamps)
    
    return user

# Authenticates a user by username + password
# Returns:
# - User object if valid
# - None if invalid credentials
def authenticate_user(db: Session, username: str, password: str):
    # Fetch user by username
    user = db.query(models.User).filter(models.User.username == username).first()
    
    if not user:
        return None
    
    # Compare provided password against stored hash
    if not verify_password(password, user.hashed_password):
        return None
    return user

# Retrieve a user by public-facing UUID
# Used for GET /users/{public_id}
def get_user_by_public_id(db: Session, public_id: str):
    return db.query(models.User).filter(
        models.User.public_id == public_id
    ).first()

# Update a user’s username/email
# Returns:
# - Updated user object
# - None if user not found
def update_user(db: Session, public_id: str, user_in: schemas.UserUpdate):
    user = db.query(models.User).filter(models.User.public_id == public_id).first()
    
    if not user:
        return None
    # Only update fields if provided (partial update behavior)
    if user_in.username is not None:
        user.username = user_in.username
        
    if user_in.email is not None:
        user.email = user_in.email
        
    db.commit()         # Persist changes
    db.refresh(user)    # Refresh to reflect updated state
    return user