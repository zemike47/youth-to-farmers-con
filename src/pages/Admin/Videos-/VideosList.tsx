import React from "react";
import { deleteVideo } from "../../../services/videoService";

// Define the shape of a Video
interface Video {
  video_id: string;
  title: string;
  description: string;
  video_url?: string | null;
  thumbnail_url?: string | null;
  category_id?: string | null;
}

// Define props for VideosList
interface VideosListProps {
  videos: Video[];
  refreshList: () => Promise<void>;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
}

const VideosList: React.FC<VideosListProps> = ({
  videos,
  refreshList,
  setEditingId,
}) => {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      const res = await deleteVideo(id);
      if (res.ok) {
        refreshList();
      } else {
        alert("Failed to delete video");
      }
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Videos List</h2>
      <table className="space-y-6 p-6 text-sm w-full text-black bg-white border border-gray-300 rounded-2xl shadow-lg mt-8">
        <thead className="bg-black text-white">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Video</th>
            <th className="border p-2">Thumbnail</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {videos.map((video) => (
            <tr key={video.video_id} className="text-center">
              <td className="border p-2">{video.title}</td>
              <td className="border p-2">{video.description}</td>
              <td className="border p-2">
                {video.video_url ? (
                  <a
                    href={`http://localhost:7000${video.video_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Watch Video
                  </a>
                ) : (
                  "No Video"
                )}
              </td>
              <td className="border p-2">
                {video.thumbnail_url ? (
                  <a
                    href={`http://localhost:7000${video.thumbnail_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Image
                  </a>
                ) : (
                  "No Thumbnail"
                )}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => setEditingId(video.video_id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(video.video_id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideosList;
