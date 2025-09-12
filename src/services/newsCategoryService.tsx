// client/src/services/newsCategoryService.ts

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/news-categories`
  : "http://localhost:7000/api/news-categories";

// Create a new news category
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
    console.error("NewsCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all news categories
export const getAllCategories = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("NewsCategory API error:", err);
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
    console.error("NewsCategory API error:", err);
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
    console.error("NewsCategory API error:", err);
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
    console.error("NewsCategory API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
