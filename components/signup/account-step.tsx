"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { SignupFormData } from "@/lib/types";
import { GoogleOAuthButton } from "./google-oauth-button";
import { cn } from "@/lib/utils";

interface AccountStepProps {
  data: SignupFormData;
  onNext: (data: Partial<SignupFormData>) => void;
  onBack?: () => void;
  onGoogleAuth: () => void;
}

type Errors = Partial<Record<"fullName" | "email" | "password", string>>;

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#0a0a0a]">
        {label}
        {required && <span className="ml-0.5 text-[#ff6467]">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 text-sm text-[#1e293b] placeholder:text-[#94a3b8] bg-white focus:outline-none focus:border-[#4f46e5] transition-colors";

export function AccountStep({ data, onNext, onBack, onGoogleAuth }: AccountStepProps) {
  const [fullName, setFullName] = useState(data.fullName);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};
    if (!fullName.trim()) e.fullName = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onNext({ fullName, email, password, authMethod: "email" });
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium text-[#62748e] hover:text-[#1e293b] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <span className="text-xs font-semibold tracking-widest text-[#525252] uppercase">
          Step 1 of 3
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#0a0a0a]">Create account</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Full name" required error={errors.fullName}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Smith"
            className={cn(inputClass, errors.fullName && "border-red-400")}
            autoFocus
          />
        </Field>

        <Field label="Email address" required error={errors.email}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@hospital.com"
            className={cn(inputClass, errors.email && "border-red-400")}
          />
        </Field>

        <Field label="Password" required error={errors.password}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className={cn(inputClass, "pr-10", errors.password && "border-red-400")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#62748e] transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>

        <button
          type="submit"
          className="w-full py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] btn-shadow transition-colors"
        >
          Continue
        </button>
      </form>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">or connect with</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <GoogleOAuthButton onClick={onGoogleAuth} />
    </div>
  );
}
