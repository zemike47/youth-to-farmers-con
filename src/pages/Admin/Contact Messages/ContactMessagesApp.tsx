import { useState, useEffect } from "react";

import ContactMessageForm from "./ContactMessageForm";
import ContactMessageList from "./ContactMessagesList";
import { getAllMessages } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/contactMessageService";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";
const ContactMessageApp = () => {
  const [messageList, setMessageList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    const res = await getAllMessages();
    if (res.ok) {
      setMessageList(res.data.data);
    } else {
      setError("Failed to load messages");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
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
        Contact Message Management
      </h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>

      <div className="gap-y-3.5">
        <ContactMessageForm
          refreshList={fetchMessages}
          editingId={editingId}
          setEditingId={setEditingId}
        />

        {loading && <p className="text-white">Loading messages...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <ContactMessageList
          messageList={messageList}
          refreshList={fetchMessages}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default ContactMessageApp;
