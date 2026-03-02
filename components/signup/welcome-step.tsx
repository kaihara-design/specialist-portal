"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  email: string;
  fullName: string;
}

const NEXT_STEPS = [
  {
    title: "Check your inbox",
    text: "A welcome email is on its way to confirm your spot.",
  },
  {
    title: "Profile review",
    text: "Our sourcing team will match you to relevant tasks based on your background.",
  },
  {
    title: "First task invite",
    text: "You'll receive an invite with full instructions and compensation details.",
  },
];

const BADGE_GRADIENT = "linear-gradient(to right, #5a52be, #403c6e)";

export function WelcomeStep({ email: _email, fullName: _fullName }: WelcomeStepProps) {
  return (
    <div className="relative z-10 w-full max-w-5xl animate-fade-in px-4">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-6">
        {/* Left: heading + steps */}
        <div className="flex flex-col gap-8 flex-1">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-bold text-[#0f172b] leading-tight whitespace-nowrap">
              Welcome to Centaur.ai
            </h1>
            <h2
              className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent whitespace-nowrap"
              style={{ backgroundImage: "linear-gradient(to right, #392fae, #403c6e)" }}
            >
              Specialist Network
            </h2>
          </div>

          {/* What happens next */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-widest text-[#737373] uppercase">
              What happens next
            </p>
            {NEXT_STEPS.map(({ title, text }, i) => (
              <div key={i} className="flex items-start gap-[14px]">
                <span
                  className="mt-0.5 text-xs font-bold text-white h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: BADGE_GRADIENT }}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[#0f172b]">{title}</p>
                  <p className="text-xs text-[#737373] mt-0.5 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <Link
          href="/dashboard"
          className="self-start md:self-auto flex items-center gap-2 px-6 py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-semibold hover:bg-[#4338ca] btn-shadow transition-colors whitespace-nowrap flex-shrink-0"
        >
          Go to dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
