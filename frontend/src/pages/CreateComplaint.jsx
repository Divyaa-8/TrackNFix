import { ImagePlus, Send } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import api from "../services/api";

const categories = ["Maintenance", "Electrical", "Sanitation", "Security", "Water Supply", "Roads", "Noise", "Other"];

const CreateComplaint = () => {
  const [form, setForm] = useState({ title: "", description: "", category: "", priority: "Medium", image: null });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (form.description.trim().length < 10) return toast.error("Description must be at least 10 characters");
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    setLoading(true);
    try {
      await api.post("/complaints", payload, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("Complaint submitted");
      navigate("/complaints");
    } catch (error) {
      toast.error(error.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell max-w-5xl">
      <PageHeader title="Create Complaint" description="Submit a detailed complaint with category, priority, description, and optional image proof." />
      <form className="grid gap-6 lg:grid-cols-[1fr_320px]" onSubmit={submit}>
        <section className="panel space-y-5 p-6">
          <label>
            <span className="label">Complaint Title</span>
            <input className="input" placeholder="Example: Water leakage near main gate" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label>
              <span className="label">Category</span>
              <select className="input" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
            <label>
              <span className="label">Priority</span>
              <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
          </div>
          <label>
            <span className="label">Description</span>
            <textarea className="input min-h-44" placeholder="Describe the issue, location, impact, and any urgency." required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
        </section>
        <aside className="panel h-fit space-y-5 p-6">
          <div>
            <h2 className="section-title">Image Proof</h2>
            <p className="muted mt-1">Upload a JPG, PNG, or WEBP image up to 2 MB.</p>
          </div>
          <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-slate-600 transition hover:border-brand hover:bg-blue-50">
            <ImagePlus size={28} className="text-brand" />
            <span className="font-semibold">{form.image?.name || "Choose image"}</span>
            <input className="hidden" type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
          </label>
          <button className="btn-primary w-full" disabled={loading}><Send size={16} /> {loading ? "Submitting..." : "Submit Complaint"}</button>
        </aside>
      </form>
    </div>
  );
};

export default CreateComplaint;
