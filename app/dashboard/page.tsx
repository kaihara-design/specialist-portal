import {
  PanelLeft,
  Home,
  FileText,
  BookOpen,
  ExternalLink,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Info,
  Lock,
  BarChart2,
  Zap,
  Target,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Mock data ────────────────────────────────────────────────────────────────

const METRICS = [
  {
    label: "CASES LABELED",
    icon: BarChart2,
    value: "0 cases",
    prompt: "Please start labeling to view your performance.",
  },
  {
    label: "AVERAGE TIME SPENT PER CASE",
    icon: Zap,
    value: "0m 0s",
    prompt: "Please start labeling to view your performance.",
  },
  {
    label: "QUALITY SCORE",
    icon: Target,
    value: "0",
    prompt: "Please start labeling to view your performance.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "OPEN" | "PAUSED" }) {
  return (
    <span
      className={cn(
        "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
        status === "OPEN"
          ? "text-emerald-700 bg-emerald-50 border-emerald-100"
          : "text-slate-500 bg-slate-100 border-slate-200"
      )}
    >
      {status}
    </span>
  );
}

function TypeChip({ label, icon: Icon }: { label: string; icon?: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#62748e] bg-slate-100 px-2 py-0.5 rounded-full">
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}

function OpenTaskCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <StatusBadge status="OPEN" />
          <h3 className="text-base font-semibold text-[#0f172b]">Polyp ID (box)</h3>
          <TypeChip label="Box Segmentation" icon={Info} />
        </div>
        <button className="p-1 rounded hover:bg-slate-100 flex-shrink-0 mt-0.5">
          <ChevronUp className="h-4 w-4 text-[#62748e]" />
        </button>
      </div>

      {/* Metrics grid */}
      <div
        className="mx-6 mb-5 rounded-xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" }}
      >
        <div className="grid grid-cols-4 divide-x divide-[#ddd6fe]/60">
          {/* Rank */}
          <div className="px-4 py-4">
            <div className="h-8 w-8 rounded-lg bg-[#ddd6fe]/60 flex items-center justify-center mb-3">
              <Lock className="h-4 w-4 text-[#7c6dd8]" />
            </div>
            <p className="text-[10px] font-semibold text-[#7c6dd8] uppercase tracking-wider mb-1">
              RANK
            </p>
            <p className="text-2xl font-bold text-[#1e293b]">--</p>
          </div>

          {/* Other metrics */}
          {METRICS.map(({ label, icon: Icon, value, prompt }) => (
            <div key={label} className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-semibold text-[#7c6dd8] uppercase tracking-wider leading-tight">
                  {label}
                </p>
                <Icon className="h-4 w-4 text-[#7c6dd8] flex-shrink-0 ml-1" />
              </div>
              <p className="text-2xl font-bold text-[#1e293b]">{value}</p>
              <p className="text-xs text-[#615fff] mt-1 leading-snug">{prompt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex items-center justify-end gap-2.5">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1e293b] hover:bg-slate-50 rounded-xl transition-colors">
          <FileText className="h-4 w-4 text-[#62748e]" />
          Instructions
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#615fff] text-white text-sm font-semibold rounded-xl hover:bg-[#4f39f6] btn-shadow transition-colors">
          <Play className="h-3.5 w-3.5 fill-white stroke-0" />
          Start Labeling
        </button>
      </div>
    </div>
  );
}

function PausedTaskCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status="PAUSED" />
            <h3 className="text-base font-semibold text-[#0f172b]">Polyp Tracing</h3>
            <TypeChip label="Polygon Segmentation" icon={Info} />
            <TypeChip label="Rank Coming Soon" icon={Lock} />
          </div>
          <p className="text-sm text-[#62748e]">The description! The description. It&apos;s a good one.</p>
        </div>
        <button className="p-1 rounded hover:bg-slate-100 flex-shrink-0 mt-0.5">
          <ChevronDown className="h-4 w-4 text-[#62748e]" />
        </button>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex items-center justify-end gap-2.5">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1e293b] hover:bg-slate-50 rounded-xl transition-colors">
          <FileText className="h-4 w-4 text-[#62748e]" />
          Instructions
        </button>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 text-[#94a3b8] text-sm font-semibold rounded-xl cursor-not-allowed"
        >
          <Play className="h-3.5 w-3.5 fill-[#94a3b8] stroke-0" />
          Start Labeling
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col flex-shrink-0">
        {/* Workspace selector */}
        <div className="px-3 py-3 border-b border-slate-100">
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left">
            <div className="h-7 w-7 rounded-md bg-[#0f172b] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                Workspace
              </p>
              <p className="text-sm font-semibold text-[#0f172b] truncate">Labeler Home</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-[#94a3b8] flex-shrink-0" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-2 space-y-0.5">
          <a
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium text-[#0f172b]"
          >
            <Home className="h-4 w-4" />
            Home
          </a>
          <a
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#62748e] hover:bg-slate-50 transition-colors"
          >
            <FileText className="h-4 w-4" />
            Tasks
          </a>
        </nav>

        {/* Expert Labeler Guides */}
        <div className="px-2 pb-2">
          <a
            href="#"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#62748e] hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            <span className="flex-1">Expert Labeler Guides</span>
            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
          </a>
        </div>

        {/* User */}
        <div className="px-3 py-3 border-t border-slate-100">
          <button className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left">
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-[#1e293b]">KH</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#0f172b] truncate">Kai Hara</p>
              <p className="text-xs text-[#62748e] truncate">khara0062@gmail.com</p>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-[#94a3b8] flex-shrink-0" />
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-slate-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button className="p-1.5 rounded-md hover:bg-slate-100 transition-colors">
            <PanelLeft className="h-5 w-5 text-[#62748e]" />
          </button>
          <span className="text-sm font-medium text-[#0f172b]">Home</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome */}
            <h1 className="text-[28px] font-bold text-[#0f172b]">Welcome, Kai Hara!</h1>

            {/* My Tasks heading */}
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#1e293b]">My Tasks</h2>
              <span className="text-sm text-[#62748e]">111 active</span>
            </div>

            {/* Task cards */}
            <OpenTaskCard />
            <PausedTaskCard />

            {/* Footer */}
            <p className="text-sm text-[#62748e] text-center pt-2">
              You have 109 more active tasks.{" "}
              <a href="#" className="text-[#615fff] font-medium hover:underline">
                View All
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
