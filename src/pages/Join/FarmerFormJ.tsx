import React, { useState, useEffect } from "react";
import {
  createFarmer,
  updateFarmer,
  getFarmerById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/farmerService";

import { useNavigate } from "react-router-dom";
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
  const nav = useNavigate();
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
    <div>
      <button
        onClick={() => nav("/join")}
        className="pl-2.5 px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Farmer" : "Join New Farmer"}
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
            <div key={field} className="flex flex-col gap-1">
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-700 capitalize"
              >
                {field.replace(/_/g, " ")}
              </label>
              <input
                id={field}
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field.replace(/_/g, " ")}
                className="w-full border p-2 rounded"
                required={field === "first_name" || field === "last_name"}
              />
            </div>
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
    </div>
  );
};

export default FarmerForm;
