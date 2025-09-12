import React from "react";
import { deleteProgram } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/programService";

const ProgramsList = ({ programsList, refreshList, setEditingId }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this program?")) {
      const res = await deleteProgram(id);
      if (res.ok) refreshList();
      else alert("Failed to delete program");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Programs List</h2>
      <table className="w-full text-sm text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-4">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Program Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Details</th>
            <th className="border p-2">Benefits</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Program Pic</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {programsList.map((program) => (
            <tr key={program.program_id} className="text-center">
              <td className="border p-2">{program.program_name}</td>
              <td className="border p-2">{program.description}</td>
              <td className="border p-2">{program.details}</td>
              <td className="border p-2">{program.benefits}</td>
              <td className="border p-2">
                {program.duration_value} {program.duration_unit}
              </td>
              <td className="border p-2">
                {program.program_pic ? (
                  <a
                    href={`http://localhost:7000${program.program_pic}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image
                  </a>
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(program.program_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(program.program_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramsList;
