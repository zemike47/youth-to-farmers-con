import React, { useState, useEffect } from "react";
import {
  createSubscription,
  // updateSubscription, // optional if backend supports PUT
  getSubscriptionById,
} from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/contactEmailService";

const initialState = { email: "" };

const EmailForm = ({ refreshList, editingId, setEditingId }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingId) {
      getSubscriptionById(editingId).then((res) => {
        if (res.ok) setForm(res.data.data);
      });
    }
  }, [editingId]);

  const handleChange = (e) => {
    const { value } = e.target;
    setForm({ email: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = editingId
      ? await updateSubscription(editingId, form.email) // optional, only if backend supports update
      : await createSubscription(form.email);

    if (res.ok) {
      setForm(initialState);
      setEditingId(null);
      refreshList();
    } else {
      alert(res.data.error || "Failed to save subscription");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8"
    >
      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Subscription" : "Add New Subscription"}
      </h2>

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
          {editingId ? "Update" : "Submit"}
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
