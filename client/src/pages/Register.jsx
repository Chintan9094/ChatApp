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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-100 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-purple-600">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join & start chatting instantly
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-purple-500"
          />

          <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
