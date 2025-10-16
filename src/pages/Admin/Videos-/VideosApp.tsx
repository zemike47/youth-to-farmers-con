import { useState, useEffect } from "react";

import VideosForm from "./VideosForm";
import VideosList from "./VideosList";
import { getAllVideos } from "../../../services/videoService";

import bg from "../../../assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";

const VideosApp = () => {
  const [videos, setVideos] = useState([]);
  //const [editingId, setEditingId] = useState(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const nav = useNavigate();

  const fetchVideos = async () => {
    const res = await getAllVideos();
    if (res.ok) setVideos(res.data.data);
    else alert("Failed to load videos list");
  };

  useEffect(() => {
    fetchVideos();
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
      <h1 className="text-3xl font-bold mb-6">Video Management</h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>
      <div className="gap-y-3.5">
        <VideosForm
          refreshList={fetchVideos}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <VideosList
          videos={videos}
          refreshList={fetchVideos}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default VideosApp;
