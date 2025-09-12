const API_URL = "http://localhost:7000/api/videos";

// Create a new video
export const createVideo = async (videoData) => {
  console.log(videoData);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: videoData,
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Video API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all videos
export const getAllVideos = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Video API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get a single video by ID
export const getVideoById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Video API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update video info (title, description, or file)
export const updateVideo = async (id, videoData) => {
  console.log(videoData);
  try {
    let body;
    let headers = {};

    // If updating with a file -> use FormData
    if (videoData instanceof FormData) {
      body = videoData;
    } else {
      // Else -> normal JSON
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(videoData);
    }

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers,
      body,
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Video API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete a video
export const deleteVideo = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Video API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
