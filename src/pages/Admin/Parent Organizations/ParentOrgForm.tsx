import React, { useState, useEffect } from "react";
import {
  createParentOrganization,
  updateParentOrganization,
  getParentOrganizationById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/orgService";

const initialState = {
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
];

const ParentOrgForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getParentOrganizationById(editingId).then((res) => {
        if (res.ok) setForm(res.data.data);
      });
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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

      {Object.keys(initialState).map((field) =>
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
