import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (!res.success) toast.error(res.message || "Login failed");
    else toast.success("Login successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          ChatApp
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to continue chatting
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
