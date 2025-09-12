// client/src/services/subscriptionService.ts

const API_URL = "http://localhost:7000/api/Email_subscriptions";

// Create a new subscription
export const createSubscription = async (email: string) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    console.error("Subscription API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get all subscriptions
export const getAllSubscriptions = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Subscription API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Get subscription by ID
export const getSubscriptionById = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Subscription API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};

// Delete subscription (unsubscribe)
export const deleteSubscription = async (id: string | number) => {
  console.log(id);
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Subscription API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
