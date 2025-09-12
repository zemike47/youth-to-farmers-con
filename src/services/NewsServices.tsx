// newsService.ts
const API_URL = "http://localhost:7000/api/news";

// Create a new news article (with optional file upload)
export const createNews = async (formData: FormData) => {
  console.log(formData);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData, // Browser will handle Content-Type
    });

    const data = await res.json();

    return { ok: res.ok, data };
  } catch (err) {
    console.error("News API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all news
export const getAllNews = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("News API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get a single news article by ID
export const getNewsById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("News API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update a news article (supports file upload)
export const updateNews = async (
  id: string | number,
  data: FormData | object,
  hasFile: boolean = false
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: hasFile ? (data as FormData) : JSON.stringify(data),
      headers: hasFile
        ? undefined
        : {
            "Content-Type": "application/json",
          },
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("News API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete a news article
export const deleteNews = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("News API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
