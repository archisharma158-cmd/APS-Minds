import { AGENT_CHAT_URL } from "../config";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AskARCTESOptions = {
  signal?: AbortSignal;
  onToken?: (token: string, full: string) => void;
};

// Extract a readable message from a FastAPI `detail` field.
// `detail` can be a plain string or a nested object/array — never show raw JSON.
function extractDetail(detail: unknown): string {
  if (typeof detail === "string") return detail;
  if (detail && typeof detail === "object") {
    const obj = detail as Record<string, unknown>;
    if (typeof obj.msg === "string") return obj.msg;
    if (typeof obj.message === "string") return obj.message;
    if (typeof obj.error === "string") return obj.error;
  }
  return "The ARCTES service returned an unexpected response.";
}

/**
 * Stream the ARCTES reply from the backend SSE endpoint.
 * Calls `onToken` with each chunk as it arrives so the UI can render
 * incrementally instead of waiting for the full response.
 */
export async function askARCTES(
  message: string,
  history: ChatMessage[] = [],
  options: AskARCTESOptions = {}
) {
  const { signal, onToken } = options;

  const response = await fetch(AGENT_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
    signal,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(
      extractDetail(data?.detail) || `ARCTES API error: ${response.status}`
    );
  }

  if (!response.body) {
    throw new Error("ARCTES returned no readable response body.");
  }

  // Read the SSE stream line-by-line and forward each delta.
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  const handleLine = (line: string) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) return;

    const payload = trimmed.slice(5).trim();
    if (!payload) return;

    if (payload === "[DONE]") return;

    try {
      const json = JSON.parse(payload);

      if (typeof json?.delta === "string") {
        full += json.delta;
        onToken?.(json.delta, full);
        return;
      }

      if (json?.error) {
        throw new Error(
          typeof json.error === "string"
            ? json.error
            : "ARCTES could not complete the request."
        );
      }
    } catch {
      // Ignore malformed SSE lines.
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        handleLine(line);
      }
    }

    // Flush any remaining buffered data.
    if (buffer.length > 0) {
      handleLine(buffer);
    }
  } finally {
    reader.releaseLock();
  }

  return full;
}
