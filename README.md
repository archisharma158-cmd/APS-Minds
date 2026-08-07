# APS Minds — Autonomous Publishing System

> **ARCTES** is the flagship AI persona powering APS Minds — a future-ready autonomous publishing intelligence platform.

## Overview

APS Minds is a full-stack platform that lays the foundation for autonomous publishing workflows driven by AI agents. The system is designed with clean architecture, modular services, and production-grade authentication — ready to scale into a fully autonomous editorial intelligence engine.

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Axios

### Backend
- FastAPI
- SQLAlchemy + Alembic
- JWT Authentication
- SQLite (migration-ready)
- Pydantic
- APScheduler

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm 9+

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Environment Variables

Copy `.env.example` to `.env` in both `backend/` and project root, then edit values:

```bash
cp .env.example backend/.env
```

## Project Structure

```
APS-Minds/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   ├── alembic/
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
├── docs/
├── .env.example
├── .gitignore
└── README.md
```

## Features

- ✅ Full JWT authentication (signup, login, logout, persistent sessions)
- ✅ Protected routes with automatic token refresh awareness
- ✅ Modern glassmorphism dark-theme UI
- ✅ Responsive layout with professional animations
- ✅ Connected frontend ↔ backend via Axios
- ✅ SQLite database with Alembic migrations
- ✅ Dashboard with system status cards
- ✅ APScheduler configured for future agent jobs
- ✅ Clean, modular, production-ready architecture

## Roadmap

- [ ] ARCTES autonomous agent logic
- [ ] Publishing pipeline
- [ ] Persistent memory system
- [ ] Multi-agent orchestration
- [ ] Content generation workflows
- [ ] Analytics dashboard

## License

MIT
