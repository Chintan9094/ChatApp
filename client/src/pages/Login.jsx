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
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md glass rounded-3xl shadow-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-center text-gradient">
          ChatApp
        </h1>
        <p className="text-center text-slate-300 mb-6">
          Login to continue chatting
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-900/40"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-300 font-semibold hover:text-indigo-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
