import { BarChart3, ClipboardList } from "lucide-react";
import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import api from "../services/api";
import useFetch from "../hooks/useFetch";

const colors = ["#2563eb", "#0f766e", "#f97316", "#dc2626", "#7c3aed", "#0891b2"];

const Analytics = () => {
  const { data, loading } = useFetch(async () => {
    const { data: response } = await api.get("/admin/dashboard");
    return response;
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-shell">
      <PageHeader title="Analytics & Reports" description="Review complaint trends by status, category, and month for faster decisions." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={ClipboardList} label="Total Complaints" value={data.totalComplaints} />
        <StatCard icon={BarChart3} label="Resolved" value={data.resolvedComplaints} tone="bg-emerald-50 text-emerald-700" />
        <StatCard icon={BarChart3} label="Pending" value={data.pendingComplaints} tone="bg-amber-50 text-amber-700" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="panel p-5">
          <h2 className="mb-4 text-lg font-bold">Monthly Statistics</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={data.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel p-5">
          <h2 className="mb-4 text-lg font-bold">Status Breakdown</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data.byStatus} dataKey="count" nameKey="_id" outerRadius={110} label>
                  {data.byStatus.map((_, index) => <Cell key={index} fill={colors[index % colors.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
