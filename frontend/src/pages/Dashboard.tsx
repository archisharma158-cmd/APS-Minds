import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import GlassCard from "../components/GlassCard";
import StatusIndicator from "../components/StatusIndicator";

const systemMetrics = [
  { label: "Uptime", value: "99.97%", icon: "⚡" },
  { label: "API Latency", value: "42ms", icon: "📡" },
  { label: "Active Sessions", value: "1", icon: "🔗" },
  { label: "DB Health", value: "Healthy", icon: "💾" },
];

const recentActivity = [
  { action: "Account created", time: "Just now", icon: "👤" },
  { action: "System initialized", time: "On startup", icon: "🚀" },
  { action: "Database schema applied", time: "On startup", icon: "🗄️" },
  { action: "APScheduler started", time: "On startup", icon: "⏰" },
  { action: "CORS configured", time: "On startup", icon: "🌐" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Dashboard() {
  const { user } = useAuth();

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-white/40 mt-1">Here's your APS Minds command center.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Top Row: Welcome + Profile */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <GlassCard className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">APS Minds Dashboard</h2>
                      <p className="text-white/40 text-sm">Autonomous Publishing System v0.1.0</p>
                    </div>
                  </div>
                  <p className="text-white/50 leading-relaxed">
                    Your autonomous publishing command center is active. The system foundation is operational
                    — authentication, database, and API services are running. ARCTES agent capabilities
                    will be available in the next phase.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* User Profile Card */}
            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">Profile</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{user?.name}</p>
                      <p className="text-white/40 text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <hr className="border-white/5" />
                  <div className="text-xs text-white/30 space-y-1">
                    <p>Member since: {formattedDate}</p>
                    <p>Role: Admin</p>
                    <p>User ID: {user?.id}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* System Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemMetrics.map((metric) => (
              <motion.div key={metric.label} variants={itemVariants}>
                <GlassCard hover className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{metric.label}</p>
                    <p className="text-lg font-semibold text-white">{metric.value}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Middle Row: ARCTES + Memory + Publishing */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* ARCTES Status */}
            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">ARCTES Status</h3>
                <div className="space-y-3">
                  <StatusIndicator status="idle" label="Agent" />
                  <StatusIndicator status="online" label="API" />
                  <StatusIndicator status="idle" label="Reasoning" />
                  <hr className="border-white/5 my-3" />
                  <div className="text-xs text-white/30 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Model</span>
                      <span className="text-white/50 font-mono">Pending Config</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mode</span>
                      <span className="text-white/50 font-mono">Standby</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tasks Processed</span>
                      <span className="text-white/50 font-mono">0</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Memory Status */}
            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">Memory Status</h3>
                <div className="space-y-3">
                  <StatusIndicator status="idle" label="Knowledge Graph" />
                  <StatusIndicator status="online" label="Database" />
                  <StatusIndicator status="idle" label="Vector Store" />
                  <hr className="border-white/5 my-3" />
                  <div className="text-xs text-white/30 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Stored Memories</span>
                      <span className="text-white/50 font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Used</span>
                      <span className="text-white/50 font-mono">0 KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Sync</span>
                      <span className="text-white/50 font-mono">—</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Publishing Status */}
            <motion.div variants={itemVariants}>
              <GlassCard className="h-full">
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">Publishing Status</h3>
                <div className="space-y-3">
                  <StatusIndicator status="idle" label="Pipeline" />
                  <StatusIndicator status="idle" label="Editor" />
                  <StatusIndicator status="idle" label="Distribution" />
                  <hr className="border-white/5 my-3" />
                  <div className="text-xs text-white/30 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Articles Published</span>
                      <span className="text-white/50 font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Drafts</span>
                      <span className="text-white/50 font-mono">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduled</span>
                      <span className="text-white/50 font-mono">0</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Bottom Row: Agent Status + Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Agent Status */}
            <motion.div variants={itemVariants}>
              <GlassCard>
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">Agent Status</h3>
                <div className="space-y-3">
                  {[
                    { name: "Research Agent", status: "idle" as const, desc: "Trend analysis & data gathering" },
                    { name: "Writer Agent", status: "idle" as const, desc: "Content generation & drafting" },
                    { name: "Editor Agent", status: "idle" as const, desc: "Quality review & fact-checking" },
                    { name: "Distribution Agent", status: "idle" as const, desc: "Multi-channel publishing" },
                  ].map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-center gap-3">
                        <StatusIndicator status={agent.status} label="" />
                        <div className="-ml-2">
                          <p className="text-sm text-white font-medium">{agent.name}</p>
                          <p className="text-xs text-white/30">{agent.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                        Standby
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <GlassCard>
                <h3 className="text-sm font-mono uppercase tracking-wider text-brand-400 mb-4">Recent Activity</h3>
                <div className="space-y-1">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-lg shrink-0">{activity.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">{activity.action}</p>
                        <p className="text-xs text-white/30">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
