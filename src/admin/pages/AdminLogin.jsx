import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";
export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      navigate("/admin/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Admin Login
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-lg"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
    </div>
  );
}