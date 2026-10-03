import { AlertCircle, CheckCircle2, Clock, ClipboardList } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ComplaintTable from "../components/ComplaintTable";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import api from "../services/api";
import useFetch from "../hooks/useFetch";

const UserDashboard = () => {
  const { data, loading } = useFetch(async () => {
    const { data: response } = await api.get("/complaints?limit=5");
    return response;
  }, []);

  const complaints = data?.complaints || [];
  const counts = complaints.reduce((acc, item) => ({ ...acc, [item.status]: (acc[item.status] || 0) + 1 }), {});

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-shell">
      <PageHeader
        title="User Dashboard"
        description="Track complaint progress, review recent submissions, and create new service requests."
        actions={<Link className="btn-primary" to="/complaints/new">Create Complaint</Link>}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={ClipboardList} label="Total" value={data?.total} />
        <StatCard icon={Clock} label="Pending" value={counts.Pending || 0} tone="bg-amber-50 text-amber-700" />
        <StatCard icon={AlertCircle} label="In Progress" value={counts["In Progress"] || 0} tone="bg-blue-50 text-blue-700" />
        <StatCard icon={CheckCircle2} label="Resolved" value={counts.Resolved || 0} tone="bg-emerald-50 text-emerald-700" />
      </div>
      <section className="space-y-3">
        <h2 className="section-title">Recent Complaints</h2>
        <ComplaintTable complaints={complaints} />
      </section>
    </div>
  );
};

export default UserDashboard;
