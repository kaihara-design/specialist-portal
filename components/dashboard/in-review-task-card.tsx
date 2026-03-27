"use client";

import { Info, Clock } from "lucide-react";
import { useTaskState } from "@/contexts/task-state-context";

interface InReviewTaskCardProps {
  taskName: string;
  taskType: string;
  description: string;
  taskId: string;
}

export function InReviewTaskCard({
  taskName,
  taskType,
  description,
  taskId,
}: InReviewTaskCardProps) {
  const { completeBgc } = useTaskState();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-sky-600 bg-sky-50 border-sky-100">
              IN REVIEW
            </span>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Your documents and background check have been submitted. We&apos;ll notify you once you&apos;re approved to start.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-[#0f172b]">{taskName}</h3>
            <span className="inline-flex items-center gap-1 text-xs text-[#62748e] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
              <Info className="h-3 w-3" />
              {taskType}
            </span>
          </div>
          <p className="text-sm text-[#62748e]">{description}</p>
        </div>
      </div>

      {/* Demo-only: simulate ops approval */}
      <div className="px-6 pb-5 flex justify-end">
        <button
          onClick={() => completeBgc(taskId)}
          className="text-[11px] text-slate-300 hover:text-slate-400 transition-colors"
        >
          Demo: Approve
        </button>
      </div>
    </div>
  );
}
