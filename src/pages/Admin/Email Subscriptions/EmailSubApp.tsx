import React, { useState, useEffect } from "react";

import EmailForm from "./EmailSubForm";
import EmailList from "./EmailSubList";
import { getAllSubscriptions } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/contactEmailService";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";
const EmailApp = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError("");
    const res = await getAllSubscriptions();
    if (res.ok) {
      setSubscriptions(res.data.data);
    } else {
      setError("Failed to load subscriptions");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div
      className="mx-auto p-6 bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">
        Email Subscriptions
      </h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>

      <div className="gap-y-3.5">
        <EmailForm
          refreshList={fetchSubscriptions}
          editingId={editingId}
          setEditingId={setEditingId}
        />

        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <EmailList
          subscriptions={subscriptions}
          refreshList={fetchSubscriptions}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default EmailApp;
