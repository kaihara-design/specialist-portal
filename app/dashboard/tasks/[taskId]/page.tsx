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
  Lock,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SignDocumentsModal } from "@/components/sign-documents-modal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTaskState } from "@/contexts/task-state-context";

// ─── Task data map ─────────────────────────────────────────────────────────────

const TASKS_DATA: Record<
  string,
  { name: string; description: string; taskType: string; duration: string; requiresBgc: boolean }
> = {
  "skin-lesion-classification": {
    name: "Skin Lesion Classification",
    description:
      "Analyze dermatological images to identify potential skin lesions. Follow the provided guidelines to classify each image into one of the predefined categories.",
    taskType: "Image Classification",
    duration: "4 weeks",
    requiresBgc: true,
  },
  "polyp-id": {
    name: "Polyp ID (box)",
    description:
      "Identify and draw bounding boxes around polyps in colonoscopy images. Follow the guidelines to accurately localize each polyp.",
    taskType: "Box Segmentation",
    duration: "4 weeks",
    requiresBgc: false,
  },
};

const DOCUMENTS = [
  { id: "master-agreement", label: "Specialist Consulting Agreement" },
  { id: "sow", label: "Statement of Work (SOW)" },
];

// ─── Steps to Begin strip ─────────────────────────────────────────────────────

type StepState = "completed" | "active" | "locked";

function StepsToBegin({ docsSigned, bgcStatus }: { docsSigned: boolean; bgcStatus: "required" | "in_progress" | "completed" | null }) {
  const steps: { label: string; state: StepState }[] = [
    {
      label: "Sign Documents",
      state: docsSigned ? "completed" : "active",
    },
    {
      label: "Background Check",
      state: !docsSigned
        ? "locked"
        : bgcStatus === "completed"
        ? "completed"
        : bgcStatus === "in_progress"
        ? "active"
        : "active",
    },
    {
      label: "Start Labeling",
      state: bgcStatus === "completed" ? "active" : "locked",
    },
  ];

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        Requirements
      </p>
      <div className="border border-border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="flex items-center px-5 py-3.5">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              {/* Step item */}
              <div className="flex items-center gap-2 min-w-0">
                {step.state === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                ) : step.state === "active" ? (
                  <Circle className="h-4 w-4 text-primary flex-shrink-0" />
                ) : (
                  <Lock className="h-3.5 w-3.5 text-muted-foreground/50 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium leading-tight truncate",
                      step.state === "completed"
                        ? "text-muted-foreground line-through decoration-muted-foreground/40"
                        : step.state === "active"
                        ? "text-foreground"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {step.label}
                  </p>
                  <p
                    className={cn(
                      "text-[10px] font-medium mt-0.5",
                      step.state === "completed"
                        ? "text-emerald-500"
                        : step.state === "active"
                        ? "text-primary"
                        : "text-muted-foreground/40"
                    )}
                  >
                    {step.state === "completed"
                      ? "Completed"
                      : step.state === "active"
                      ? "Up next"
                      : "Locked"}
                  </p>
                </div>
              </div>
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="flex-1 mx-4 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

// ─── BGC Required section ─────────────────────────────────────────────────────

function BgcRequiredSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-foreground">
          Background check required
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          This task requires a background check before you can begin work.
        </p>
      </div>

      {/* What's covered */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          What's included
        </p>
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
          {[
            { label: "Criminal record check", sub: "National and county-level search" },
            { label: "Identity verification", sub: "Government-issued ID" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5",
                i === 0 && "border-b border-slate-200"
              )}
            >
              <ShieldCheck className="h-4 w-4 text-slate-300 flex-shrink-0" />
              <div>
                <p className="text-sm text-accent-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-end">
        <Button
          className="btn-shadow"
          onClick={() => {
            window.open("https://apply.checkr.com", "_blank");
            onStart();
          }}
        >
          Start Background Check
        </Button>
      </div>
    </div>
  );
}

// ─── BGC Pending section ──────────────────────────────────────────────────────

function BgcPendingSection({ onSimulateApproved }: { onSimulateApproved: () => void }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Clock className="h-4 w-4 text-blue-500" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-foreground">
            Your background check is underway
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We'll email you with next steps once your results are ready. This
            typically takes 3–5 business days.
          </p>
        </div>
      </div>

      {/* Demo sim button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onSimulateApproved}
          className="text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors"
        >
          Simulate: BGC Approved
        </button>
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
  const { isSigned, markSigned, getBgcStatus, startBgc, completeBgc } = useTaskState();
  const signed = isSigned(taskId);
  const [modalOpen, setModalOpen] = useState(false);
  const [instructionsViewed, setInstructionsViewed] = useState(false);

  const task = TASKS_DATA[taskId] ?? TASKS_DATA["skin-lesion-classification"];
  const bgcStatus = task.requiresBgc ? (getBgcStatus(taskId) ?? "required") : null;

  // Resolved page state
  const pageState: "invited" | "bgc_required" | "bgc_pending" | "open" = (() => {
    if (!signed) return "invited";
    if (task.requiresBgc && bgcStatus !== "completed") {
      return bgcStatus === "in_progress" ? "bgc_pending" : "bgc_required";
    }
    return "open";
  })();

  // Hero badge
  const badgeConfig = {
    invited:      { label: "INVITED",      cls: "text-orange-600 bg-orange-50 border-orange-100" },
    bgc_required: { label: "BGC REQUIRED", cls: "text-amber-600 bg-amber-50 border-amber-100" },
    bgc_pending:  { label: "BGC PENDING",  cls: "text-sky-600 bg-sky-50 border-sky-100" },
    open:         { label: "OPEN",         cls: "text-blue-600 bg-blue-50 border-blue-100" },
  }[pageState];

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

            {/* Task hero */}
            <div className="space-y-3">
              <span
                className={cn(
                  "inline-block text-xs font-semibold px-3 py-1 rounded-full border tracking-wide",
                  badgeConfig.cls
                )}
              >
                {badgeConfig.label}
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

            {/* Steps to Begin strip (BGC tasks only) */}
            {task.requiresBgc && (
              <StepsToBegin docsSigned={signed} bgcStatus={bgcStatus} />
            )}

            {/* State-specific section */}
            {pageState === "invited" && (
              <InvitedSection onSignClick={() => setModalOpen(true)} />
            )}
            {pageState === "bgc_required" && (
              <BgcRequiredSection onStart={() => startBgc(taskId)} />
            )}
            {pageState === "bgc_pending" && (
              <BgcPendingSection onSimulateApproved={() => completeBgc(taskId)} />
            )}
            {pageState === "open" && (
              <OpenSection
                instructionsViewed={instructionsViewed}
                onViewInstructions={() => setInstructionsViewed(true)}
              />
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
