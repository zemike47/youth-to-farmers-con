import React, { useState, useEffect } from "react";
import {
  createVideo,
  updateVideo,
  getVideoById,
} from "../../../services/videoService";

// ---------- Types ----------
export interface VideoFormData {
  title: string;
  description: string;
  video_file: File | null;
  thumbnail_url: File | null;
  category_id: string;
}

interface VideosFormProps {
  refreshList: () => Promise<void>;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

// ---------- Initial State ----------
const initialState: VideoFormData = {
  title: "",
  description: "",
  video_file: null,
  thumbnail_url: null,
  category_id: "",
};

const VideosForm: React.FC<VideosFormProps> = ({
  refreshList,
  editingId,
  setEditingId,
}) => {
  const [form, setForm] = useState<VideoFormData>(initialState);

  useEffect(() => {
    if (editingId) {
      getVideoById(editingId).then((res) => {
        if (res.ok) {
          // we can’t prefill files, so keep them null
          setForm({
            ...res.data.data,
            video_file: null,
            thumbnail_url: null,
          });
        }
      });
    }
  }, [editingId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      if (value !== null && value !== "") {
        if (key === "category_id" && value === "") {
          // Skip empty category
          return;
        }
        formData.append(key, value);
      }
    });

    const res = editingId
      ? await updateVideo(editingId, formData)
      : await createVideo(formData);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      await refreshList();
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
