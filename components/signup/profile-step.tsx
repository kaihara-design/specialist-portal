"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { SignupFormData } from "@/lib/types";
import { CLINICAL_ROLES, COUNTRIES, TRAINING_SPECIALTIES, YEARS_OF_EXPERIENCE } from "@/lib/constants";
import { SingleSelectDropdown } from "./single-select-dropdown";
import { MultiSelectDropdown } from "./multi-select-dropdown";
import { cn } from "@/lib/utils";

interface ProfileStepProps {
  data: SignupFormData;
  onNext: (data: Partial<SignupFormData>) => void;
  onBack: () => void;
}

type Errors = Partial<Record<"country" | "clinicalRole" | "trainingSpecialties" | "yearsOfExperience", string>>;

const inputClass =
  "w-full px-3.5 py-2.5 rounded-[14px] border border-slate-200 bg-white text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#4f46e5] transition-colors";

export function ProfileStep({ data, onNext, onBack }: ProfileStepProps) {
  const [country, setCountry] = useState(data.country);
  const [countryOther, setCountryOther] = useState(data.countryOther ?? "");
  const [clinicalRole, setClinicalRole] = useState(data.clinicalRole);
  const [clinicalRoleOther, setClinicalRoleOther] = useState(data.clinicalRoleOther ?? "");
  const [trainingSpecialties, setTrainingSpecialties] = useState(data.trainingSpecialties);
  const [trainingSpecialtyOther, setTrainingSpecialtyOther] = useState(data.trainingSpecialtyOther ?? "");
  const [yearsOfExperience, setYearsOfExperience] = useState(data.yearsOfExperience);
  const [errors, setErrors] = useState<Errors>({});

  function validate(): boolean {
    const e: Errors = {};
    if (!country) e.country = "Please select your country";
    if (!clinicalRole) e.clinicalRole = "Please select your clinical role";
    if (trainingSpecialties.length === 0) e.trainingSpecialties = "Please select at least one specialty";
    if (!yearsOfExperience) e.yearsOfExperience = "Please select your experience level";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onNext({
      country,
      countryOther: country === "Other" ? countryOther || undefined : undefined,
      clinicalRole,
      clinicalRoleOther: clinicalRole === "Other" ? clinicalRoleOther || undefined : undefined,
      trainingSpecialties,
      trainingSpecialtyOther: trainingSpecialties.includes("Other") ? trainingSpecialtyOther || undefined : undefined,
      yearsOfExperience,
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
        <span className="text-xs font-semibold tracking-widest text-[#737373] uppercase">
          Step 2 of 3
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#0a0a0a]">Tell us about yourself</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Country */}
        <SingleSelectDropdown
          label="Country"
          required
          options={COUNTRIES.map((c) => ({ value: c, label: c }))}
          value={country}
          onChange={(v) => { setCountry(v); if (v !== "Other") setCountryOther(""); }}
          placeholder="Select your country"
          searchable
          error={errors.country}
          otherValue={countryOther}
          onOtherChange={setCountryOther}
        />

        {/* Clinical role */}
        <SingleSelectDropdown
          label="Clinical role"
          required
          options={CLINICAL_ROLES.map((r) => ({ value: r, label: r }))}
          value={clinicalRole}
          onChange={(v) => { setClinicalRole(v); if (v !== "Other") setClinicalRoleOther(""); }}
          placeholder="Select your role"
          error={errors.clinicalRole}
          otherValue={clinicalRoleOther}
          onOtherChange={setClinicalRoleOther}
        />

        {/* Training specialty */}
        <div>
          <MultiSelectDropdown
            label="Training specialty"
            required
            options={TRAINING_SPECIALTIES}
            selected={trainingSpecialties}
            onChange={(v) => {
              setTrainingSpecialties(v);
              if (!v.includes("Other")) setTrainingSpecialtyOther("");
            }}
            placeholder="Select your specialties"
            searchable
            error={errors.trainingSpecialties}
          />
          {trainingSpecialties.includes("Other") && (
            <input
              type="text"
              value={trainingSpecialtyOther}
              onChange={(e) => setTrainingSpecialtyOther(e.target.value)}
              placeholder="Please describe your specialty"
              className={cn(inputClass, "mt-2")}
            />
          )}
        </div>

        {/* Years of experience */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#0a0a0a]">
            Years of experience<span className="ml-0.5 text-[#ff6467]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {YEARS_OF_EXPERIENCE.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setYearsOfExperience(value)}
                className={cn(
                  "cursor-pointer px-4 py-3 rounded-[14px] border text-sm font-medium transition-colors text-left",
                  yearsOfExperience === value
                    ? "border-[#4f46e5] bg-[#4f46e5]/8 text-[#4f46e5]"
                    : "border-slate-200 bg-white text-[#1e293b] hover:border-[#4f46e5]/50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.yearsOfExperience && (
            <p className="text-xs text-red-500">{errors.yearsOfExperience}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-semibold hover:bg-[#4338ca] btn-shadow transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
