# APS Minds — Production CORS Fix

## Steps

- [x] Analyze CORS configuration in `backend/app/main.py` and `backend/app/config.py`
- [x] Search backend for any conflicting second CORS configuration (only `main.py` + `config.py` reference CORS)
- [x] Edit `backend/app/main.py` — make CORS config robust & env-aware (always include prod + localhost origins, merge optional env origins, keep credentials/methods/headers)
- [x] Inspect frontend API request code (`frontend/src/services/api.ts`) — found root cause: request interceptor adds `Authorization` header to ALL requests including login/signup, causing preflight to request `authorization` header → 400
- [x] Edit `frontend/src/services/api.ts` — only attach `Authorization` when a token exists AND the request is NOT `/auth/login` or `/auth/signup` (keeps `Content-Type: application/json`)
- [x] Verify final configuration
