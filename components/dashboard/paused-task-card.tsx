"use client";

import { ChevronDown, Info, Lock, Play, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function TypeChip({ label, icon: Icon }: { label: string; icon?: React.ElementType }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-[#62748e] bg-slate-100 px-2 py-0.5 rounded-full">
      {Icon && <Icon className="h-3 w-3" />}
      {label}
    </span>
  );
}

export function PausedTaskCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-slate-500 bg-slate-100 border-slate-200">
              PAUSED
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-[#0f172b]">Polyp Tracing</h3>
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
      <div className="px-6 pb-5 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm">
          <FileText className="h-4 w-4" />
          Instructions
        </Button>
        <Button size="sm" disabled>
          <Play className="h-3.5 w-3.5" />
          Start Labeling
        </Button>
      </div>
    </div>
  );
}
