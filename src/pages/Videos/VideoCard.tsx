import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  video: {
    video_id: number | string;
    title: string;
    description: string;
    video_url?: string | null;
    thumbnail_url?: string | null;
  };
}

export default function VideoCard({ video }: VideoCardProps) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/videoDetails/${video.video_id}`);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.25)",
      }}
      className="
        group relative flex flex-col
        w-[22rem] h-[28rem]
        bg-white dark:bg-gray-900
        rounded-2xl shadow-md overflow-hidden
        border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl hover:border-indigo-500/50
        cursor-pointer
      "
      onClick={handleClick}
    >
      {/* Video thumbnail */}
      <div className="h-52 w-full overflow-hidden">
        {video.thumbnail_url ? (
          <img
            src={`${"http://localhost:7000"}${video.thumbnail_url}`}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 text-sm">
            No Thumbnail
          </div>
        )}
      </div>

      {/* Video content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-orange-400 line-clamp-2">
          {video.title}
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {video.description}
        </p>
        <span className="mt-auto text-indigo-600 text-sm font-semibold hover:underline">
          Watch video →
        </span>
      </div>
    </motion.div>
  );
}
