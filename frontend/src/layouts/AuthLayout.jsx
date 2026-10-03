import { BarChart3, CheckCircle2, ClipboardList, ShieldCheck } from "lucide-react";
import React from "react";

const AuthLayout = ({ title, subtitle, children }) => (
  <main className="relative min-h-screen overflow-hidden bg-slate-950">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(110deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.78) 42%, rgba(37, 99, 235, 0.34) 100%), url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1800&q=80')"
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(14,165,233,0.28),transparent_32%)]" />

    <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-8 lg:grid-cols-[1fr_460px] lg:px-8">
      <section className="hidden max-w-2xl text-white lg:block">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          <ClipboardList size={18} />
          Smart Complaint Management System
        </div>
        <h1 className="text-5xl font-black leading-tight">Manage complaints faster with a modern digital workflow.</h1>
        <p className="mt-5 text-lg leading-8 text-blue-50/85">
          Register issues, track status changes, manage priorities, and review analytics from a secure MERN dashboard.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            [ShieldCheck, "Secure roles"],
            [CheckCircle2, "Status tracking"],
            [BarChart3, "Live reports"]
          ].map(([Icon, label]) => (
            <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <Icon size={22} className="text-sky-200" />
              <p className="mt-3 text-sm font-bold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-md">
        <div className="panel border-white/25 bg-white/95 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur">
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-brand text-white shadow-sm">
              <ClipboardList size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-black">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
          </div>
          {children}
        </div>
      </section>
    </div>
  </main>
);

export default AuthLayout;
