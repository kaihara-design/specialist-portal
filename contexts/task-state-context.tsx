"use client";

import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "signed_tasks";
const BGC_STORAGE_KEY = "bgc_status";

export type BgcStatus = "required" | "in_progress" | "completed";

interface TaskStateContextValue {
  isSigned: (taskId: string) => boolean;
  markSigned: (taskId: string) => void;
  resetSigned: () => void;
  getBgcStatus: (taskId: string) => BgcStatus | null;
  startBgc: (taskId: string) => void;
  completeBgc: (taskId: string) => void;
}

const TaskStateContext = createContext<TaskStateContextValue>({
  isSigned: () => false,
  markSigned: () => {},
  resetSigned: () => {},
  getBgcStatus: () => null,
  startBgc: () => {},
  completeBgc: () => {},
});

export function TaskStateProvider({ children }: { children: React.ReactNode }) {
  const [signedTasks, setSignedTasks] = useState<string[]>([]);
  const [bgcStatuses, setBgcStatuses] = useState<Record<string, BgcStatus>>({});

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSignedTasks(JSON.parse(stored));
    } catch {
      // ignore
    }
    try {
      const storedBgc = localStorage.getItem(BGC_STORAGE_KEY);
      if (storedBgc) setBgcStatuses(JSON.parse(storedBgc));
    } catch {
      // ignore
    }
  }, []);

  const markSigned = (taskId: string) => {
    setSignedTasks((prev) => {
      if (prev.includes(taskId)) return prev;
      return [...prev, taskId];
    });
    try {
      const current: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (!current.includes(taskId)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, taskId]));
      }
    } catch {
      // ignore
    }
  };

  const resetSigned = () => {
    setSignedTasks([]);
    setBgcStatuses({});
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(BGC_STORAGE_KEY);
  };

  const isSigned = (taskId: string) => signedTasks.includes(taskId);

  const getBgcStatus = (taskId: string): BgcStatus | null =>
    bgcStatuses[taskId] ?? null;

  const _setBgcStatus = (taskId: string, status: BgcStatus) => {
    setBgcStatuses((prev) => ({ ...prev, [taskId]: status }));
    try {
      const current: Record<string, BgcStatus> = JSON.parse(
        localStorage.getItem(BGC_STORAGE_KEY) ?? "{}"
      );
      localStorage.setItem(
        BGC_STORAGE_KEY,
        JSON.stringify({ ...current, [taskId]: status })
      );
    } catch {
      // ignore
    }
  };

  const startBgc = (taskId: string) => _setBgcStatus(taskId, "in_progress");
  const completeBgc = (taskId: string) => _setBgcStatus(taskId, "completed");

  return (
    <TaskStateContext.Provider
      value={{ isSigned, markSigned, resetSigned, getBgcStatus, startBgc, completeBgc }}
    >
      {children}
    </TaskStateContext.Provider>
  );
}

export const useTaskState = () => useContext(TaskStateContext);
