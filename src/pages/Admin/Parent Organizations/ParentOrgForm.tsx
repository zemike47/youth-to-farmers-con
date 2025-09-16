import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  createParentOrganization,
  updateParentOrganization,
  getParentOrganizationById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/orgService";

// Define the shape of the form state
export interface ParentOrgFormData {
  organization_name: string;
  organization_type: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  partnership_interest: string;
  organization_description: string;
  partnership_goals: string;
  available_resources: string;
}

const initialState: ParentOrgFormData = {
  organization_name: "",
  organization_type: "",
  contact_person: "",
  contact_email: "",
  contact_phone: "",
  partnership_interest: "",
  organization_description: "",
  partnership_goals: "",
  available_resources: "",
};

const ORG_TYPES = [
  "NGO",
  "Government",
  "Private Company",
  "International Organization",
  "Foundation",
] as const;

interface ParentOrgFormProps {
  refreshList: () => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
}

const ParentOrgForm = ({
  refreshList,
  editingId,
  setEditingId,
}: ParentOrgFormProps) => {
  const [form, setForm] = useState<ParentOrgFormData>(initialState);

  useEffect(() => {
    if (editingId) {
      getParentOrganizationById(editingId).then((res) => {
        if (res.ok) {
          setForm(res.data.data as ParentOrgFormData);
        }
      });
    }
  }, [editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = editingId
      ? await updateParentOrganization(editingId, form)
      : await createParentOrganization(form);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error || "Failed to save parent organization");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Parent Organization" : "Add New Parent Organization"}
      </h2>

      {(Object.keys(initialState) as (keyof ParentOrgFormData)[]).map((field) =>
        field === "organization_type" ? (
          <select
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Organization Type</option>
            {ORG_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace(/_/g, " ")}
            className="w-full border p-2 rounded"
            required={[
              "organization_name",
              "organization_type",
              "contact_person",
              "contact_email",
            ].includes(field)}
          />
        )
      )}

      {editingId && (
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setEditingId(null);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default ParentOrgForm;
