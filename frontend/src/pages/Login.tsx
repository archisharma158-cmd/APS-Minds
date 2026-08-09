import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import type { ApiError } from "../types";
import { AxiosError } from "axios";
import logo from "../assets/apsminds-logo.jpg";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        const data = err.response.data as ApiError;
        setError(data.detail || "Login failed");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-brand-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative mx-auto mb-4 h-16 w-16 overflow-hidden rounded-2xl border border-cyan-300/20 bg-black shadow-[0_0_30px_rgba(34,211,238,0.15)] sm:h-20 sm:w-20">
              <img
                src={logo}
                alt="APS Minds"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-300/10 via-transparent to-blue-600/10" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
            <h1 className="text-2xl font-black tracking-[-0.04em] text-white">
              APS<span className="text-cyan-300">MINDS</span>
            </h1>
            <p className="mt-1 font-mono text-[9px] tracking-[0.28em] text-white/30">
              AUTONOMOUS INTELLIGENCE
            </p>
            <h2 className="mt-5 text-xl font-bold text-white">Welcome back</h2>
            <p className="text-white/40 text-sm mt-1">Sign in to APS Minds</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-white/60 mb-1.5">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-white/60 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-white/30 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
