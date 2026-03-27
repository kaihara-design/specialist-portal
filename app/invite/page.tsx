"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { GoogleOAuthButton } from "@/components/signup/google-oauth-button";
import { FigmaLinkBadge } from "@/components/signup/figma-link-badge";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 bg-white text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#4f46e5] transition-colors";

type Errors = Partial<Record<"fullName" | "email" | "password", string>>;

function InvitePage() {
  const params = useSearchParams();
  const inviteParam = params.get("invite"); // "preview" | "expired" | null
  const roleParam = params.get("role") as "customer" | "specialist" | null;
  const emailParam = params.get("email") ?? "";
  const nameParam = params.get("name") ?? "";

  const isValidInvite = inviteParam === "preview";
  const isExpiredInvite = inviteParam === "expired";

  const roleLabel = roleParam === "customer" ? "customer" : roleParam === "specialist" ? "specialist" : null;

  const [fullName, setFullName] = useState(nameParam);
  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
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
    // No-op for prototype
  }

  return (
    <main className="relative min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="globe-bg" aria-hidden="true" />

      <div className="relative w-full max-w-md space-y-5">
        <div className="card-glass rounded-[24px] p-8 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.4)] animate-fade-in space-y-6">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/centaur-logo.svg" alt="Centaur" className="h-8 w-auto" />

          {/* Banner */}
          {isValidInvite && (
            <div className="flex gap-3 rounded-[8px] border border-green-200 bg-green-50 p-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-800">You&apos;ve been invited!</p>
                <p className="text-sm text-green-700">
                  You&apos;ve been invited to join Centaur
                  {roleLabel ? ` as a ${roleLabel}` : ""}.
                </p>
              </div>
            </div>
          )}

          {isExpiredInvite && (
            <div className="flex gap-3 rounded-[8px] border border-red-200 bg-red-50 p-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">That invitation does not exist.</p>
                <p className="text-sm text-red-600">
                  Please contact the person who invited you to get a new invite link, or create an account without an invite.
                </p>
              </div>
            </div>
          )}

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0a0a0a]">Create your account</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#374151]">Already have an account?</span>
              <Link href="/login" className="font-semibold text-[#4f46e5] hover:underline">
                Sign in
              </Link>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#0a0a0a]">
                Full name<span className="ml-0.5 text-[#ff6467]">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Smith"
                className={cn(inputClass, errors.fullName && "border-red-400")}
                autoFocus={!isValidInvite}
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#0a0a0a]">
                Email<span className="ml-0.5 text-[#ff6467]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                readOnly={isValidInvite}
                className={cn(
                  inputClass,
                  errors.email && "border-red-400",
                  isValidInvite && "bg-slate-50 cursor-not-allowed text-[#62748e]"
                )}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#0a0a0a]">
                Password<span className="ml-0.5 text-[#ff6467]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className={cn(inputClass, "pr-10", errors.password && "border-red-400")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#62748e] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] btn-shadow transition-colors"
            >
              Create account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">or connect with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <GoogleOAuthButton />
        </div>
      </div>

      <FigmaLinkBadge href="https://www.figma.com/design/Kh6wLrgfrPnC11BJx5GRAM/Specialist-Onboarding?node-id=701-2048" />
    </main>
  );
}

export default function InvitePageWrapper() {
  return (
    <Suspense>
      <InvitePage />
    </Suspense>
  );
}
