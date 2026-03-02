export type SignupStep = "landing" | "account" | "profile" | "details" | "welcome";

export interface SignupFormData {
  // Step 1
  fullName: string;
  email: string;
  password?: string;
  authMethod: "email" | "google";
  // Step 2
  country: string;
  countryOther?: string;
  clinicalRole: string;
  clinicalRoleOther?: string;
  trainingSpecialties: string[];
  trainingSpecialtyOther?: string;
  yearsOfExperience: string; // "less-than-2" | "3-5" | "6-10" | "10+"
  // Step 3
  portalExperience?: string;
  resumeFile?: File;
  referralSource?: string;
  referralSourceOther?: string;
  // Meta
  utmParams: Record<string, string>;
}
