import React, { useState, useEffect } from "react";
import {
  createYouth,
  updateYouth,
  getYouthById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/youthService";
import { useNavigate } from "react-router-dom";
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
  const nav = useNavigate();
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
          {editingId ? "Edit Youth" : "Join New Youth"}
        </h2>

        {/* Text fields */}
        {[
          "first_name",
          "last_name",
          "email",
          "age",
          "phone_number",
          "agriculture_experience",
          "motivation",
        ].map((field) => (
          <div key={field} className="flex flex-col gap-1">
            <label
              htmlFor={field}
              className="text-sm font-medium text-gray-700 capitalize"
            >
              {field.replace(/_/g, " ")}
            </label>
            <input
              id={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.replace(/_/g, " ")}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {/* Education level dropdown */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="education_level"
            className="text-sm font-medium text-gray-700"
          >
            Education Level
          </label>
          <select
            id="education_level"
            name="education_level"
            value={form.education_level}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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
        </div>

        {/* File upload */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="cv_file"
            className="text-sm font-medium text-gray-700"
          >
            Upload CV
          </label>
          <input
            id="cv_file"
            type="file"
            name="cv_file"
            onChange={handleChange}
            className="w-full text-amber-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
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

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default YouthForm;
