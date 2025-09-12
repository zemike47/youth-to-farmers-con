import React, { useState, useEffect } from "react";
import {
  createUser,
  updateUser,
  getUserById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/systemUserService";

const initialState = {
  username: "",
  email: "",
  role: "",
  status: "",
  last_login: "",
  articles_published_count: 0,
};

const SystemUserForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getUserById(editingId).then((res) => {
        if (res.ok) setForm(res.data.data);
      });
    }
  }, [editingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = editingId
      ? await updateUser(editingId, form)
      : await createUser(form);

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
        {editingId ? "Edit User" : "Add New User"}
      </h2>

      {[
        "username",
        "email",
        "role",
        "status",
        "last_login",
        "articles_published_count",
      ].map((field) => (
        <input
          key={field}
          type={field === "articles_published_count" ? "number" : "text"}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.replace(/_/g, " ")}
          className="w-full border p-2 rounded"
          required={field !== "last_login"}
        />
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {editingId ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default SystemUserForm;
