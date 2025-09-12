import React, { useState, useEffect } from "react";
import {
  createNews,
  updateNews,
  getNewsById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/NewsServices";

const initialState = {
  title: "",
  article: "",
  minutes_to_read: "",
  status: "Draft", // default matches DB
  media_file: null,
};

const STATUS_OPTIONS = ["Published", "Draft", "Archived"];

const NewsForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getNewsById(editingId).then((res) => {
        if (res.ok) {
          setForm({ ...res.data.data, media: null });
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
      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    const res = editingId
      ? await updateNews(editingId, formData, true)
      : await createNews(formData);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error || "Failed to save news");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit News" : "Add New News"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />

      {/* Article */}
      <textarea
        name="article"
        value={form.article}
        onChange={handleChange}
        placeholder="Article"
        className="w-full border p-2 rounded h-32"
        required
      />

      {/* Minutes to read */}
      <input
        type="number"
        name="minutes_to_read"
        value={form.minutes_to_read}
        onChange={handleChange}
        placeholder="Minutes to read"
        className="w-full border p-2 rounded"
      />

      {/* Status dropdown */}
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Media upload */}
      <input
        type="file"
        name="media_file"
        onChange={handleChange}
        className="w-full text-amber-700"
      />

      {/* Buttons */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default NewsForm;
