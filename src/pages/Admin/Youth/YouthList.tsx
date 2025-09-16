import React from "react";
import { deleteYouth } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/youthService";

type Youth = {
  youth_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  age: number;
  education_level: string;
  agriculture_experience: string;
  motivation: string;
  cv_file_path?: string;
};

type YouthListProps = {
  youthList: Youth[];
  refreshList: () => Promise<void>;
  setEditingId: (id: number) => void;
};

const YouthList: React.FC<YouthListProps> = ({
  youthList,
  refreshList,
  setEditingId,
}) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      const res = await deleteYouth(id);
      if (res.ok) refreshList();
      else alert("Failed to delete youth");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Youth List</h2>
      <table className="space-y-6 p-6 text-sm w-full text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Education level</th>
            <th className="border p-2">Agriculture Experience</th>
            <th className="border p-2">Motivation</th>
            <th className="border p-2">CV</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {youthList.map((youth) => (
            <tr key={youth.youth_id} className="text-center">
              <td className="border p-2">
                {youth.first_name} {youth.last_name}
              </td>
              <td className="border p-2">{youth.email}</td>
              <td className="border p-2">{youth.phone_number}</td>
              <td className="border p-2">{youth.age}</td>
              <td className="border p-2">{youth.education_level}</td>
              <td className="border p-2">{youth.agriculture_experience}</td>
              <td className="border p-2">{youth.motivation}</td>
              <td className="border p-2">
                {youth.cv_file_path ? (
                  <a
                    href={`http://localhost:7000${youth.cv_file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View CV
                  </a>
                ) : (
                  "No CV"
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(youth.youth_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(youth.youth_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {youthList.length === 0 && (
            <tr>
              <td colSpan={9} className="p-4 text-gray-500 text-center">
                No youth records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default YouthList;
