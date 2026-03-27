"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  Home,
  FileText,
  BookOpen,
  ExternalLink,
  ChevronsUpDown,
  CircleUserRound,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskState } from "@/contexts/task-state-context";

interface DashboardSidebarProps {
  active?: "home" | "tasks" | "settings";
}

export function DashboardSidebar({ active }: DashboardSidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { resetSigned } = useTaskState();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
            <p className="text-sm font-semibold text-[#0f172b] truncate">Specialist Home</p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-[#94a3b8] flex-shrink-0" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-0.5">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            active === "home"
              ? "bg-slate-100 text-[#0f172b]"
              : "text-[#62748e] hover:bg-slate-50"
          )}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/dashboard/tasks"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            active === "tasks"
              ? "bg-slate-100 text-[#0f172b]"
              : "text-[#62748e] hover:bg-slate-50"
          )}
        >
          <FileText className="h-4 w-4" />
          Tasks
        </Link>
      </nav>

      {/* Reset Demo */}
      <div className="px-2 pb-1">
        <button
          onClick={resetSigned}
          className="w-full text-xs text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors py-1 text-center"
        >
          Reset Demo
        </button>
      </div>

      {/* Specialist Guides */}
      <div className="px-2 pb-2">
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-[#62748e] hover:bg-slate-50 transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          <span className="flex-1">Specialist Guides</span>
          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
        </a>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-slate-100 relative" ref={menuRef}>
        {/* Popover menu */}
        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden z-50">
            {/* User header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-[#1e293b]">KH</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0f172b] truncate">Kai Hara</p>
                <p className="text-xs text-[#62748e] truncate">khara0062@gmail.com</p>
              </div>
            </div>
            {/* Menu items */}
            <Link
              href="/dashboard/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#1e293b] hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <CircleUserRound className="h-4 w-4 text-[#62748e]" />
              My Profile
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#1e293b] hover:bg-slate-50 transition-colors"
            >
              <LogOut className="h-4 w-4 text-[#62748e]" />
              Log out
            </button>
          </div>
        )}

        {/* Trigger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
        >
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
  );
}
