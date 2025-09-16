import { useEffect, useState } from "react";
import { getAllNews } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/NewsServices";
import NewsCard from "./NewsCard";
import { News } from "../types/news";

export default function NewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);

  useEffect(() => {
    getAllNews().then((res) => {
      if (res.ok) setNewsList(res.data.data);
    });
  }, []);

  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      {newsList.map((news) => (
        <NewsCard key={news.news_id} news={news} />
      ))}
    </div>
  );
}
