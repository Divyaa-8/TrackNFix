import { ArrowRight, BarChart3, ClipboardCheck, Clock, Filter, ShieldCheck, Smartphone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <main className="min-h-screen bg-white">
    <section className="bg-[linear-gradient(135deg,#eef6ff_0%,#ffffff_45%,#f8fafc_100%)] px-4 py-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-brand text-white">
            <ClipboardCheck size={20} />
          </div>
          <p className="text-lg font-black text-ink">Smart Complaints</p>
        </div>
        <div className="flex gap-2">
          <Link className="btn-secondary" to="/login">Login</Link>
          <Link className="btn-primary" to="/register">Register</Link>
        </div>
      </nav>
      <div className="mx-auto grid max-w-7xl items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase text-mint">Digital complaint management</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink md:text-6xl">TrackNFix</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Register complaints, track statuses, manage priorities, and view analytics from one responsive MERN dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" to="/register">Get Started <ArrowRight size={18} /></Link>
            <Link className="btn-secondary" to="/login">Admin Login</Link>
          </div>
        </div>
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-500">Operations Snapshot</p>
              <p className="text-xs text-slate-400">Live dashboard preview</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Online</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Pending", 18, Clock, "bg-amber-100 text-amber-700"],
              ["In Progress", 11, Filter, "bg-blue-100 text-blue-700"],
              ["Resolved", 42, ClipboardCheck, "bg-emerald-100 text-emerald-700"],
              ["High Priority", 7, ShieldCheck, "bg-red-100 text-red-700"]
            ].map(([label, value, Icon, tone]) => (
              <div key={label} className="rounded-md border border-slate-100 bg-slate-50 p-4">
                <Icon size={18} className="text-slate-400" />
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold">{value}</p>
                <span className={`mt-3 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${tone}`}>Live</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 md:grid-cols-3">
      {[
        [ShieldCheck, "Secure", "JWT authentication, role-based access, and hashed passwords."],
        [Smartphone, "Responsive", "Clean UI for phones, tablets, laptops, and admin rooms."],
        [BarChart3, "Analytical", "Status, category, and monthly charts for faster decisions."]
      ].map(([Icon, title, text]) => (
        <div className="panel p-5" key={title}>
          <Icon className="text-brand" />
          <h2 className="mt-4 text-lg font-bold">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{text}</p>
        </div>
      ))}
    </section>
  </main>
);

export default Home;
