import { TaskStateProvider } from "@/contexts/task-state-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskStateProvider>{children}</TaskStateProvider>;
}
