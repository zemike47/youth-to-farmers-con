import { useState, useEffect } from "react";

import NewsForm from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/News-/NewsForm";
import NewsList from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/Admin/News-/NewsList";
import { getAllNews } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/NewsServices";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";
import { useNavigate } from "react-router-dom";
const NewsApp = () => {
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const nav = useNavigate();

  const fetchNews = async () => {
    const res = await getAllNews();
    if (res.ok) setNewsList(res.data.data);
    else alert("Failed to load news");
  };

  useEffect(() => {
    fetchNews();
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
      <h1 className="text-3xl font-bold mb-6 text-white">News Management</h1>
      <button
        onClick={() => nav("/admin")}
        className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        ← Back to admin
      </button>
      <div className="gap-y-3.5">
        <NewsForm
          refreshList={fetchNews}
          editingId={editingId}
          setEditingId={setEditingId}
        />
        <NewsList
          newsList={newsList}
          refreshList={fetchNews}
          setEditingId={setEditingId}
        />
      </div>
    </div>
  );
};

export default NewsApp;
