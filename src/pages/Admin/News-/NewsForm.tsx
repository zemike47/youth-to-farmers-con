import { useState, useEffect } from "react";
import {
  createNews,
  updateNews,
  getNewsById,
} from "../../../services/NewsServices";

// Form data interface
export interface NewsFormData {
  title: string;
  article: string;
  minutes_to_read: string;
  status: "Published" | "Draft" | "Archived";
  media_file: File | null;
}

// Props interface
interface NewsFormProps {
  refreshList: () => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
}

const initialState: NewsFormData = {
  title: "",
  article: "",
  minutes_to_read: "",
  status: "Draft",
  media_file: null,
};

const STATUS_OPTIONS: NewsFormData["status"][] = [
  "Published",
  "Draft",
  "Archived",
];

const NewsForm: React.FC<NewsFormProps> = ({
  refreshList,
  editingId,
  setEditingId,
}) => {
  const [form, setForm] = useState<NewsFormData>(initialState);

  useEffect(() => {
    if (editingId) {
      getNewsById(editingId).then((res) => {
        if (res.ok && res.data?.data) {
          const data = res.data.data;
          setForm({
            title: data.title || "",
            article: data.article || "",
            minutes_to_read: data.minutes_to_read?.toString() || "",
            status: data.status || "Draft",
            media_file: null, // always reset file input
          });
        }
      });
    }
  }, [editingId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement; // cast to HTMLInputElement for files
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
        formData.append(key, value as string | Blob);
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
      alert(res.data?.error || "Failed to save news");
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

      {/* Submit button */}
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
