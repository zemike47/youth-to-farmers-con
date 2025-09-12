// src/types/organization.ts
export interface ParentOrganizationForm {
  organization_name: string;
  organization_type: string;
  contact_person: string;
  contact_email: string;
  contact_phone?: string; // optional
  partnership_interest: string;
  organization_description: string;
  partnership_goals: string;
  available_resources: string;
}
