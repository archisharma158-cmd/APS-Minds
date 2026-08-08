import { FormEvent, useEffect, useState } from "react";
import { askARCTES } from "../../services/ai";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const KEY = "arctes-chat-history";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved
        ? JSON.parse(saved)
        : [{
            role: "assistant",
            content: "ARCTES online. How can I help you?"
          }];
    } catch {
      return [{
        role: "assistant",
        content: "ARCTES online. How can I help you?"
      }];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(messages));
  }, [messages]);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();

    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text
    };

    const history = [...messages, userMessage];

    setMessages(history);
    setInput("");
    setLoading(true);

    try {
      const answer = await askARCTES(text, messages.slice(-10));

      setMessages([
        ...history,
        {
          role: "assistant",
          content: answer
        }
      ]);
    } catch (error) {
      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? `ARCTES ERROR: ${error.message}`
              : "Unable to connect to ARCTES."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function newChat() {
    const welcome: Message = {
      role: "assistant",
      content: "New ARCTES session initialized."
    };

    setMessages([welcome]);
    localStorage.removeItem(KEY);
  }

  return (
    <div className="min-h-screen bg-[#02040a] text-white flex flex-col">

      <header className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black">
            A
          </div>

          <div>
            <div className="font-bold tracking-wider">
              ARCTES
            </div>
            <div className="text-[9px] tracking-[0.3em] text-cyan-300">
              AUTONOMOUS INTELLIGENCE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </div>

          <button
            onClick={newChat}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs hover:bg-white/10"
          >
            New Chat
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 overflow-y-auto">

        <div className="space-y-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "max-w-[85%] rounded-2xl border border-blue-400/20 bg-blue-500/10 px-5 py-4"
                    : "max-w-[85%] rounded-2xl border border-cyan-400/10 bg-white/[0.035] px-5 py-4"
                }
              >
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-cyan-300">
                  {message.role === "user" ? "YOU" : "ARCTES"}
                </div>

                <div className="whitespace-pre-wrap text-sm leading-7 text-white/85">
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-cyan-400/10 bg-white/[0.035] px-5 py-4 text-sm text-cyan-300">
                ARCTES is thinking...
              </div>
            </div>
          )}
        </div>

      </main>

      <footer className="border-t border-white/10 bg-black/70 p-4 backdrop-blur-xl">
        <form
          onSubmit={sendMessage}
          className="mx-auto flex max-w-5xl gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask ARCTES anything..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none placeholder:text-white/30 focus:border-cyan-400/40"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 font-semibold disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </footer>

    </div>
  );
}
