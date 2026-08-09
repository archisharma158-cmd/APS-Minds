# Architecture Overview

APS Minds uses a clean, layered architecture:

## Backend Layers

1. **Routes** — HTTP endpoint definitions, request validation
2. **Services** — Business logic, orchestration
3. **Models** — SQLAlchemy ORM models
4. **Schemas** — Pydantic request/response validation
5. **Middleware** — Authentication, CORS, error handling
6. **Config** — Environment-driven configuration

## Frontend Layers

1. **Pages** — Route-level components
2. **Components** — Reusable UI elements
3. **Services** — API communication layer (Axios)
4. **Hooks** — Custom React hooks
5. **Context** — Global state management (Auth)
6. **Types** — TypeScript interfaces and types
