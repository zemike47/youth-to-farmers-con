import { useState, useEffect } from "react";
import ParentOrgForm from "./ParentOrgForm";
import ParentOrgList from "./ParentOrgList";
import {
  getAllParentOrganizations,
  deleteParentOrganization,
} from "../../../services/orgService";

import bg from "../../../assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";

// Define the shape of a Parent Organization
export interface ParentOrg {
  organization_id: number;
  organization_name: string;
  organization_description: string;
  contact_email?: string | null;
  contact_phone?: string | null;
  created_at?: string;
  updated_at?: string;
}

const ParentOrgApp = () => {
  const [parentOrgList, setParentOrgList] = useState<ParentOrg[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const fetchParentOrgs = async () => {
    setLoading(true);
    setError("");
    const res = await getAllParentOrganizations();
    if (res.ok) {
      setParentOrgList(res.data.data as ParentOrg[]);
    } else {
      setError("Failed to load parent organizations");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchParentOrgs();
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
      <h1 className="text-3xl font-bold mb-6 text-white">
        Parent Organization Management
      </h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>

      <ParentOrgForm
        refreshList={fetchParentOrgs}
        editingId={editingId}
        setEditingId={setEditingId}
      />

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ParentOrgList
        parentOrgList={parentOrgList}
        refreshList={fetchParentOrgs}
        setEditingId={setEditingId}
        handleDelete={deleteParentOrganization}
      />
    </div>
  );
};

export default ParentOrgApp;
