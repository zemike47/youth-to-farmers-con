// client/src/services/systemUserService.ts

const API_URL = "http://localhost:7000/api/system_users";

// Create a new system user
export const createUser = async (data: {
  username: string;
  email: string;
  role: string;
  status: string;
  last_login?: string; // ISO string or null
  articles_published_count?: number;
}) => {
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
    console.error("SystemUser API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all system users
export const getAllUsers = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("SystemUser API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get single user by ID
export const getUserById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("SystemUser API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update system user
export const updateUser = async (
  id: string | number,
  data: {
    username: string;
    email: string;
    role: string;
    status: string;
    last_login?: string;
    articles_published_count?: number;
  }
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
    console.error("SystemUser API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete system user
export const deleteUser = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("SystemUser API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
