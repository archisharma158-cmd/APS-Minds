# APS Minds — Production CORS Fix (Vercel Proxy)

## Steps

- [x] Analyze CORS configuration in `backend/app/main.py` and `backend/app/config.py`
- [x] Search backend for any conflicting second CORS configuration (only `main.py` + `config.py` reference CORS)
- [x] Edit `backend/app/main.py` — make CORS config robust & env-aware (always include prod + localhost origins, merge optional env origins, keep credentials/methods/headers)
- [x] Inspect frontend API request code (`frontend/src/services/api.ts`)
- [x] Create `frontend/vercel.json` — rewrite `/api/*` -> `https://aps-minds.onrender.com/api/*` (server-side proxy, no client redirect)
- [x] Edit `frontend/src/services/api.ts` — production base URL is now `/api` (preserves localhost dev via Vite proxy)
- [x] Verify final configuration (no conflicting vercel.json existed; rewrites preserve `/api` path)
