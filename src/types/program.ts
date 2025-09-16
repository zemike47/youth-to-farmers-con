// src/types/program.ts
export interface Program {
  program_id: number;
  program_name: string;
  program_pic?: string;
  description: string;
  details?: string;
  benefits?: string;
  duration_value: number;
  duration_unit: string;
  created_at?: string;
  updated_at?: string;
}
