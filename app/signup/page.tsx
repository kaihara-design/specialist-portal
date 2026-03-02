"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupFormData, SignupStep } from "@/lib/types";
import { useUtmParams } from "@/lib/utm";
import { AccountStep } from "@/components/signup/account-step";
import { ProfileStep } from "@/components/signup/profile-step";
import { DetailsStep } from "@/components/signup/details-step";
import { WelcomeStep } from "@/components/signup/welcome-step";
import { FigmaLinkBadge } from "@/components/signup/figma-link-badge";

const FIGMA_URL = process.env.NEXT_PUBLIC_FIGMA_URL ?? "";

const EMPTY_FORM: SignupFormData = {
  fullName: "",
  email: "",
  password: undefined,
  authMethod: "email",
  country: "",
  clinicalRole: "",
  trainingSpecialties: [],
  yearsOfExperience: "",
  portalExperience: undefined,
  resumeFile: undefined,
  referralSource: undefined,
  utmParams: {},
};

export default function SignupPage() {
  const utmParams = useUtmParams();
  const router = useRouter();
  const [step, setStep] = useState<SignupStep>("account");
  const [formData, setFormData] = useState<SignupFormData>({ ...EMPTY_FORM, utmParams });

  function merge(partial: Partial<SignupFormData>) {
    setFormData((prev) => ({ ...prev, ...partial }));
  }

  function handleNext(partial: Partial<SignupFormData>) {
    merge(partial);
    if (step === "account") setStep("profile");
    else if (step === "profile") setStep("details");
    else if (step === "details") {
      // Mock submit — log payload
      const payload = { ...formData, ...partial, utmParams };
      console.log("[Centaur Signup] Submitted:", payload);
      setStep("welcome");
    }
  }

  function handleBack() {
    if (step === "account") router.push("/");
    else if (step === "profile") setStep("account");
    else if (step === "details") setStep("profile");
  }

  function handleGoogleAuth() {
    // UI stub — in production this would trigger Google OAuth
    merge({ authMethod: "google", fullName: "Google User", email: "user@gmail.com" });
    setStep("profile");
  }

  return (
    <main className="relative overflow-hidden min-h-screen bg-[#f0f4f8] flex items-center justify-center px-8 py-12">
      <div className="globe-bg" aria-hidden="true" />

      {step === "welcome" ? (
        <WelcomeStep email={formData.email} fullName={formData.fullName} />
      ) : (
        <div className="relative z-10 w-full max-w-md space-y-5">
          <div className="card-glass rounded-[24px] p-8 shadow-[0px_25px_50px_0px_rgba(0,0,0,0.4)]">
            {step === "account" && (
              <AccountStep
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
                onGoogleAuth={handleGoogleAuth}
              />
            )}
            {step === "profile" && (
              <ProfileStep
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {step === "details" && (
              <DetailsStep
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
          </div>

          <div className="flex justify-center gap-6">
            <a href="#" className="text-xs text-[#62748e] hover:text-slate-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[#62748e] hover:text-slate-700 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      )}

      {FIGMA_URL && <FigmaLinkBadge href={FIGMA_URL} />}
    </main>
  );
}
