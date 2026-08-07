import { motion } from "framer-motion";

interface StatusIndicatorProps {
  status: "online" | "offline" | "idle";
  label: string;
  pulse?: boolean;
}

const statusColors = {
  online: "bg-emerald-400 shadow-emerald-400/50",
  offline: "bg-red-400 shadow-red-400/50",
  idle: "bg-amber-400 shadow-amber-400/50",
};

const statusLabels = {
  online: "Online",
  offline: "Offline",
  idle: "Standby",
};

export default function StatusIndicator({ status, label, pulse = true }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${statusColors[status]}`} />
        {pulse && status === "online" && (
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400"
          />
        )}
      </div>
      <span className="text-sm text-white/70">
        {label}: <span className="text-white/90 font-medium">{statusLabels[status]}</span>
      </span>
    </div>
  );
}
