// client/src/services/messageService.ts

const API_URL = "http://localhost:7000/api/Contact_messages";

// Create a new contact message
export const createMessage = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
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
    console.error("Message API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all messages
export const getAllMessages = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Message API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get single message by ID
export const getMessageById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Message API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete message
export const deleteMessage = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Message API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
