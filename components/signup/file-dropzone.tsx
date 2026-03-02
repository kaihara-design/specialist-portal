"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  value?: File;
  onChange: (file: File | undefined) => void;
}

export function FileDropzone({ value, onChange }: FileDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) onChange(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  }

  if (value) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[#615fff]/30 bg-[#615fff]/5">
        <FileText className="h-5 w-5 text-[#615fff] flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1e293b] truncate">{value.name}</p>
          <p className="text-xs text-[#62748e]">{(value.size / 1024).toFixed(0)} KB</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="text-[#94a3b8] hover:text-[#62748e] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 rounded-[14px] border cursor-pointer transition-colors",
        dragOver
          ? "border-[#615fff] bg-[#615fff]/5"
          : "border-slate-200 hover:border-[#615fff]/50 hover:bg-slate-50"
      )}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <Upload className={cn("h-4 w-4 flex-shrink-0", dragOver ? "text-[#615fff]" : "text-[#94a3b8]")} />
      <span className="flex-1 text-sm text-[#94a3b8]">Drop file or click to browse</span>
      <span className="text-xs font-medium text-[#615fff] bg-[#615fff]/8 px-2.5 py-1 rounded-lg flex-shrink-0">
        Browse
      </span>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
