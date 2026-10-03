import { Save } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (form.password && form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      const { data } = await api.put("/users/profile", payload);
      const nextUser = { ...user, ...data };
      localStorage.setItem("user", JSON.stringify(nextUser));
      setUser(nextUser);
      setForm({ ...form, password: "" });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell max-w-2xl">
      <PageHeader title="Profile" description="Update your account information and password." />
      <form className="panel space-y-4 p-6" onSubmit={submit}>
        <label>
          <span className="label">Full Name</span>
          <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          <span className="label">Email</span>
          <input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          <span className="label">New Password</span>
          <input className="input" type="password" placeholder="Leave blank to keep current password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </label>
        <button className="btn-primary" disabled={loading}><Save size={16} /> {loading ? "Saving..." : "Save Profile"}</button>
      </form>
    </div>
  );
};

export default Profile;
