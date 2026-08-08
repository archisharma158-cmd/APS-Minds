import { useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "arctes", text: "I’m ARCTES. Connect your private chat endpoint here for live model responses. No API secret belongs in the frontend." },
  ]);

  function send() {
    const value = input.trim();
    if (!value) return;
    setMessages((m) => [...m,
      { id: Date.now(), role: "user", text: value },
      { id: Date.now() + 1, role: "arctes", text: "Message received. The autonomous feed API is connected; the private chat model endpoint can be wired next." },
    ]);
    setInput("");
  }

  return (
    <main className="min-h-screen bg-[#010208] px-4 pb-10 pt-28 text-white">
      <div className="mx-auto flex h-[calc(100vh-9rem)] max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/[.07] bg-white/[.02]">
        <header className="flex items-center justify-between border-b border-white/[.07] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[.05]"><Bot size={18} className="text-cyan-300" /></div>
            <div><div className="font-bold">ARCTES</div><div className="font-mono text-[7px] tracking-[.2em] text-emerald-300/60">AUTONOMOUS INTELLIGENCE</div></div>
          </div>
          <Sparkles size={16} className="text-cyan-300/50" />
        </header>

        <section className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-8">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "arctes" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-300/10"><Bot size={14} className="text-cyan-300" /></div>}
              <div className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-7 ${m.role === "user" ? "bg-cyan-300 text-black" : "border border-white/[.07] bg-white/[.025] text-white/60"}`}>{m.text}</div>
              {m.role === "user" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[.06]"><User size={14} className="text-white/50" /></div>}
            </div>
          ))}
        </section>

        <footer className="border-t border-white/[.07] p-4">
          <div className="flex items-center gap-2 rounded-2xl border border-white/[.08] bg-black/20 p-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Talk to ARCTES..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-white/20" />
            <button onClick={send} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300 text-black"><Send size={16} /></button>
          </div>
        </footer>
      </div>
    </main>
  );
}
