"use client";

import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "signed_tasks";

interface TaskStateContextValue {
  isSigned: (taskId: string) => boolean;
  markSigned: (taskId: string) => void;
  resetSigned: () => void;
}

const TaskStateContext = createContext<TaskStateContextValue>({
  isSigned: () => false,
  markSigned: () => {},
  resetSigned: () => {},
});

export function TaskStateProvider({ children }: { children: React.ReactNode }) {
  const [signedTasks, setSignedTasks] = useState<string[]>([]);

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSignedTasks(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const markSigned = (taskId: string) => {
    setSignedTasks((prev) => {
      if (prev.includes(taskId)) return prev;
      return [...prev, taskId];
    });
    // Write to localStorage outside state updater (safe from Strict Mode double-invoke)
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
    localStorage.removeItem(STORAGE_KEY);
  };

  const isSigned = (taskId: string) => signedTasks.includes(taskId);

  return (
    <TaskStateContext.Provider value={{ isSigned, markSigned, resetSigned }}>
      {children}
    </TaskStateContext.Provider>
  );
}

export const useTaskState = () => useContext(TaskStateContext);
