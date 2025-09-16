import React, { useState, useEffect } from "react";
import {
  createYouth,
  updateYouth,
  getYouthById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/youthService";

export interface Youth {
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  phone_number: string;
  education_level: string;
  agriculture_experience: string;
  motivation: string;
  cv_file: File | null;
}

// Props for YouthForm
interface YouthFormProps {
  refreshList: () => Promise<void>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
}

const initialState: Youth = {
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

const YouthForm: React.FC<YouthFormProps> = ({
  refreshList,
  editingId,
  setEditingId,
}) => {
  const [form, setForm] = useState<Youth>(initialState);

  useEffect(() => {
    if (editingId) {
      getYouthById(editingId).then((res) => {
        if (res.ok) {
          // don’t prefill file input
          setForm({ ...res.data.data, cv_file: null });
        }
      });
    }
  }, [editingId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as Blob | string);
      }
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
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
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
          type={field === "email" ? "email" : "text"}
          name={field}
          value={form[field as keyof Youth] as string}
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
        value={form.education_level}
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
