// ============================================================
// APS MINDS — Global configuration
// ============================================================
// Central place for brand + team + contact info so it is easy
// to update later without touching multiple components.
// NOTE: no API keys here. Keys stay backend-only.
// ============================================================

// Backend ARCTES chat endpoint (no API key — keys stay backend-only).
// Local dev default targets the backend on port 8001; override via VITE_API_URL
// (or VITE_ARCTES_API_URL) in production.
export const AGENT_CHAT_URL =
  import.meta.env.VITE_ARCTES_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8001/api/agent/chat";

export const BRAND = {
  name: "APS MINDS",
  aiSystem: "ARCTES",
  arctesFullForm: "Autonomous Research & Technology Intelligence",
  tagline: "Intelligence That Thinks. Research That Moves.",
};

export type TeamMember = {
  name: string;
  course: string;
  university: string;
  role: string;
  email: string;
  linkedin: string;
  github: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "PARTH GOYAL",
    course: "B.Tech — Cyber Security",
    university: "Quantum University, Roorkee",
    role: "Cybersecurity / Frontend / AI",
    email: "goyalparth61@gmail.com",
    linkedin: "https://www.linkedin.com/in/parth-goyal-215231385",
    github: "https://github.com/goyalparth61-netizen",
  },
  {
    name: "ARCHI SHARMA",
    course: "B.Tech — Artificial Intelligence & Machine Learning",
    university: "Quantum University, Roorkee",
    role: "AI/ML / Backend / AI",
    email: "archisharma158@gmail.com",
    linkedin: "https://www.linkedin.com/in/archisharma158",
    github: "https://github.com/archisharma158-cmd",
  },
  {
    name: "SONU SHARMA",
    course: "B.Tech — Cyber Security",
    university: "Quantum University, Roorkee",
    role: "Cybersecurity / Technology",
    email: "s.sharma15112007@gmail.com",
    linkedin: "https://www.linkedin.com/in/sonu-sharma-7aa107377",
    // No GitHub link provided — intentionally left empty.
    github: "",
  },
];
