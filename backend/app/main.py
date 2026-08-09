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

# Parse comma-separated origins from settings (env-driven).
_cors_defaults = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
_cors_env = [
    o.strip()
    for o in settings.CORS_ORIGINS.split(",")
    if o.strip()
]

cors_origins = [
    "https://aps-minds.vercel.app",
    "https://aps-minds-pro-spy.vercel.app",
    "https://aps-minds-git-main-pro-spy.vercel.app",
    "http://localhost:5173",
]

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