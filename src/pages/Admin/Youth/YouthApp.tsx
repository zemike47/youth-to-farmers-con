import { useState, useEffect } from "react";

import YouthForm from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/Youth/YouthForm";
import YouthList from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/Youth/YouthList";
import { getAllYouth } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/youthService";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";

const YouthApp = () => {
  const [youthList, setYouthList] = useState([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const nav = useNavigate();
  const fetchYouth = async () => {
    const res = await getAllYouth();
    if (res.ok) setYouthList(res.data.data);
    else alert("Failed to load youth list");
  };

  useEffect(() => {
    fetchYouth();
  }, []);

  return (
    <div
      className=" mx-auto p-6 bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Youth Management</h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>
      <div className="gap-y-3.5">
        <YouthForm
          refreshList={fetchYouth}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <YouthList
          youthList={youthList}
          refreshList={fetchYouth}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default YouthApp;
