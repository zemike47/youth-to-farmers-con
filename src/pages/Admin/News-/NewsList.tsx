import React from "react";
import { deleteNews } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/NewsServices";

// Define the structure of a news item
export interface NewsItem {
  news_id: number;
  title: string;
  article: string;
  status: "Published" | "Draft" | "Archived";
  media_url?: string | null;
}

// Props interface
interface NewsListProps {
  newsList: NewsItem[];
  refreshList: () => void;
  setEditingId: (id: number | null) => void;
}

const NewsList: React.FC<NewsListProps> = ({
  newsList,
  refreshList,
  setEditingId,
}) => {
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      const res = await deleteNews(id);
      if (res.ok) refreshList();
      else alert("Failed to delete news");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">News List</h2>
      <table className="space-y-6 p-6 text-sm w-full text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Article</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Media</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {newsList.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No news articles found.
              </td>
            </tr>
          ) : (
            newsList.map((news) => (
              <tr key={news.news_id} className="text-center">
                <td className="border p-2">{news.title}</td>
                <td className="border p-2 line-clamp-2">{news.article}</td>
                <td className="border p-2">{news.status}</td>
                <td className="border p-2">
                  {news.media_url ? (
                    <a
                      href={`http://localhost:7000${news.media_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Media
                    </a>
                  ) : (
                    "No Media"
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => setEditingId(news.news_id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(news.news_id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
