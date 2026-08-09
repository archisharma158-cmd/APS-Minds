import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowDown,
  Clock3,
  History,
  MessageSquare,
  Plus,
  Square,
  Trash2,
  X,
} from "lucide-react";
import { askARCTES } from "../../services/ai";
import ChatBubble from "../../components/ui/ChatBubble";
import ThinkingIndicator from "../../components/ui/ThinkingIndicator";
import TypingText from "../../components/ui/TypingText";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
};

// "typing" phase shows the response progressively as ARCTES "generates" it.
type Phase = "idle" | "thinking" | "typing";

const STORAGE_KEY = "aps_minds_arctes_history";

function nowLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function makeTitle(text: string) {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= 60) return clean;
  return `${clean.slice(0, 57)}...`;
}

function loadConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is Conversation =>
        c &&
        typeof c.id === "string" &&
        typeof c.title === "string" &&
        typeof c.createdAt === "number" &&
        typeof c.updatedAt === "number" &&
        Array.isArray(c.messages)
    );
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch {
    /* storage unavailable — ignore */
  }
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

function isSameDay(a: number, b: number) {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}

// Group conversations into Today / Yesterday / Older.
function groupConversations(list: Conversation[]) {
  const now = new Date();
  const today = now.getTime();
  const yesterday = today - 86400000;

  const todayList: Conversation[] = [];
  const yesterdayList: Conversation[] = [];
  const olderList: Conversation[] = [];

  for (const convo of list) {
    if (isSameDay(convo.updatedAt, today)) todayList.push(convo);
    else if (isSameDay(convo.updatedAt, yesterday)) yesterdayList.push(convo);
    else olderList.push(convo);
  }

  return [
    { label: "Today", items: todayList },
    { label: "Yesterday", items: yesterdayList },
    { label: "Older", items: olderList },
  ];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [incoming, setIncoming] = useState("");
  const [stopped, setStopped] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [conversations, setConversations] =
    useState<Conversation[]>(loadConversations);
  const [confirmClear, setConfirmClear] = useState(false);

// The scrollable chat container + bottom sentinel.
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Tracks whether the user is currently near the bottom of the chat.
  // Auto-scroll only runs while this is true (so manual scroll-up pauses it).
  const isNearBottomRef = useRef(true);

  // AbortController for the active request + timers/animation frames to clean up.
  const abortRef = useRef<AbortController | null>(null);
  const timersRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);

  // Track the current conversation and whether it needs saving.
  const currentIdRef = useRef<string | null>(null);
  const currentTitleRef = useRef<string>("New Chat");
  const messagesRef = useRef<Message[]>(messages);
  messagesRef.current = messages;

  // Page title
  useEffect(() => {
    document.title = "ARCTES — APS MINDS";
    return () => {
      // Clean up any in-flight request/timers on unmount.
      abortRef.current?.abort();
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    }
  };

  // Persist conversations whenever they change.
  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  // Auto-save the current conversation whenever messages change.
  useEffect(() => {
    if (!currentIdRef.current) return;
    if (messagesRef.current.length === 0) return;

    const id = currentIdRef.current;
    const title = currentTitleRef.current;

    setConversations((prev) => {
      const existing = prev.find((c) => c.id === id);
      const now = Date.now();
      if (existing) {
        return prev.map((c) =>
          c.id === id ? { ...c, messages: messagesRef.current, updatedAt: now } : c
        );
      }
      return [
        { id, title, createdAt: now, updatedAt: now, messages: messagesRef.current },
        ...prev,
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Track scroll position: show the "scroll to bottom" button when the user
  // scrolls away from the bottom, and pause/resume auto-scroll accordingly.
  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;

    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;

    isNearBottomRef.current = nearBottom;
    setShowScrollButton(!nearBottom);
  };

  // Watch the chat container for content changes (new messages, thinking
  // indicator, error bubble, and incremental typing text). Whenever the
  // content grows and the user is near the bottom, follow it.
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;

    const observer = new MutationObserver(() => {
      if (isNearBottomRef.current) {
        scrollToBottom("smooth");
      }
    });

    observer.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll to the newest message when messages are added or the phase changes.
  useEffect(() => {
    if (isNearBottomRef.current) {
      scrollToBottom("smooth");
    }
  }, [messages, phase, error]);

  // Lock body scroll when the history drawer is open on mobile.
  useEffect(() => {
    if (historyOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [historyOpen]);

  const clearGenerationTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
}, []);

  const stopGenerating = useCallback(() => {
    // Abort the active fetch request.
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    clearGenerationTimers();

    // If we already have a response being revealed, keep the typing phase
    // active with `stopped=true` so TypingText reveals the full text and
    // commits it to the message list (preserving the visible response).
    if (phase === "typing" && incoming) {
      setStopped(true);
      return;
    }

    // "thinking" phase (or no partial content yet) — just cancel cleanly.
    setStopped(true);
    setPhase("idle");
    setError("");
  }, [phase, incoming, clearGenerationTimers]);

  const startConversation = useCallback(() => {
    currentIdRef.current = makeId();
    currentTitleRef.current = "New Chat";
    setMessages([]);
    setIncoming("");
    setError("");
    setStopped(false);
    setPhase("idle");
  }, []);

  const sendMessage = async (e?: FormEvent) => {
    e?.preventDefault();

    const text = input.trim();

    if (!text || phase !== "idle") return;

    // First message in this session starts a new conversation.
    if (!currentIdRef.current || messagesRef.current.length === 0) {
      currentIdRef.current = makeId();
      currentTitleRef.current = makeTitle(text);
    } else if (makeTitle(text) !== currentTitleRef.current) {
      // Keep the original title from the first user message.
    }

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: nowLabel(),
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    messagesRef.current = nextMessages;
    setInput("");
    setError("");
    setIncoming("");
    setStopped(false);
    setPhase("thinking");

// Fresh AbortController for each request.
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));

      // Fire the request immediately — no artificial delay.
      // As tokens stream in from the backend, append them to `incoming` and
      // switch to the "typing" phase on the very first token so the user sees
      // ARCTES respond the moment content begins arriving.
      let gotFirstToken = false;

      const fullReply = await askARCTES(text, history, {
        signal: controller.signal,
        onToken: (token: string, full: string) => {
          if (controller.signal.aborted) return;
          if (!gotFirstToken) {
            gotFirstToken = true;
            setPhase("typing");
          }
          setIncoming(full);
        },
      });

      if (controller.signal.aborted) return;

      // Ensure the final text is shown even if no delta tokens arrived.
      if (!gotFirstToken) {
        const fallback =
          fullReply ||
          "ARCTES received your request but returned no response.";
        setIncoming(fallback);
        setPhase("typing");
      }
    } catch (err) {
      // AbortError is a normal user action — ignore it.
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }

      console.error("ARCTES error:", err);

      setError(
        "ARCTES couldn't connect to the intelligence service. Please check that the backend is running."
      );
      setPhase("idle");
    } finally {
      abortRef.current = null;
    }
  };

const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter inserts a newline.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-grow the textarea vertically up to a max height so long messages wrap.
  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  // Fires when the typing reveal finishes (or is stopped).
  const handleTypingComplete = (stoppedNow: boolean) => {
    setMessages((current) => [
      ...current,
      {
        role: "assistant",
        content: incoming,
        timestamp: nowLabel(),
      },
    ]);
    setStopped(stoppedNow);
    setIncoming("");
    setPhase("idle");
  };

  const handleScrollButtonClick = () => {
    scrollToBottom("smooth");
    isNearBottomRef.current = true;
    setShowScrollButton(false);
  };

  const handleNewChat = () => {
    startConversation();
    setHistoryOpen(false);
  };

  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLoadConversation = (convo: Conversation) => {
    // Stop any in-flight generation before switching.
    abortRef.current?.abort();
    clearGenerationTimers();

    currentIdRef.current = convo.id;
    currentTitleRef.current = convo.title;
    setMessages(convo.messages);
    messagesRef.current = convo.messages;
    setIncoming("");
    setError("");
    setStopped(false);
    setPhase("idle");
    setHistoryOpen(false);
  };

  const handleClearAll = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setConversations([]);
    setConfirmClear(false);
    setHistoryOpen(false);
  };

  const groups = groupConversations(conversations);
  const generating = phase !== "idle";

  return (
    <div
      className="flex h-screen flex-col overflow-hidden bg-[#030509] text-white"
      style={{ height: "100dvh" }}
    >
      {/* Main chat layout (fixed viewport — only the message list scrolls) */}
      <main className="mx-auto flex h-full w-full max-w-7xl flex-col overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mx-auto w-full max-w-4xl shrink-0">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-xl">
                A
                <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#030509] bg-emerald-400" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-wide">ARCTES</h1>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                    Online
                  </span>
                </div>

                <p className="mt-1 text-xs text-white/35">
                  Autonomous Research & Technology Intelligence
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
<button
                type="button"
                onClick={() => setHistoryOpen(true)}
                aria-label="Open chat history"
                className="touch-target flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-white/60 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
              >
                <History size={15} />
                <span className="hidden sm:inline">History</span>
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                  APS Minds
                </p>
                <p className="mt-1 text-xs text-cyan-400/70">
                  Intelligence Core
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Messages — the scrollable chat container */}
        <section
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="mx-auto flex w-full max-w-4xl flex-1 flex-col overflow-y-auto py-8 pb-40"
        >
          {messages.length === 0 && phase === "idle" ? (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <div className="relative mb-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.06] text-4xl shadow-[0_0_60px_rgba(34,211,238,0.08)]">
                  ✦
                </div>
                <div className="absolute -inset-3 -z-10 rounded-[2.5rem] border border-cyan-400/5" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
                ARCTES Intelligence
              </p>

              <h2 className="text-3xl font-black sm:text-4xl">
                How can I help you?
              </h2>

              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/35">
                Intelligence That Thinks. Research That Moves.
              </p>

              <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  "Research the latest AI trends",
                  "Create a technology article",
                  "Explain cybersecurity concepts",
                  "Generate a content strategy",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => setInput(prompt)}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 text-left text-sm text-white/50 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:text-white"
                  >
                    <span className="mr-2 text-cyan-400">→</span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatBubble
                  key={`${message.role}-${index}`}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {/* PHASE 1 — THINKING */}
              {phase === "thinking" && (
                <div className="flex justify-start">
                  <div className="rounded-3xl rounded-bl-md border border-white/[0.08] bg-white/[0.025] px-6 py-5">
                    <ThinkingIndicator label="ANALYZING" />
                  </div>
                </div>
              )}

              {/* PHASE 2 — FAST REVEAL (response streaming in) */}
              {phase === "typing" && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-3xl rounded-bl-md border border-white/[0.08] bg-white/[0.025] px-5 py-4 sm:max-w-[75%]">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                        ARCTES
                      </div>
                    </div>

                    <div className="mb-3 flex justify-start">
                      <ThinkingIndicator label="GENERATING" size="sm" />
                    </div>

<div className="text-wrap-anywhere">
                      <TypingText
                        text={incoming}
                        speed={2}
                        stop={stopped}
                        onComplete={() => handleTypingComplete(stopped)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STOPPED indicator — partial response preserved */}
              {stopped && phase === "idle" && (
                <div className="flex items-center gap-2 pl-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                  <Square size={10} className="text-amber-400/70" />
                  Generation stopped
                </div>
              )}

              {error && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-3xl rounded-bl-md border border-red-400/20 bg-red-400/[0.06] px-5 py-4 text-sm leading-6 text-red-300">
                    ⚠️ {error}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom sentinel for auto-scroll */}
          <div ref={messagesEndRef} />
        </section>
      </main>

      {/* Scroll-to-bottom button (shown when the user scrolls up) */}
      {showScrollButton && (
        <button
          type="button"
          onClick={handleScrollButtonClick}
          aria-label="Scroll to newest response"
          className="fixed bottom-24 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-[#02040a]/90 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,.2)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          <ArrowDown size={18} />
        </button>
      )}

{/* Composer */}
      <div className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#030509]/95 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-3 py-3 sm:px-6 sm:py-4">
          <form onSubmit={sendMessage} className="flex items-end gap-2 sm:gap-3">
            <div className="relative flex-1">
<textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoGrow();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask ARCTES anything..."
                disabled={generating}
                rows={1}
                className="text-wrap-anywhere min-h-[44px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:bg-white/[0.06] disabled:opacity-60 sm:px-5"
              />
            </div>

            {generating ? (
              <button
                type="button"
                onClick={stopGenerating}
                aria-label="Stop generating"
                className="touch-target flex h-14 shrink-0 items-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 text-sm font-bold text-red-300 transition hover:bg-red-500/20 hover:text-red-200 sm:px-6"
              >
                <Square size={14} className="fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="touch-target h-14 shrink-0 rounded-2xl bg-cyan-400 px-5 text-sm font-bold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
              >
                Send
              </button>
            )}
          </form>

          <p className="mt-2 text-center text-[10px] text-white/20">
            ARCTES can make mistakes. Verify important information.
          </p>
        </div>
      </div>

      {/* HISTORY DRAWER */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            historyOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setHistoryOpen(false)}
        />

        {/* Panel */}
        <aside
          className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/[0.08] bg-[#05070d]/95 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.08)] transition-transform duration-300 ease-out ${
            historyOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!historyOpen}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
            <div className="flex items-center gap-2">
              <History size={16} className="text-cyan-400" />
              <h2 className="text-sm font-bold tracking-wide">Recent Chats</h2>
            </div>

<button
              type="button"
              onClick={() => setHistoryOpen(false)}
              aria-label="Close history"
              className="touch-target flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <X size={15} />
            </button>
          </div>

          {/* New chat + clear all */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-3">
<button
              type="button"
              onClick={handleNewChat}
              className="touch-target flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-3 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/20"
            >
              <Plus size={14} />
              New Chat
            </button>

            {conversations.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                aria-label="Clear all history"
                className="touch-target flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3 py-3 text-xs font-semibold text-white/50 transition hover:border-red-400/30 hover:text-red-300"
              >
                <Trash2 size={13} />
                <span className="hidden sm:inline">Clear All</span>
              </button>
            )}
          </div>

          {/* Clear all confirmation */}
          {confirmClear && (
            <div className="border-b border-red-400/20 bg-red-500/[0.06] px-5 py-3">
              <p className="text-xs text-red-200/90">
                Delete all conversations? This cannot be undone.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300 transition hover:bg-red-500/30"
                >
                  Yes, clear all
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/50 transition hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            {conversations.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                  <MessageSquare size={20} className="text-white/25" />
                </div>
                <p className="text-sm font-semibold text-white/50">
                  No conversations yet
                </p>
                <p className="mt-1 text-xs text-white/25">
                  Your chats will appear here.
                </p>
              </div>
            ) : (
              groups.map(
                (group) =>
                  group.items.length > 0 && (
                    <div key={group.label} className="mb-4">
                      <div className="flex items-center gap-2 px-2 pb-2">
                        <Clock3 size={11} className="text-white/25" />
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
                          {group.label}
                        </p>
                      </div>

                      <div className="space-y-1">
                        {group.items.map((convo) => (
                          <div
                            key={convo.id}
                            className="group flex items-center gap-2 rounded-xl border border-transparent px-2 py-2.5 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06]"
                          >
                            <button
                              type="button"
                              onClick={() => handleLoadConversation(convo)}
                              className="min-w-0 flex-1 text-left"
                            >
                              <p className="truncate text-sm text-white/75 transition group-hover:text-white">
                                {convo.title}
                              </p>
                              <p className="mt-0.5 text-[10px] text-white/30">
                                {relativeTime(convo.updatedAt)} ·{" "}
                                {convo.messages.length} messages
                              </p>
                            </button>

<button
              type="button"
              onClick={() =>
                handleDeleteConversation(convo.id)
              }
              aria-label="Delete conversation"
              className="touch-target flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white/25 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 size={14} />
            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )
            )}
          </div>
        </aside>
      </>
    </div>
  );
}
