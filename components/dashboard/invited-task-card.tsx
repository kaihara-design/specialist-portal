"use client";

import { useState } from "react";
import { Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignDocumentsModal } from "@/components/sign-documents-modal";
import { useTaskState } from "@/contexts/task-state-context";

interface InvitedTaskCardProps {
  taskName: string;
  taskType: string;
  description: string;
  taskId: string;
  requiresBgc?: boolean;
}

export function InvitedTaskCard({
  taskName,
  taskType,
  description,
  taskId,
  requiresBgc = false,
}: InvitedTaskCardProps) {
  const { isSigned, markSigned, startBgc } = useTaskState();
  const [modalOpen, setModalOpen] = useState(false);

  const docsSigned = isSigned(taskId);
  const showBgcCta = docsSigned && requiresBgc;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-orange-600 bg-orange-50 border-orange-100">
                INVITED
              </span>
              <p className="text-xs text-slate-500">
                {showBgcCta
                  ? "Documents signed. Complete your background check to continue."
                  : "Please sign your documents to get started!"}
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

        {/* Action */}
        <div className="px-6 pb-5 flex items-center justify-end gap-3">
          {showBgcCta ? (
            <>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Documents signed
              </span>
              <Button
                size="sm"
                className="btn-shadow"
                onClick={() => {
                  window.open("https://apply.checkr.com", "_blank");
                  startBgc(taskId);
                }}
              >
                Start Background Check
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              className="btn-shadow"
              onClick={() => setModalOpen(true)}
            >
              Sign Documents
            </Button>
          )}
        </div>
      </div>

      {modalOpen && (
        <SignDocumentsModal
          taskName={taskName}
          onClose={() => setModalOpen(false)}
          onComplete={() => {
            markSigned(taskId);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
