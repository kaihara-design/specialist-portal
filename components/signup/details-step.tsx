"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SignupFormData } from "@/lib/types";
import { PORTAL_EXPERIENCE_OPTIONS, REFERRAL_SOURCES } from "@/lib/constants";
import { FileDropzone } from "./file-dropzone";
import { SingleSelectDropdown } from "./single-select-dropdown";

interface DetailsStepProps {
  data: SignupFormData;
  onNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
}

export function DetailsStep({ data, onNext, onBack }: DetailsStepProps) {
  const [resumeFile, setResumeFile] = useState<File | undefined>(data.resumeFile);
  const [portalExperience, setPortalExperience] = useState(data.portalExperience ?? "");
  const [referralSource, setReferralSource] = useState(data.referralSource ?? "");
  const [referralSourceOther, setReferralSourceOther] = useState(data.referralSourceOther ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext({
      resumeFile,
      portalExperience: portalExperience || undefined,
      referralSource: referralSource || undefined,
      referralSourceOther: referralSource === "other" ? referralSourceOther || undefined : undefined,
    });
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
          Step 3 of 3
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#0f172b]">Almost there!</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Resume upload */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#0a0a0a]">
            Resume / CV
          </label>
          <FileDropzone value={resumeFile} onChange={setResumeFile} />
        </div>

        {/* Portal experience */}
        <SingleSelectDropdown
          label="Have you used Centaur before?"
          options={PORTAL_EXPERIENCE_OPTIONS}
          value={portalExperience}
          onChange={setPortalExperience}
          placeholder="Select an option"
          optionalLabel
        />

        {/* Referral source */}
        <SingleSelectDropdown
          label="Where did you hear about us?"
          options={REFERRAL_SOURCES}
          value={referralSource}
          onChange={(v) => { setReferralSource(v); if (v !== "other") setReferralSourceOther(""); }}
          placeholder="Select an option"
          optionalLabel
          otherValue={referralSourceOther}
          onOtherChange={setReferralSourceOther}
        />

        <button
          type="submit"
          className="w-full py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] btn-shadow transition-colors"
        >
          Join the Network
        </button>
      </form>
    </div>
  );
}
