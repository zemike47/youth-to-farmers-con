import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  createMessage,
  getMessageById,
} from "../../../services/contactMessageService";

interface ContactForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
}

interface ContactMessageFormProps {
  refreshList: () => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

const initialState: ContactForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  subject: "",
  message: "",
};

const ContactMessageForm: React.FC<ContactMessageFormProps> = ({
  refreshList,
  editingId,
  setEditingId,
}) => {
  const [form, setForm] = useState<ContactForm>(initialState);

  useEffect(() => {
    if (editingId) {
      getMessageById(editingId).then((res) => {
        if (res.ok) {
          setForm(res.data.data);
        }
      });
    }
  }, [editingId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      {Object.keys(initialState).map((field) => {
        const key = field as keyof ContactForm;
        const isTextArea = key === "message";

        return isTextArea ? (
          <textarea
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ")}
            className="w-full border p-2 rounded"
            required
          />
        ) : (
          <input
            key={key}
            type={key === "email" ? "email" : "text"}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ")}
            className="w-full border p-2 rounded"
            required={["first_name", "last_name", "email", "subject"].includes(
              key
            )}
          />
        );
      })}

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
