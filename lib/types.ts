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
  yearsOfExperience: number | undefined;
  // Step 3
  resumeFile?: File;
  referralSource?: string;
  referralSourceOther?: string;
  // Meta
  utmParams: Record<string, string>;
}
