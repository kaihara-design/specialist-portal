"use client";

import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Info,
  Lock,
  BarChart2,
  Zap,
  Target,
  Play,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

function TypeChip({ label, icon: Icon }: { label: string; icon?: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#62748e] bg-slate-100 px-2 py-0.5 rounded-full">
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}

interface OpenTaskCardProps {
  taskId: string;
  taskName: string;
  taskType: string;
}

export function OpenTaskCard({ taskId, taskName, taskType }: OpenTaskCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-blue-600 bg-blue-50 border-blue-100">
              OPEN
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-[#0f172b]">{taskName}</h3>
            <TypeChip label={taskType} icon={Info} />
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 rounded hover:bg-slate-100 flex-shrink-0 mt-0.5 transition-colors"
        >
          {expanded
            ? <ChevronUp className="h-4 w-4 text-[#62748e]" />
            : <ChevronDown className="h-4 w-4 text-[#62748e]" />
          }
        </button>
      </div>

      {/* Metrics grid — hidden when collapsed */}
      {expanded && (
        <div
          className="mx-6 mb-5 rounded-xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #faf9ff 0%, #ede9fe 100%)" }}
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
                <p className="text-xs text-primary mt-1 leading-snug">{prompt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="px-6 pb-5 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm">
          <BookOpen className="h-4 w-4" />
          Instructions
        </Button>
        <Button size="sm" className="btn-shadow">
          <Play className="h-3.5 w-3.5 fill-white stroke-0" />
          Start Labeling
        </Button>
      </div>
    </div>
  );
}
