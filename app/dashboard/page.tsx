"use client";

import Link from "next/link";
import { PanelLeft } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { InvitedTaskCard } from "@/components/dashboard/invited-task-card";
import { OpenTaskCard } from "@/components/dashboard/open-task-card";
import { useTaskState } from "@/contexts/task-state-context";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { isSigned, getBgcStatus } = useTaskState();

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <DashboardSidebar active="home" />

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
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Welcome */}
            <h1 className="text-[28px] font-bold text-[#0f172b]">Welcome, Kai Hara!</h1>

            {/* My Tasks heading */}
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#1e293b]">My Tasks</h2>
              <span className="text-sm text-[#62748e]">111 active</span>
            </div>

            {/* Task cards — max 2 on home */}
            {isSigned("skin-lesion-classification") ? (
              <OpenTaskCard
                taskId="skin-lesion-classification"
                taskName="Skin Lesion Classification"
                taskType="Classification"
                bgcStatus={getBgcStatus("skin-lesion-classification")}
              />
            ) : (
              <InvitedTaskCard
                taskId="skin-lesion-classification"
                taskName="Skin Lesion Classification"
                taskType="Classification"
                description="Analyze dermatological images to identify potential skin lesions. Follow the provided guidelines to classify each image into one of the predefined categories."
              />
            )}
            <OpenTaskCard taskId="polyp-id" taskName="Polyp ID (box)" taskType="Box Segmentation" />

            {/* Footer */}
            <p className="text-sm text-[#62748e] text-center pt-2">
              You have 109 more active tasks.{" "}
              <Link href="/dashboard/tasks" className="text-primary font-medium hover:underline">
                View All
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
