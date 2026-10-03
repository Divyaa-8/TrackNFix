import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Register for complaint tracking.">
      <form onSubmit={submit}>
        <div className="mt-6 space-y-4">
          <label><span className="label">Full Name</span><input className="input" placeholder="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          <label><span className="label">Email</span><input className="input" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label><span className="label">Password</span><input className="input" type="password" placeholder="Minimum 6 characters" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <label>
            <span className="label">Role</span>
            <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button className="btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Register"}</button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">Already registered? <Link className="font-semibold text-brand" to="/login">Login</Link></p>
      </form>
    </AuthLayout>
  );
};

export default Register;
