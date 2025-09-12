// client/src/services/parentOrganizationService.ts

const API_URL = "http://localhost:7000/api/parent_organizations";

// Create new parent organization
export const createParentOrganization = async (data: {
  organization_name: string;
  organization_type: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  partnership_interest: string;
  organization_description?: string;
  partnership_goals?: string;
  available_resources?: string;
}) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("ParentOrg API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all parent organizations
export const getAllParentOrganizations = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("ParentOrg API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get parent organization by ID
export const getParentOrganizationById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("ParentOrg API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update parent organization
export const updateParentOrganization = async (
  id: string | number,
  data: {
    organization_name: string;
    organization_type: string;
    contact_person: string;
    contact_email: string;
    contact_phone: string;
    partnership_interest: string;
    organization_description?: string;
    partnership_goals?: string;
    available_resources?: string;
  }
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("ParentOrg API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete parent organization
export const deleteParentOrganization = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("ParentOrg API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
