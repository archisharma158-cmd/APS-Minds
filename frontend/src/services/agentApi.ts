const API_BASE =
  import.meta.env.VITE_ARCTES_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

export type Persona = { name: string; domain: string };

export type AgentPost = {
  id: string;
  createdAt: string;
  text: string;
  rationale: string;
  sources: string[];
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
  });
  if (!response.ok) {
    throw new Error(`ARCTES API ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

export const initializeAgent = (persona: Persona) =>
  request<{ agentId: string }>("/api/agent/init", {
    method: "POST",
    body: JSON.stringify({ persona }),
  });

export const getAgentFeed = (agentId: string) =>
  request<{ posts: AgentPost[] }>(
    `/api/agent/feed?agentId=${encodeURIComponent(agentId)}`
  );
