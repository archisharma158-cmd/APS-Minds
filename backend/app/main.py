from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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