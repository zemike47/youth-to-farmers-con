import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoById } from "../../services/videoService";
import type { Video } from "../../types/Video";

export default function VideoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id);
        if (res.ok) {
          setVideo(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Loading video...
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Video not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Video Player */}
      <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg">
        <video
          controls
          className="w-full h-[24rem] object-contain bg-black"
          src={`http://localhost:7000${video.video_url ?? ""}`}
        />
      </div>

      {/* Video Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-orange-400">
          {video.title}
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {video.description}
        </p>
      </div>
    </div>
  );
}
