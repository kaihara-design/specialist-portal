"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, WandSparkles } from "lucide-react";
import { FigmaLinkBadge } from "@/components/signup/figma-link-badge";
import { cn } from "@/lib/utils";

const FIGMA_URL = "https://www.figma.com/design/Kh6wLrgfrPnC11BJx5GRAM/Specialist-Onboarding?node-id=701-2048&t=nemm00bhJUTFxQEF-1";

type Role = "customer" | "specialist";

const ROLES: { id: Role; icon: React.ElementType; title: string; description: string }[] = [
  {
    id: "customer",
    icon: Building2,
    title: "Customer",
    description: "I'm building AI and need expert knowledge.",
  },
  {
    id: "specialist",
    icon: WandSparkles,
    title: "Specialist",
    description: "I have expertise and want to contribute to AI.",
  },
];

export default function RolePickerPage() {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (role === "customer") {
      router.push("/contact");
    } else if (role === "specialist") {
      router.push("/signup");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="globe-bg" aria-hidden="true" />

      <div className="relative w-full max-w-md space-y-5">
        <div className="card-glass rounded-[24px] p-8 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.4)] animate-fade-in">
          {/* Logo */}
          <div className="mb-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/centaur-logo.svg" alt="Centaur" className="h-8 w-auto" />
          </div>

          {/* Headline */}
          <div className="mb-6 space-y-1">
            <h1 className="text-[24px] font-bold leading-tight text-[#0a0a0a]">
              Which best describes you?
            </h1>
            <p className="text-sm text-[#374151]">Choose a role to get started.</p>
          </div>

          {/* Role cards */}
          <div className="space-y-3 mb-6">
            {ROLES.map(({ id, icon: Icon, title, description }) => {
              const selected = role === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-[17px] py-[17px] rounded-[8px] border text-left transition-all cursor-pointer",
                    selected
                      ? "border-[#4f46e5] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      : "border-slate-200 bg-white hover:border-[#615fff]/50 hover:bg-slate-50"
                  )}
                >
                  {/* Icon */}
                  <div className="h-10 w-10 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-[#f1f5f9]">
                    <Icon className="h-5 w-5 text-[#62748e]" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0a0a0a]">{title}</p>
                    <p className="text-xs text-[#374151] mt-0.5 leading-relaxed">{description}</p>
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center",
                      selected ? "border-[#818cf8]" : "border-[#cad5e2]"
                    )}
                  >
                    {selected && <div className="h-2 w-2 rounded-full bg-[#818cf8]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continue button */}
          <button
            type="button"
            disabled={!role}
            onClick={handleContinue}
            className={cn(
              "w-full py-2.5 rounded-[8px] text-sm font-medium transition-colors",
              role
                ? "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
                : "bg-[#4f46e5] opacity-50 text-white cursor-not-allowed"
            )}
          >
            Continue
          </button>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-[#525252]">
            Already have an account?{" "}
            <a href="/login" className="text-[#4f46e5] font-semibold hover:underline">
              Sign in →
            </a>
          </p>
        </div>

      </div>

      {FIGMA_URL && <FigmaLinkBadge href={FIGMA_URL} />}
    </main>
  );
}
