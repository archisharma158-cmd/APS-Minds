import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300 ${className}`}
    >
      <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />

      <span className="leading-6">{message}</span>
    </div>
  );
}

