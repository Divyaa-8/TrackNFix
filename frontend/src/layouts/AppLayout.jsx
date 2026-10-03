import { BarChart3, ClipboardList, Home, LogOut, Menu, PlusCircle, ShieldCheck, User, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const userLinks = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/complaints/new", label: "Create Complaint", icon: PlusCircle },
  { to: "/complaints", label: "History", icon: ClipboardList },
  { to: "/profile", label: "Profile", icon: User }
];

const adminLinks = [
  { to: "/admin", label: "Admin Dashboard", icon: ShieldCheck },
  { to: "/admin/complaints", label: "Manage Complaints", icon: ClipboardList },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User }
];

const AppLayout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = user?.role === "admin" ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="btn-secondary px-3 lg:hidden" onClick={() => setOpen(true)} title="Open navigation">
              <Menu size={18} />
            </button>
            <div className="hidden h-10 w-10 place-items-center rounded-md bg-brand text-white shadow-sm sm:grid">
              <ClipboardList size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-ink">Smart Complaints</p>
              <p className="text-xs font-medium text-slate-500">Real-time complaint operations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-700">{user?.name}</p>
              <p className="text-xs capitalize text-slate-400">{user?.role}</p>
            </div>
            <button className="btn-secondary" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-200 bg-white p-4 transition lg:top-16 lg:z-20 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="font-bold">Navigation</p>
          <button className="btn-secondary px-3" onClick={() => setOpen(false)} title="Close navigation">
            <X size={18} />
          </button>
        </div>
        <div className="mb-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-bold uppercase text-blue-500">Workspace</p>
          <p className="mt-1 text-sm font-bold text-ink">{user?.role === "admin" ? "Administration" : "My Complaints"}</p>
        </div>
        <nav className="space-y-1.5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-bold transition ${
                  isActive ? "bg-brand text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation overlay" />}

      <main className="px-4 py-6 lg:ml-72 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
