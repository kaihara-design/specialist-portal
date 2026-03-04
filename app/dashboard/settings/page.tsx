"use client";

import { useState } from "react";
import { PanelLeft } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SingleSelectDropdown } from "@/components/signup/single-select-dropdown";
import { MultiSelectDropdown } from "@/components/signup/multi-select-dropdown";
import {
  COUNTRIES,
  CLINICAL_ROLES,
  YEARS_OF_EXPERIENCE,
  TRAINING_SPECIALTIES,
} from "@/lib/constants";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-[8px] border border-slate-200 bg-white text-sm text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#4f46e5] transition-colors";

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-[#0f172b]">{title}</h2>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[#0a0a0a]">{label}</label>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [name, setName] = useState("Kai Hara");
  const [country, setCountry] = useState("United States");
  const [clinicalRole, setClinicalRole] = useState("Physician");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [trainingSpecialties, setTrainingSpecialties] = useState<string[]>([]);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <DashboardSidebar active="settings" />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-12 bg-white border-b border-slate-100 flex items-center px-4 gap-3 flex-shrink-0">
          <button className="p-1.5 rounded-md hover:bg-slate-100 transition-colors">
            <PanelLeft className="h-5 w-5 text-[#62748e]" />
          </button>
          <span className="text-sm font-medium text-[#0f172b]">My Profile</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-[28px] font-bold text-[#0f172b]">My Profile</h1>

            {/* Account */}
            <SectionCard title="Account">
              <Field label="Name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value="khara0062@gmail.com"
                  readOnly
                  className={inputClass + " cursor-default bg-slate-50 text-[#94a3b8]"}
                />
              </Field>
            </SectionCard>

            {/* Profile */}
            <SectionCard title="Background">
              <Field label="Country">
                <SingleSelectDropdown
                  options={COUNTRIES.map((c) => ({ value: c, label: c }))}
                  value={country}
                  onChange={setCountry}
                  placeholder="Select country"
                />
              </Field>
              <Field label="Clinical Role">
                <SingleSelectDropdown
                  options={CLINICAL_ROLES.map((r) => ({ value: r, label: r }))}
                  value={clinicalRole}
                  onChange={setClinicalRole}
                  placeholder="Select role"
                />
              </Field>
              <MultiSelectDropdown
                label="Training Specialties"
                options={TRAINING_SPECIALTIES}
                selected={trainingSpecialties}
                onChange={setTrainingSpecialties}
                placeholder="Select specialties"
                searchable
              />
              <Field label="Years of Experience">
                <SingleSelectDropdown
                  options={YEARS_OF_EXPERIENCE}
                  value={yearsOfExperience}
                  onChange={setYearsOfExperience}
                  placeholder="Select years"
                />
              </Field>
            </SectionCard>

            {/* Save */}
            <div className="flex justify-end">
              <button className="px-5 py-2.5 rounded-[8px] bg-[#4f46e5] text-white text-sm font-medium hover:bg-[#4338ca] transition-colors">
                Save changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
