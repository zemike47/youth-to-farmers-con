import { useState, useEffect } from "react";
import FarmerForm from "./FarmerForm";
import FarmerList from "./FarmerList";
import { getAllFarmers } from "../../../services/farmerService";
import bg from "../../../assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";

const FarmerApp = () => {
  const [farmerList, setFarmerList] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchFarmers = async () => {
    setLoading(true);
    setError("");
    const res = await getAllFarmers();
    console.log(res);
    if (res.ok) {
      setFarmerList(res.data.data);
    } else {
      setError("Failed to load farmers");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFarmers();
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
      <h1 className="text-3xl font-bold mb-6 text-white">Farmer Management</h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>

      <div className="gap-y-3.5">
        <FarmerForm
          refreshList={fetchFarmers}
          editingId={editingId}
          setEditingId={setEditingId}
        />

        {loading && <p className="text-white">Loading farmers...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <FarmerList
          farmerList={farmerList}
          refreshList={fetchFarmers}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default FarmerApp;
