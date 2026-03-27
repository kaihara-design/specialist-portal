"use client";

import Link from "next/link";
import { Info, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvitedTaskCardProps {
  taskName: string;
  taskType: string;
  description: string;
  taskId: string;
}

export function InvitedTaskCard({
  taskName,
  taskType,
  description,
  taskId,
}: InvitedTaskCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-orange-600 bg-orange-50 border-orange-100">
              INVITED
            </span>
            <p className="text-xs text-slate-500">
              Please sign your documents to get started!
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-[#0f172b]">
              {taskName}
            </h3>
            <span className="inline-flex items-center gap-1 text-xs text-[#62748e] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
              <Info className="h-3 w-3" />
              {taskType}
            </span>
          </div>
          <p className="text-sm text-[#62748e]">{description}</p>
        </div>
      </div>

      {/* Action */}
      <div className="px-6 pb-5 flex items-center justify-end">
        <Button asChild size="sm" className="btn-shadow">
          <Link href={`/dashboard/tasks/${taskId}`}>
            <FileSignature className="h-4 w-4" />
            View and Sign Documents
          </Link>
        </Button>
      </div>
    </div>
  );
}
