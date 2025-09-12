import React, { useState, useEffect } from "react";
import {
  createVideo,
  updateVideo,
  getVideoById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/videoService";

const initialState = {
  title: "",
  description: "",
  video_file: null,
  thumbnail_url: null,
  category_id: "",
};

const VideosForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getVideoById(editingId).then((res) => {
        if (res.ok) {
          setForm(res.data.data);
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
      if (value !== null) {
        // convert empty string to null for category_id
        if (key === "category_id" && value === "") {
          formData.append(key, null);
        } else {
          formData.append(key, value);
        }
      }
    });

    const res = editingId
      ? await updateVideo(editingId, formData, true)
      : await createVideo(formData);

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
        {editingId ? "Edit Video" : "Add New Video"}
      </h2>

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Video Title"
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
        rows={3}
        required
      />

      {/* Video Upload */}
      <label className="block mb-4">
        <span className="text-gray-700 font-medium">Upload Video</span>
        <input
          type="file"
          name="video_file"
          accept="video/*"
          onChange={handleChange}
          className="w-full mt-2 text-amber-700"
        />
      </label>

      {/* Thumbnail Upload */}
      <label className="block mb-4">
        <span className="text-gray-700 font-medium">
          Upload Thumbnail Image
        </span>
        <input
          type="file"
          name="thumbnail_url"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-2 text-amber-700"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default VideosForm;
