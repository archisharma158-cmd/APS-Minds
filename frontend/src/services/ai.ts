const API_URL = "http://127.0.0.1:8000/api";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function askARCTES(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  const response = await fetch(`${API_URL}/agent/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      history,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `AI request failed: ${response.status}`);
  }

  const data = await response.json();

  return (
    data.answer ??
    data.response ??
    data.message ??
    "ARCTES returned an empty response."
  );
}
