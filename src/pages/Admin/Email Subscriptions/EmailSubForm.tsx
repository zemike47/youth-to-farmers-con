import React, { useState, useEffect } from "react";
import {
  createSubscription,
  getSubscriptionById,
} from "../../../services/contactEmailService";

interface EmailFormProps {
  refreshList: () => void;
  editingId: number | string | null;
  setEditingId: (id: number | string | null) => void;
}

interface FormState {
  email: string;
}

const initialState: FormState = { email: "" };

const EmailForm: React.FC<EmailFormProps> = ({
  refreshList,
  editingId,
  setEditingId,
}) => {
  const [form, setForm] = useState<FormState>(initialState);

  // Fetch subscription details when editing (read-only, since no update)
  useEffect(() => {
    if (editingId) {
      getSubscriptionById(editingId).then((res) => {
        if (res.ok && res.data?.data) {
          setForm({ email: res.data.data.email });
        }
      });
    }
  }, [editingId]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm({ email: value });
  };

  // Handle form submit (only create, no update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await createSubscription(form.email);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data?.error || "Failed to save subscription");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">Add New Subscription</h2>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email address"
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

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
      </div>
    </form>
  );
};

export default EmailForm;
