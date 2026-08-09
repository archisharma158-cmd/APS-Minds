interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export default function ChatBubble({
  role,
  content,
  timestamp,
}: ChatBubbleProps) {
  const isUser = role === "user";

  const wrapperClass = isUser ? "justify-end" : "justify-start";

  const bubbleClass = isUser
    ? "rounded-3xl rounded-br-md border border-cyan-400/20 bg-cyan-400/[0.07]"
    : "rounded-3xl rounded-bl-md border border-white/[0.08] bg-white/[0.025]";

  return (
    <div className={`flex ${wrapperClass}`}>
      <div className={`max-w-[85%] sm:max-w-[75%] ${bubbleClass} px-5 py-4`}>
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-400">
            {isUser ? "You" : "ARCTES"}
          </div>

          {timestamp && (
            <span className="font-mono text-[9px] tracking-wider text-white/25">
              {timestamp}
            </span>
          )}
        </div>

<p className="text-wrap-anywhere whitespace-pre-wrap text-sm leading-7 text-white/75">
          {content}
        </p>
      </div>
    </div>
  );
}
