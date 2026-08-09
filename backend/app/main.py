from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.routes.auth import router as auth_router
from app.routes.agent import router as agent_router

app = FastAPI(
    title="APS Minds API",
    version="1.0.0",
    description="Autonomous Publishing System — Backend API",
)

# ============================================================
# CORS
# ============================================================

# Production frontend origins — always included regardless of environment.
_PRODUCTION_ORIGINS = [
    "https://aps-minds.vercel.app",
    "https://aps-minds-pro-spy.vercel.app",
    "https://aps-minds-git-main-pro-spy.vercel.app",
]

# Local development origins — always preserved.
_LOCAL_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Optional extra origins from the CORS_ORIGINS env var (comma-separated).
# Robust to missing/empty/malformed values so a bad env var can never break CORS.
_cors_env_extra = [
    o.strip()
    for o in (settings.CORS_ORIGINS or "").split(",")
    if o.strip()
]

# Merge, deduplicate, and preserve insertion order.
cors_origins = list(
    dict.fromkeys(_PRODUCTION_ORIGINS + _LOCAL_ORIGINS + _cors_env_extra)
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# GLOBAL ERROR HANDLER
# ============================================================
# Never leak raw SQL/database errors or tracebacks to clients.
# Return clean JSON with an appropriate HTTP status code instead.


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected server error occurred. Please try again."},
    )


# ============================================================
# AUTH ROUTES
# ============================================================

app.include_router(
    auth_router,
    prefix="/api",
)


# ============================================================
# ARCTES AI ROUTES
# ============================================================

app.include_router(
    agent_router,
    prefix="/api",
)


# ============================================================
# HEALTH
# ============================================================

@app.get("/api/health")
async def health_check():
    return {
        "status": "operational",
        "service": "APS Minds API",
        "arctes": "enabled",
    }