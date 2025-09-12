//youthService

const API_URL = "http://localhost:7000/api/youth";

// Create a new youth with file upload (multipart/form-data)
export const createYouth = async (formData: FormData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData, // Let browser set content-type
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Youth API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all youth records
export const getAllYouth = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Youth API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get a single youth by ID
export const getYouthById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Youth API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update youth info (optionally including file upload)
export const updateYouth = async (
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
    console.error("Youth API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete a youth record
export const deleteYouth = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Youth API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
