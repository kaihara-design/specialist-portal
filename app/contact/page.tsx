"use client";

import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { FigmaLinkBadge } from "@/components/signup/figma-link-badge";

const FIGMA_URL = "https://www.figma.com/design/Kh6wLrgfrPnC11BJx5GRAM/Specialist-Onboarding?node-id=701-18401&t=6SWHt6ZwhAwfuLLr-1";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="globe-bg" aria-hidden="true" />

      <div className="relative w-full max-w-md space-y-5">
        <div className="card-glass rounded-[24px] p-8 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.4)] animate-fade-in space-y-6">
          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-medium text-[#62748e] hover:text-[#1e293b] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/centaur-logo.svg" alt="Centaur" className="h-8 w-auto" />

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0a0a0a]">Talk to our team</h1>
            <p className="text-sm text-[#737373] leading-relaxed">
              Centaur works with AI teams at leading companies. Tell us about your project and we&apos;ll be in touch.
            </p>
          </div>

          {/* CTA */}
          <a
            href="mailto:contact@centaurlabs.com"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-[12px] bg-[#4f46e5] text-white text-sm font-semibold hover:bg-[#4338ca] btn-shadow transition-colors"
          >
            <Mail className="h-4 w-4" />
            Contact us
          </a>

          {/* Sign-in nudge */}
          <p className="text-center text-sm text-[#737373]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4f46e5] font-medium hover:underline">
              Sign in →
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-6">
          <a href="#" className="text-xs text-[#62748e] hover:text-slate-700 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-[#62748e] hover:text-slate-700 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>

      {FIGMA_URL && <FigmaLinkBadge href={FIGMA_URL} />}
    </main>
  );
}
