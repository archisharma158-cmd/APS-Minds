import axios from "axios";

const api = axios.create({
  // In production, Vercel rewrites /api/* -> https://aps-minds.onrender.com/api/*
  // so the browser never makes a cross-origin request (no CORS preflight).
  // In dev, Vite proxies /api -> the Render backend on port 5173.
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to authenticated requests only.
// Skip login/signup: sending an Authorization header there would make the
// browser's preflight request include `authorization` in
// Access-Control-Request-Headers, which can cause a CORS 400 on OPTIONS.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("aps_token");
  const isAuthEndpoint =
    config.url?.includes("/auth/login") || config.url?.includes("/auth/signup");
  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("aps_token");
      localStorage.removeItem("aps_user");
      // Only redirect if not already on an auth page
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/signup")
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
