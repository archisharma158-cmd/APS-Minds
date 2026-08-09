import { useCallback, useEffect, useState } from "react";
import { getAgentFeed, initializeAgent, type AgentPost, type Persona } from "../services/agentApi";

const KEY = "apsminds:agentId";
const DEFAULT_PERSONA: Persona = {
  name: "ARCTES",
  domain: "AI Security & Autonomous Technology",
};

export function useAgent(persona: Persona = DEFAULT_PERSONA) {
  const [agentId, setAgentId] = useState(() => localStorage.getItem(KEY) || "");
  const [posts, setPosts] = useState<AgentPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    if (!agentId) return;
    try {
      setLoading(true);
      setError("");
      const data = await getAgentFeed(agentId);
      setPosts(
        [...(data.posts || [])].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to reach ARCTES.");
    } finally {
      setLoading(false);
    }
  }, [agentId]);

  const initialize = useCallback(async () => {
    try {
      setInitializing(true);
      setError("");
      const data = await initializeAgent(persona);
      localStorage.setItem(KEY, data.agentId);
      setAgentId(data.agentId);
      return data.agentId;
    } finally {
      setInitializing(false);
    }
  }, [persona]);

  useEffect(() => {
    if (!agentId) return;
    refresh();
    const timer = window.setInterval(refresh, 15000);
    return () => window.clearInterval(timer);
  }, [agentId, refresh]);

  return { agentId, posts, loading, initializing, error, initialize, refresh };
}
