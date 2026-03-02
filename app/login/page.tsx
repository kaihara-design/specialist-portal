"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { GoogleOAuthButton } from "@/components/signup/google-oauth-button";
import { FigmaLinkBadge } from "@/components/signup/figma-link-badge";
import { cn } from "@/lib/utils";

const FIGMA_URL = process.env.NEXT_PUBLIC_FIGMA_URL ?? "";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-[14px] border border-slate-200 bg-white text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#4f46e5] transition-colors";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No-op for prototype
  }

  return (
    <main className="relative min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="globe-bg" aria-hidden="true" />

      <div className="relative w-full max-w-md space-y-5">
        <div className="card-glass rounded-[24px] p-8 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <div className="mb-7">
            <div className="h-14 w-14 rounded-[16px] bg-[#0f172b] flex items-center justify-center">
              <span className="text-white text-xl font-bold tracking-tight">C</span>
            </div>
          </div>

          {/* Headline */}
          <div className="mb-6">
            <h1 className="text-[28px] font-bold leading-tight text-[#0f172b]">
              Sign in to Centaur Labs
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#1e293b]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={inputClass}
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[#1e293b]">Password</label>
                <a href="#" className="text-sm text-[#4f46e5] hover:underline">
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={cn(inputClass, "pr-10")}
                  autoComplete="current-password"
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
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-[14px] bg-[#4f46e5] text-white text-sm font-semibold hover:bg-[#4338ca] transition-colors mt-1"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs font-medium text-[#94a3b8] uppercase tracking-wider">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* OAuth options */}
          <div className="space-y-2.5">
            <GoogleOAuthButton />
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-[14px] border border-slate-200 bg-white text-sm font-medium text-[#1e293b] hover:bg-slate-50 transition-colors"
            >
              <KeyRound className="h-4 w-4 text-[#62748e]" />
              Sign in with SAML SSO
            </button>
          </div>

          {/* Sign-up path */}
          <p className="mt-6 text-center text-sm text-[#62748e]">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-[#4f46e5] font-medium hover:underline">
              Sign up →
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-6">
          <a href="#" className="text-xs text-[#94a3b8] hover:text-[#62748e] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-[#94a3b8] hover:text-[#62748e] transition-colors">
            Terms of Service
          </a>
        </div>
      </div>

      {FIGMA_URL && <FigmaLinkBadge href={FIGMA_URL} />}
    </main>
  );
}
