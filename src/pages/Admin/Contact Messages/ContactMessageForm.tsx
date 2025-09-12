import React, { useState, useEffect } from "react";
import {
  createMessage,
  getMessageById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/contactMessageService";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  subject: "",
  message: "",
};

const ContactMessageForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getMessageById(editingId).then((res) => {
        if (res.ok) {
          setForm(res.data.data);
        }
      });
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only create — no update endpoint exists in service
    const res = await createMessage(form);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error || "Failed to save message");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Message" : "Add New Message"}
      </h2>

      {Object.keys(initialState).map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field.replace(/_/g, " ")}
          className="w-full border p-2 rounded"
          required={[
            "first_name",
            "last_name",
            "email",
            "subject",
            "message",
          ].includes(field)}
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

export default ContactMessageForm;
