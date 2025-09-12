import React, { useState, useEffect } from "react";
import {
  createFarmer,
  updateFarmer,
  getFarmerById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/farmerService";

const initialState = {
  first_name: "",
  last_name: "",
  location: "",
  support_needed: "",
  phone_number: "",
  farm_size: "",
  main_crops: "",
  accommodation_available: false, // boolean
  farming_experience: "",
};

const FarmerForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getFarmerById(editingId).then((res) => {
        if (res.ok) {
          setForm(res.data.data);
        }
      });
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editingId
      ? await updateFarmer(editingId, form)
      : await createFarmer(form);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error || "Failed to save farmer");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Farmer" : "Add New Farmer"}
      </h2>

      {Object.keys(initialState).map((field) =>
        field === "accommodation_available" ? (
          <label key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Accommodation Available
          </label>
        ) : (
          <input
            key={field}
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.replace(/_/g, " ")}
            className="w-full border p-2 rounded"
            required={field === "first_name" || field === "last_name"}
          />
        )
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editingId ? "Update" : "Submit"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm(initialState);
              setEditingId(null);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default FarmerForm;
