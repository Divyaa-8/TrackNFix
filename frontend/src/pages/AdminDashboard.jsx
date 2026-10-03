import { AlertTriangle, CheckCircle2, Clock, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import api from "../services/api";
import useFetch from "../hooks/useFetch";

const AdminDashboard = () => {
  const { data, loading } = useFetch(async () => {
    const { data: response } = await api.get("/admin/dashboard");
    return response;
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <div className="page-shell">
      <PageHeader
        title="Admin Dashboard"
        description="Monitor complaint volume, resolution status, registered users, and category trends."
        actions={<Link className="btn-primary" to="/admin/complaints">Manage Complaints</Link>}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Users} label="Users" value={data.totalUsers} />
        <StatCard icon={Clock} label="Pending" value={data.pendingComplaints} tone="bg-amber-50 text-amber-700" />
        <StatCard icon={CheckCircle2} label="Resolved" value={data.resolvedComplaints} tone="bg-emerald-50 text-emerald-700" />
        <StatCard icon={AlertTriangle} label="Rejected" value={data.rejectedComplaints} tone="bg-rose-50 text-rose-700" />
      </div>
      <div className="panel p-5">
        <h2 className="mb-4 text-lg font-bold">Category-wise Analytics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
