// src/pages/NewsDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/NewsServices";

interface News {
  news_id: number | string;
  title: string;
  article: string;
  minutes_to_read?: number | string;
  status: string;
  media_url?: string | null;
  created_at?: string;
  media_file?: File | null;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News>({
    news_id: "",
    title: "",
    article: "",
    minutes_to_read: "",
    status: "Draft",
    media_url: null,
    created_at: "",
    media_file: null,
  });
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

  useEffect(() => {
    if (!id) return;
    getNewsById(id).then((res) => {
      if (res.ok) setNews(res.data.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading article...</div>;
  }

  if (!news || !news.news_id) {
    return <div className="p-6 text-center">Article not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-2xl shadow-lg">
      {/* Title */}
      <h1 className="text-4xl font-extrabold leading-tight mb-2">
        {news.title || "Untitled Article"}
      </h1>

      {/* Meta info */}
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2 space-x-4">
        <span>{news.minutes_to_read || 5} min read</span>
        {news.created_at && (
          <span>{new Date(news.created_at).toLocaleDateString()}</span>
        )}
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            news.status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {news.status}
        </span>
      </div>

      {/* Image */}
      {news.media_url && (
        <div className="mt-6">
          <img
            src={`${API_URL}${news.media_url}`}
            alt={news.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Article */}
      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Article</h2>
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {news.article || "No content available."}
          </p>
        </section>
      </div>

      {/* Action buttons */}
      <div className="mt-10 flex space-x-4">
        <button
          onClick={() => nav("/programs")}
          className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          ← Back to Programs
        </button>
      </div>
    </div>
  );
}
