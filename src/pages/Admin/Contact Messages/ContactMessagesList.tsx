import React from "react";
import type { Message } from "./ContactMessagesApp";

interface ContactMessageListProps {
  messageList: Message[];
  refreshList: () => void;
  setEditingId: (id: string | null) => void;
}

const ContactMessageList: React.FC<ContactMessageListProps> = ({
  messageList,
  setEditingId,
}) => {
  if (messageList.length === 0) {
    return <p className="text-white mt-6">No messages found.</p>;
  }

  return (
    <div className="mt-6 grid gap-4">
      {messageList.map((msg) => (
        <div
          key={msg.id}
          className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
        >
          <h3 className="font-semibold text-lg">
            {msg.first_name} {msg.last_name}
          </h3>
          <p className="text-gray-600">{msg.email}</p>
          <p className="text-gray-600">{msg.phone_number}</p>
          <p className="mt-2 font-semibold">{msg.subject}</p>
          <p className="mt-2 text-sm text-gray-700">{msg.message}</p>

          <button
            onClick={() => setEditingId(msg.id)}
            className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactMessageList;
