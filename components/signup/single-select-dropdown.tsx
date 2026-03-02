"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface SingleSelectDropdownProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  optionalLabel?: boolean;
  required?: boolean;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}

export function SingleSelectDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  error,
  optionalLabel = false,
  required = false,
  otherValue,
  onOtherChange,
}: SingleSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [editingOther, setEditingOther] = useState(false);
  const [otherInput, setOtherInput] = useState(otherValue ?? "");
  const ref = useRef<HTMLDivElement>(null);
  const editingOtherRef = useRef(false);

  // Keep ref in sync for click-outside handler (avoids stale closure)
  useEffect(() => {
    editingOtherRef.current = editingOther;
  }, [editingOther]);

  // When dropdown closes, reset editing state
  useEffect(() => {
    if (!open) {
      setEditingOther(false);
      setOtherInput(otherValue ?? "");
      setQuery("");
    }
  }, [open, otherValue]);

  const otherOption = onOtherChange
    ? options.find((o) => o.value === "Other" || o.value === "other")
    : undefined;

  const confirmOther = useCallback(() => {
    if (!otherOption || !onOtherChange) return;
    const trimmed = otherInput.trim();
    if (trimmed) {
      onChange(otherOption.value);
      onOtherChange(trimmed);
    } else {
      onChange("");
      onOtherChange("");
    }
    setOpen(false);
  }, [otherOption, onOtherChange, otherInput, onChange]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (editingOtherRef.current) {
          confirmOther();
        } else {
          setOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [confirmOther]);

  function select(option: Option) {
    if (otherOption && option.value === otherOption.value && onOtherChange) {
      // Switch to inline editing mode
      setEditingOther(true);
      setOtherInput(otherValue ?? "");
      return;
    }
    onChange(option.value);
    setOpen(false);
    setQuery("");
  }

  const filtered =
    searchable && query
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options;

  // Trigger label: if Other is selected and has a custom value, show it
  const selectedOption = options.find((o) => o.value === value);
  const isOtherSelected = otherOption && value === otherOption.value;
  const triggerLabel = isOtherSelected && otherValue
    ? otherValue
    : selectedOption?.label;

  return (
    <div ref={ref} className="relative">
      {label && (
        <label className="block text-sm font-medium text-[#1e293b] mb-1.5">
          {label}
          {required && <span className="ml-0.5 text-red-400">*</span>}
          {optionalLabel && (
            <span className="ml-2 text-xs text-[#94a3b8] font-normal">optional</span>
          )}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between px-3.5 py-2.5 rounded-[14px] border bg-white text-sm transition-colors",
          "hover:border-[#615fff]/50 focus:outline-none focus:border-[#615fff]",
          error ? "border-red-400" : "border-slate-200",
          open && "border-[#615fff]",
          !triggerLabel ? "text-[#94a3b8]" : "text-[#1e293b]"
        )}
      >
        <span className="truncate">{triggerLabel ?? placeholder}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#94a3b8] flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden animate-fade-in">
          {searchable && !editingOther && (
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
              <Search className="h-3.5 w-3.5 text-[#94a3b8] flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-sm outline-none text-[#1e293b] placeholder:text-[#94a3b8] bg-transparent"
                autoFocus
              />
            </div>
          )}
          <div className="max-h-52 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="px-3 py-2 text-sm text-[#94a3b8]">No results</p>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                const isOtherOption = otherOption && option.value === otherOption.value;

                // Render inline text input when editing Other
                if (isOtherOption && editingOther) {
                  return (
                    <div key={option.value} className="px-3 py-2.5">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-3.5 w-3.5 text-[#615fff] flex-shrink-0" />
                        <span className="text-sm font-medium text-[#615fff]">Other</span>
                      </div>
                      <input
                        type="text"
                        value={otherInput}
                        onChange={(e) => setOtherInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            confirmOther();
                          }
                          if (e.key === "Escape") {
                            setEditingOther(false);
                            setOpen(false);
                          }
                        }}
                        placeholder="Please specify..."
                        className="w-full text-sm px-2.5 py-1.5 rounded-[10px] border border-[#615fff]/40 focus:outline-none focus:border-[#615fff] text-[#1e293b] placeholder:text-[#94a3b8] bg-slate-50"
                        autoFocus
                      />
                      <p className="mt-1.5 text-xs text-[#94a3b8]">Press Enter to confirm</p>
                    </div>
                  );
                }

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => select(option)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors",
                      "hover:bg-[#615fff]/5",
                      isSelected ? "text-[#615fff]" : "text-[#1e293b]"
                    )}
                  >
                    <span className={isSelected ? "font-medium" : ""}>{option.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-[#615fff] flex-shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
