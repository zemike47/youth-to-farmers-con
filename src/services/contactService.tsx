export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
}

export const sendContactMessage = async (formData: ContactFormData) => {
  try {
    const res = await fetch("http://localhost:7000/api/contact_messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error("Contact API error:", err);
    return { ok: false, data: { error: "Network error" } };
  }
};
