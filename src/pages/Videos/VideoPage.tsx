import { useEffect, useState } from "react";
import { getAllVideos } from "../../services/videoService";
import VideoCard from "./VideoCard";
import type { Video } from "../../types/Video";

export default function VideoPage() {
  const [videoList, setVideoList] = useState<Video[]>([]);

  useEffect(() => {
    getAllVideos().then((res) => {
      if (res.ok) setVideoList(res.data.data);
    });
  }, []);

  return (
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
      {videoList.length > 0 ? (
        videoList.map((video) => (
          <VideoCard key={video.video_id} video={video} />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No videos available
        </p>
      )}
    </div>
  );
}
