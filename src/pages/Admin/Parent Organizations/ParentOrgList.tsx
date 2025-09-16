import React from "react";
import type { ParentOrg } from "./ParentOrgApp"; // reuse same type

interface DeleteResponse<T = unknown> {
  ok: boolean;
  data?: T;
}

interface ParentOrgListProps {
  parentOrgList: ParentOrg[];
  refreshList: () => void;
  setEditingId: (id: number) => void;
  handleDelete: (id: number) => Promise<DeleteResponse>;
}

const ParentOrgList: React.FC<ParentOrgListProps> = ({
  parentOrgList,
  refreshList,
  setEditingId,
  handleDelete,
}) => {
  const confirmDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      const res = await handleDelete(id);
      if (res.ok) {
        refreshList();
      } else {
        alert("Failed to delete parent organization");
      }
    }
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Parent Organizations
      </h2>
      <table className="min-w-full border text-sm bg-white rounded-lg shadow">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parentOrgList.map((org) => (
            <tr key={org.parent_org_id} className="text-center text-black">
              <td className="border p-2">{org.name}</td>
              <td className="border p-2">{org.description}</td>
              <td className="border p-2">{org.contact_email ?? "-"}</td>
              <td className="border p-2">{org.contact_phone ?? "-"}</td>
              <td className="border p-2">{org.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(org.parent_org_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(org.parent_org_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {parentOrgList.length === 0 && (
            <tr>
              <td colSpan={6} className="p-4 text-gray-500">
                No parent organizations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParentOrgList;
