import React, { useState, useEffect } from "react";
import {
  createProgram,
  updateProgram,
  getProgramById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/programService";

const initialState = {
  program_name: "",
  description: "",
  details: "",
  benefits: "",
  duration_value: "",
  duration_unit: "days", // default
  program_pic: null,
};

const ProgramsForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getProgramById(editingId).then((res) => {
        if (res.ok) {
          setForm({ ...res.data.data, program_pic: null }); // can't prefill file
        }
      });
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    const res = editingId
      ? await updateProgram(editingId, formData, true)
      : await createProgram(formData);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Program" : "Add New Program"}
      </h2>

      {[
        "program_name",
        "description",
        "details",
        "benefits",
        "duration_value",
      ].map((field) => (
        <input
          key={field}
          type={field === "duration_value" ? "number" : "text"}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.replace(/_/g, " ")}
          className="w-full border p-2 rounded"
          required
        />
      ))}

      {/* Duration unit */}
      <select
        name="duration_unit"
        value={form.duration_unit}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
      </select>

      {/* Program image upload */}
      <input
        type="file"
        name="program_pic"
        accept="image/*"
        onChange={handleChange}
        className="w-full text-amber-700"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default ProgramsForm;
