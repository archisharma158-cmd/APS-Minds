from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import (
    SignupRequest,
    LoginRequest,
    TokenResponse,
    UserResponse,
    MessageResponse,
)
from app.services.auth import AuthService
from app.middleware.auth import get_current_user_dep

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=201)
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    user, token = AuthService.signup(db, data)
    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user, token = AuthService.login(db, data.email, data.password)
    return TokenResponse(
        access_token=token,
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse)
def me(current_user: User = Depends(get_current_user_dep)):
    return UserResponse.model_validate(current_user)


@router.post("/logout", response_model=MessageResponse)
def logout(current_user: User = Depends(get_current_user_dep)):
    # JWT is stateless — logout is handled client-side by discarding the token.
    # This endpoint exists so the frontend has a consistent API surface.
    return MessageResponse(message="Logged out successfully")
