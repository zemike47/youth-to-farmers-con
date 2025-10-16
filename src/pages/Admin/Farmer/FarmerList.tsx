import React from "react";
import { deleteFarmer } from "../../../services/farmerService";

// Define Farmer type
export interface Farmer {
  farmer_id: number;
  first_name: string;
  last_name: string;
  location: string;
  support_needed: string;
  phone_number: string;
  farm_size: string;
  main_crops: string;
  accommodation_available: boolean;
  farming_experience: string;
}

interface FarmerListProps {
  farmerList: Farmer[];
  refreshList: () => void;
  setEditingId: (id: number | null) => void; // allow null
}
interface FarmerListProps {
  farmerList: Farmer[];
  refreshList: () => void;
  setEditingId: (id: number | null) => void; // allow null
}

const FarmerList: React.FC<FarmerListProps> = ({
  farmerList,
  refreshList,
  setEditingId,
}) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      try {
        const res = await deleteFarmer(id);
        if (res.ok) {
          refreshList();
        } else {
          alert("Failed to delete farmer");
        }
      } catch (error) {
        console.error("Error deleting farmer:", error);
        alert("An error occurred while deleting the farmer.");
      }
    }
  };

  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Farmer List</h2>
      <table className="min-w-full text-sm text-black bg-white border border-gray-300 rounded-2xl shadow-lg">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Support Needed</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Farm Size</th>
            <th className="border p-2">Main Crops</th>
            <th className="border p-2">Accommodation</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {farmerList.map((farmer) => (
            <tr key={farmer.farmer_id} className="text-center hover:bg-gray-50">
              <td className="border p-2">{farmer.first_name}</td>
              <td className="border p-2">{farmer.last_name}</td>
              <td className="border p-2">{farmer.location}</td>
              <td className="border p-2">{farmer.support_needed}</td>
              <td className="border p-2">{farmer.phone_number}</td>
              <td className="border p-2">{farmer.farm_size}</td>
              <td className="border p-2">{farmer.main_crops}</td>
              <td className="border p-2">
                {farmer.accommodation_available ? "Yes" : "No"}
              </td>
              <td className="border p-2">{farmer.farming_experience}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(farmer.farmer_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(farmer.farmer_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {farmerList.length === 0 && (
            <tr>
              <td colSpan={10} className="text-center p-4">
                No farmers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerList;
