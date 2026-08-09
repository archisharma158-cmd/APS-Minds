from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.config import settings
from app.models.user import User
from app.schemas.auth import SignupRequest, UserResponse

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    """Handles all authentication business logic."""

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain: str, hashed: str) -> bool:
        return pwd_context.verify(plain, hashed)

    @staticmethod
    def create_access_token(user_id: int) -> str:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
        payload = {"sub": str(user_id), "exp": expire}
        return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    @staticmethod
    def decode_token(token: str) -> int:
        """Returns user_id from a valid token or raises HTTPException."""
        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload",
                )
            return int(user_id)
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token is invalid or expired",
            )

    @staticmethod
    def signup(db: Session, data: SignupRequest) -> tuple[User, str]:
        """Creates a new user and returns (user, token)."""
        existing = db.query(User).filter(User.email == data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered",
            )

        user = User(
            name=data.name,
            email=data.email,
            password_hash=AuthService.hash_password(data.password),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        token = AuthService.create_access_token(user.id)
        return user, token

    @staticmethod
    def login(db: Session, email: str, password: str) -> tuple[User, str]:
        """Validates credentials and returns (user, token)."""
        user = db.query(User).filter(User.email == email).first()
        if not user or not AuthService.verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        token = AuthService.create_access_token(user.id)
        return user, token

    @staticmethod
    def get_current_user(db: Session, token: str) -> User:
        """Retrieves user from a valid JWT token."""
        user_id = AuthService.decode_token(token)
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )
        return user
