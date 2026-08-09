import { useState } from "react";

const suggestions = [
  "Research the latest AI publishing trends",
  "Create a content strategy for my brand",
  "Analyze my editorial performance",
  "Generate a new article outline",
];

export default function CommandCenter() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "arctes"; text: string }[]
  >([]);

  const sendMessage = () => {
    const text = message.trim();

    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      {
        role: "arctes",
        text: "ARCTES received your command. Intelligence processing is ready.",
      },
    ]);

    setMessage("");
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400" />
            ARCTES ONLINE
          </div>

          <h1 className="text-4xl font-black md:text-6xl">
            Command <span className="text-cyan-400">Center</span>
          </h1>

          <p className="mt-3 text-white/50">
            Give ARCTES a command. Research, reason, remember and execute.
          </p>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_320px]">

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="font-semibold">
                  ARCTES Intelligence Console
                </p>

                <p className="text-xs text-white/40">
                  Autonomous Research Engine
                </p>
              </div>

              <div className="rounded-full border border-emerald-400/20 px-3 py-1 text-xs text-emerald-300">
                ● READY
              </div>
            </div>

            <div className="min-h-[420px] space-y-4 p-6">

              {messages.length === 0 ? (
                <div className="flex min-h-[360px] items-center justify-center text-center">

                  <div>
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 text-3xl">
                      ◉
                    </div>

                    <h2 className="text-2xl font-bold">
                      What should ARCTES build?
                    </h2>

                    <p className="mt-2 text-sm text-white/40">
                      Enter a command below to begin.
                    </p>
                  </div>

                </div>
              ) : (
                messages.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                  >
                    <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm">

                      <div className="mb-1 text-[10px] uppercase tracking-widest text-white/30">
                        {item.role === "user" ? "YOU" : "ARCTES"}
                      </div>

                      {item.text}

                    </div>
                  </div>
                ))
              )}

            </div>

            <div className="border-t border-white/10 p-4">

              <div className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-2">

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Give ARCTES a command..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-white/25"
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-black"
                >
                  Execute
                </button>

              </div>

            </div>

          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Quick Commands
            </p>

            <div className="space-y-3">

              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setMessage(suggestion)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left text-sm text-white/60 transition hover:border-cyan-400/30 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}

            </div>

            <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4">

              <p className="text-xs uppercase tracking-widest text-cyan-300">
                System Status
              </p>

              <div className="mt-3 space-y-2 text-xs text-white/50">
                <p>Research Engine ........ READY</p>
                <p>Memory Layer ........... READY</p>
                <p>Editorial Engine ....... READY</p>
                <p>Publishing Pipeline .... READY</p>
              </div>

            </div>

          </aside>

        </section>

      </div>
    </main>
  );
}
