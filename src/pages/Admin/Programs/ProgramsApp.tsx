import { useState, useEffect } from "react";

import ProgramsForm from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/Programs/ProgramsForm";
import ProgramsList from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/Programs/ProgramsList";
import { getAllPrograms } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/programService";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";
import type { Program } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/Programs/ProgramsList";

const ProgramsApp = () => {
  const [programsList, setProgramsList] = useState<Program[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const nav = useNavigate();

  const fetchPrograms = async () => {
    const res = await getAllPrograms();
    if (res.ok) setProgramsList(res.data.data);
    else alert("Failed to load programs list");
  };

  useEffect(() => {
    fetchPrograms();
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
      <h1 className="text-3xl font-bold mb-6">Programs Management</h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>

      <div className="gap-y-3.5">
        <ProgramsForm
          refreshList={fetchPrograms}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <ProgramsList
          programsList={programsList}
          refreshList={fetchPrograms}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default ProgramsApp;
