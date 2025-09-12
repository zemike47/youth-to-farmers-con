// client/src/services/farmerService.ts

const API_URL = "http://localhost:7000/api/farmer";

// Create a new farmer
export const createFarmer = async (data: object) => {
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
    console.error("Farmer API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all farmers
export const getAllFarmers = async () => {
  try {
    const res = await fetch(API_URL);
    console.log(res);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Farmer API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get single farmer by ID
export const getFarmerById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Farmer API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Update farmer
export const updateFarmer = async (id: string | number, data: object) => {
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
    console.error("Farmer API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete farmer
export const deleteFarmer = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Farmer API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
