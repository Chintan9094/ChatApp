import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Register() {
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);

    if (!res.success) toast.error(res.message || "Register failed");
    else toast.success("Registration successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md glass rounded-3xl shadow-2xl p-8 border border-white/10">
        <h1 className="text-3xl font-bold text-center text-gradient">
          Create Account
        </h1>
        <p className="text-center text-slate-300 mb-6">
          Join & start chatting instantly
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-900/40 transition">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 font-semibold hover:text-indigo-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
