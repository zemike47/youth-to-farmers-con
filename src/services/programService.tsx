//programService
const API_URL = "http://localhost:7000/api/programs";

// Create a new program (supports file upload)
export const createProgram = async (formData: FormData) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData, // browser sets content-type automatically
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Program API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all programs
export const getAllPrograms = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Program API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get a single program by ID
export const getProgramById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Program API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update program info (optionally including file upload)
export const updateProgram = async (
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
    console.error("Program API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete a program
export const deleteProgram = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Program API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
