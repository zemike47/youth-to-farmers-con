import type { ParentOrganizationForm } from "../types/organization";

export const createParentOrganization = async (
  formData: ParentOrganizationForm
) => {
  try {
    const res = await fetch("http://localhost:7000/api/org", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Parent Organization API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
