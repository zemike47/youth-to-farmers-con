import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  news: {
    news_id: number | string;
    title: string;
    article: string;
    media_url?: string | null;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/newsDetail/${news.news_id}`);
  };

  // API base URL
  const API_URL = "http://localhost:7000";

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.25)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="
        group relative flex flex-col
        w-[22rem] h-[28rem]
        bg-white dark:bg-gray-900
        rounded-2xl shadow-md overflow-hidden
        border border-gray-200 dark:border-gray-700
        hover:border-indigo-500/50
        cursor-pointer
      "
      onClick={handleClick}
    >
      {/* News image */}
      <div className="h-auto w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {news.media_url ? (
          <img
            src={`${API_URL}${news.media_url}`}
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-900 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* News content */}
      <div className="flex flex-col flex-1 p-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-orange-400 line-clamp-2">
          {news.title}
        </h3>
        <p className="mt-auto text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {news.article}
        </p>
        <span className="mt-auto text-indigo-600 text-sm font-semibold hover:underline">
          Read more →
        </span>
      </div>
    </motion.div>
  );
}
