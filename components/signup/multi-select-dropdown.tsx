"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select options",
  searchable = false,
  error,
  disabled = false,
  required = false,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  const filtered = searchable && query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const triggerLabel = selected.length === 0 ? placeholder : selected.join(", ");

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
        {label}
        {required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center justify-between px-3.5 py-2.5 rounded-[8px] border bg-white text-sm transition-colors",
          !disabled && "hover:border-[#615fff]/50 focus:outline-none focus:border-[#615fff]",
          disabled ? "border-slate-200 opacity-50 cursor-not-allowed" : error ? "border-red-400" : "border-slate-200",
          !disabled && open && "border-[#615fff]",
          selected.length === 0 ? "text-[#94a3b8]" : "text-[#1e293b]"
        )}
      >
        <span className="truncate">{triggerLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#94a3b8] flex-shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden animate-fade-in">
          {searchable && (
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
                const checked = selected.includes(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggle(option)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors",
                      "hover:bg-[#615fff]/5",
                      checked && "text-[#615fff]"
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 rounded flex-shrink-0 border flex items-center justify-center transition-colors",
                        checked
                          ? "bg-[#615fff] border-[#615fff]"
                          : "border-slate-300 bg-white"
                      )}
                    >
                      {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                    </div>
                    <span className={checked ? "font-medium" : "text-[#1e293b]"}>{option}</span>
                  </button>
                );
              })
            )}
          </div>
          {selected.length > 0 && (
            <div className="border-t border-slate-100 px-3 py-2">
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-xs text-[#62748e] hover:text-[#615fff] transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
