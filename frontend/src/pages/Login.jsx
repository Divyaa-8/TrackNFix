import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Access your complaint workspace.">
      <form onSubmit={submit}>
        <div className="mt-6 space-y-4">
          <label>
            <span className="label">Email</span>
            <input className="input" type="email" placeholder="admin@example.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            <span className="label">Password</span>
            <input className="input" type="password" placeholder="Enter password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </label>
          <button className="btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">No account? <Link className="font-semibold text-brand" to="/register">Create one</Link></p>
      </form>
    </AuthLayout>
  );
};

export default Login;
