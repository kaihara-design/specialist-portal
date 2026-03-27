"use client";

import { PanelLeft } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { InvitedTaskCard } from "@/components/dashboard/invited-task-card";
import { InReviewTaskCard } from "@/components/dashboard/in-review-task-card";
import { OpenTaskCard } from "@/components/dashboard/open-task-card";
import { PausedTaskCard } from "@/components/dashboard/paused-task-card";
import { useTaskState } from "@/contexts/task-state-context";

// ─── Task data ─────────────────────────────────────────────────────────────────

const TASKS = [
  {
    taskId: "skin-lesion-classification",
    taskName: "Skin Lesion Classification",
    taskType: "Classification",
    description:
      "Analyze dermatological images to identify potential skin lesions. Follow the provided guidelines to classify each image into one of the predefined categories.",
    requiresBgc: true,
  },
  {
    taskId: "polyp-id",
    taskName: "Polyp ID (box)",
    taskType: "Box Segmentation",
    description:
      "Identify and draw bounding boxes around polyps in colonoscopy images. Follow the guidelines to accurately localize each polyp.",
    requiresBgc: false,
  },
];

// ─── Helper ────────────────────────────────────────────────────────────────────

function TaskCard({
  task,
  isSigned,
  bgcStatus,
}: {
  task: (typeof TASKS)[number];
  isSigned: boolean;
  bgcStatus: ReturnType<ReturnType<typeof useTaskState>["getBgcStatus"]>;
}) {
  if (isSigned && task.requiresBgc && bgcStatus === "in_progress") {
    return (
      <InReviewTaskCard
        taskId={task.taskId}
        taskName={task.taskName}
        taskType={task.taskType}
        description={task.description}
      />
    );
  }
  if (isSigned && (!task.requiresBgc || bgcStatus === "completed")) {
    return (
      <OpenTaskCard
        taskId={task.taskId}
        taskName={task.taskName}
        taskType={task.taskType}
      />
    );
  }
  return (
    <InvitedTaskCard
      taskId={task.taskId}
      taskName={task.taskName}
      taskType={task.taskType}
      description={task.description}
      requiresBgc={task.requiresBgc}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const { isSigned, getBgcStatus } = useTaskState();

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <DashboardSidebar active="tasks" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-slate-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button className="p-1.5 rounded-md hover:bg-slate-100 transition-colors">
            <PanelLeft className="h-5 w-5 text-[#62748e]" />
          </button>
          <span className="text-sm font-medium text-[#0f172b]">Tasks</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-[28px] font-bold text-[#0f172b]">My Tasks</h1>

            {TASKS.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                isSigned={isSigned(task.taskId)}
                bgcStatus={getBgcStatus(task.taskId)}
              />
            ))}
            <PausedTaskCard />
          </div>
        </main>
      </div>
    </div>
  );
}
