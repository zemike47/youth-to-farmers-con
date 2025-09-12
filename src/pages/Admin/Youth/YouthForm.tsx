import React, { useState, useEffect } from "react";
import {
  createYouth,
  updateYouth,
  getYouthById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/youthService";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  age: "",
  phone_number: "",
  education_level: "",
  agriculture_experience: "",
  motivation: "",
  cv_file: null,
};

const YouthForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getYouthById(editingId).then((res) => {
        if (res.ok) {
          setForm({ ...res.data.data, cv_file: null }); // can't prefill file
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
      ? await updateYouth(editingId, formData, true)
      : await createYouth(formData);

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
      //className="space-y-4 p-4 bg-emerald-900 rounded shadow mt-8"
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl  shadow-lg  mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Youth" : "Add New Youth"}
      </h2>
      {[
        "first_name",
        "last_name",
        "email",
        "age",
        "phone_number",
        "agriculture_experience",
        "motivation",
      ].map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"} // optional: make email input proper type
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.replace(/_/g, " ")}
          className="w-full border p-2 rounded"
          required
        />
      ))}

      {/* Education level dropdown */}
      <select
        className="w-full border p-2 rounded"
        id="education_level"
        name="education_level"
        value={form.education_level} // keep it consistent with your form state
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select your education level
        </option>
        <option value="High school">High School</option>
        <option value="Diploma">Diploma</option>
        <option value="Bachelor">Bachelor Degree</option>
        <option value="Masters">Masters Degree</option>
      </select>

      {/* File upload */}
      <input
        type="file"
        name="cv_file"
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

export default YouthForm;
