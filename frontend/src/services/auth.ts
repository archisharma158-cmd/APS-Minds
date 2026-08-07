import api from "./api";
import type {
  AuthResponse,
  SignupPayload,
  LoginPayload,
  User,
} from "../types";

const TOKEN_KEY = "aps_token";
const USER_KEY = "aps_user";

export const authService = {
  async signup(data: SignupPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/signup", data);
    this.persistSession(res.data);
    return res.data;
  },

  async login(data: LoginPayload): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/auth/login", data);
    this.persistSession(res.data);
    return res.data;
  },

  async getMe(): Promise<User> {
    const res = await api.get<User>("/auth/me");
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } finally {
      this.clearSession();
    }
  },

  persistSession(data: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, data.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  },

  clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
