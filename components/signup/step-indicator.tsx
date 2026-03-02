"use client";

interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <p className="text-xs font-semibold tracking-widest text-[#62748e] uppercase">
        Step {current} of {total}
      </p>
      <div className="h-1 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full progress-gradient transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
