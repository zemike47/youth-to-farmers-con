import React from "react";
import { deleteSubscription } from "../../../services/contactEmailService";

// Define subscription type
interface Subscription {
  id: number | string; // primary identifier
  email: string;
}

// Define props type
interface EmailListProps {
  subscriptions: Subscription[];
  refreshList: () => void;
  setEditingId: (id: number | string | null) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  subscriptions,
  refreshList,
  //setEditingId,
}) => {
  const handleDelete = async (id: number | string) => {
    console.log("Deleting subscription:", id);
    if (window.confirm("Are you sure you want to unsubscribe this email?")) {
      const res = await deleteSubscription(id);
      if (res.ok) {
        refreshList();
      } else {
        alert("Failed to delete subscription");
      }
    }
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Subscribers</h2>
      <table className="min-w-full text-sm text-black bg-white border border-gray-300 rounded-2xl shadow-lg">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => (
            <tr key={sub.id} className="text-center hover:bg-gray-50">
              <td className="border p-2">{sub.email}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {subscriptions.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center p-4">
                No subscriptions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmailList;
