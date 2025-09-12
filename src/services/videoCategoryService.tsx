// client/src/services/videoCategoryService.ts

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/video-categories`
  : "http://localhost:7000/api/video-categories";

// Create a new video category
export const createCategory = async (data: { category_name: string }) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("VideoCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("VideoCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get category by ID
export const getCategoryById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("VideoCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update category
export const updateCategory = async (
  id: string | number,
  data: { category_name: string }
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("VideoCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete category
export const deleteCategory = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("VideoCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
