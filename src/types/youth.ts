// types/youth.ts
export interface YouthForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  age: number;
  education_level: string;
  agriculture_experience: string;
  motivation: string;
  cv: File | null; // uploaded CV
}
