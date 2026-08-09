import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  className?: string;
  onComplete?: () => void;
  /** When true, reveal the full text immediately and fire onComplete. */
  stop?: boolean;
}

/**
 * Progressively reveals `text` character-by-character.
 * Uses an interval driven by a single ref so it doesn't restart on re-render,
 * and clears the timer on unmount to avoid memory leaks.
 *
 * When `stop` flips to true, the full text is revealed instantly and the
 * timer is cleared so `onComplete` fires exactly once.
 */
export default function TypingText({
  text,
  speed = 12,
  className = "",
  onComplete,
  stop = false,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const savedIndex = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Reset when a new response arrives.
    setDisplayed("");
    savedIndex.current = 0;
    completedRef.current = false;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    // If already stopped, reveal everything instantly.
    if (stop) {
      setDisplayed(text);
      if (!completedRef.current) {
        completedRef.current = true;
        if (onComplete) onComplete();
      }
      return;
    }

    timerRef.current = setInterval(() => {
      savedIndex.current += 1;

      const slice = text.slice(0, savedIndex.current);
      setDisplayed(slice);

      if (savedIndex.current >= text.length && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;

        if (!completedRef.current) {
          completedRef.current = true;
          if (onComplete) onComplete();
        }
      }
    }, speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, stop]);

  const done = displayed.length >= text.length && text.length > 0;

  return (
    <p
      className={`whitespace-pre-wrap text-sm leading-7 text-white/75 ${
        !done ? "arctes-typing-caret" : ""
      } ${className}`}
    >
      {displayed}
    </p>
  );
}
