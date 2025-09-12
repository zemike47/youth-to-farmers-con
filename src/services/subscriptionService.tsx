// src/services/subscriptionService.ts
export const subscribeEmail = async (email: string) => {
  try {
    const res = await fetch(" http://localhost:7000/api/email_subscriptions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Subscription API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
