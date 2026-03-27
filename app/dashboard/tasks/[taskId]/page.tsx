"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  Play,
  Download,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SignDocumentsModal } from "@/components/sign-documents-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTaskState } from "@/contexts/task-state-context";

// ─── Task data map ─────────────────────────────────────────────────────────────

const TASKS_DATA: Record<string, { name: string; description: string; taskType: string; duration: string }> = {
  "skin-lesion-classification": {
    name: "Skin Lesion Classification",
    description:
      "Analyze dermatological images to identify potential skin lesions. Follow the provided guidelines to classify each image into one of the predefined categories.",
    taskType: "Image Classification",
    duration: "4 weeks",
  },
  "polyp-id": {
    name: "Polyp ID (box)",
    description:
      "Identify and draw bounding boxes around polyps in colonoscopy images. Follow the guidelines to accurately localize each polyp.",
    taskType: "Box Segmentation",
    duration: "4 weeks",
  },
};

const DOCUMENTS = [
  { id: "master-agreement", label: "Specialist Consulting Agreement" },
  { id: "sow", label: "Statement of Work (SOW)" },
];

// ─── Invited state section ────────────────────────────────────────────────────

function InvitedSection({ onSignClick }: { onSignClick: () => void }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Sign documents to accept this task
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          All documents must be signed before you can begin work.
        </p>
      </div>

      {/* Document list */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Documents
        </p>
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {DOCUMENTS.map((doc, i) => (
            <div
              key={doc.id}
              className={cn(
                "flex items-center justify-between px-4 py-3.5",
                i < DOCUMENTS.length - 1 && "border-b border-slate-200"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-accent-foreground">
                  {doc.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-orange-600">
                Pending
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <Button onClick={onSignClick} className="btn-shadow">
          Sign Documents
        </Button>
      </div>
    </div>
  );
}

// ─── Open state section ───────────────────────────────────────────────────────

function OpenSection({
  instructionsViewed,
  onViewInstructions,
}: {
  instructionsViewed: boolean;
  onViewInstructions: () => void;
}) {
  return (
    <div className="space-y-5">
      {/* Signed documents */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
            Signed Documents
          </p>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/75 transition-colors">
            <Download className="h-3.5 w-3.5" />
            Download All
          </button>
        </div>
        <div className="border border-border rounded-xl overflow-hidden bg-white shadow-sm">
          {DOCUMENTS.map((doc, i) => (
            <div
              key={doc.id}
              className={cn(
                "flex items-center justify-between px-4 py-3.5",
                i < DOCUMENTS.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-accent-foreground">
                  {doc.label}
                </span>
              </div>
              <span className="text-xs font-semibold text-green-700">
                Signed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions + Start labeling */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <p className="text-sm text-muted-foreground">
          Please review the instructions before you start.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onViewInstructions}>
            <BookOpen className="h-4 w-4" />
            View Instructions
          </Button>
          <Button disabled={!instructionsViewed} className={cn(instructionsViewed && "btn-shadow")}>
            <Play className={cn("h-3.5 w-3.5", instructionsViewed ? "fill-white stroke-0" : "fill-current stroke-0")} />
            Start Labeling
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TaskDetailPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = use(params);
  const router = useRouter();
  const { isSigned, markSigned } = useTaskState();
  const signed = isSigned(taskId);
  const [modalOpen, setModalOpen] = useState(false);
  const [instructionsViewed, setInstructionsViewed] = useState(false);

  const task = TASKS_DATA[taskId] ?? TASKS_DATA["skin-lesion-classification"];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar active="tasks" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-border flex items-center px-4 flex-shrink-0">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-accent-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-7">

            {/* Task hero — left aligned */}
            <div className="space-y-3">
              <span
                className={cn(
                  "inline-block text-xs font-semibold px-3 py-1 rounded-full border tracking-wide",
                  signed
                    ? "text-blue-600 bg-blue-50 border-blue-100"
                    : "text-orange-600 bg-orange-50 border-orange-100"
                )}
              >
                {signed ? "OPEN" : "INVITED"}
              </span>

              <h1 className="text-[26px] font-semibold tracking-tight text-foreground leading-tight">
                {task.name}
              </h1>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {task.description}
              </p>
            </div>

            {/* Metadata boxes */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border rounded-xl px-5 py-4 bg-white shadow-sm">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Task Type
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {task.taskType}
                </p>
              </div>
              <div className="border border-border rounded-xl px-5 py-4 bg-white shadow-sm">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
                  Duration
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {task.duration}
                </p>
              </div>
            </div>

            {/* State-specific section */}
            {signed ? (
              <OpenSection
                instructionsViewed={instructionsViewed}
                onViewInstructions={() => setInstructionsViewed(true)}
              />
            ) : (
              <InvitedSection onSignClick={() => setModalOpen(true)} />
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <SignDocumentsModal
          taskName={task.name}
          onClose={() => setModalOpen(false)}
          onComplete={() => {
            setModalOpen(false);
            markSigned(taskId);
          }}
        />
      )}
    </div>
  );
}
