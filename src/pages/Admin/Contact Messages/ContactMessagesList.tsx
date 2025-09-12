import React from "react";
import { deleteMessage } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/contactMessageService";

const ContactMessageList = ({ messageList, refreshList, setEditingId }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const res = await deleteMessage(id);
      if (res.ok) refreshList();
      else alert("Failed to delete message");
    }
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Messages</h2>
      <table className="min-w-full text-sm text-black bg-white border border-gray-300 rounded-2xl shadow-lg">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messageList.map((msg) => (
            <tr key={msg.message_id} className="text-center hover:bg-gray-50">
              <td className="border p-2">
                {msg.first_name} {msg.last_name}
              </td>
              <td className="border p-2">{msg.email}</td>
              <td className="border p-2">{msg.phone_number || "-"}</td>
              <td className="border p-2">{msg.subject}</td>
              <td className="border p-2">{msg.message}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(msg.message_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(msg.message_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {messageList.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No messages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactMessageList;
