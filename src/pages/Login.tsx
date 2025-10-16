import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bgLight3.jpeg";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // hardcoded admin password from env
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin3223";

    if (password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Invalid password!");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4 text-orange-600">
          Welcome back Admin to Yelcho Mahber
        </h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full border text-white bg-black p-2 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
