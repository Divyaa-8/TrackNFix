import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import api, { uploadBaseUrl } from "../services/api";

const ComplaintDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [statusForm, setStatusForm] = useState({ status: "", priority: "", note: "" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/complaints/${id}`);
      setComplaint(data);
      setStatusForm({ status: data.status, priority: data.priority, note: "" });
    } catch (error) {
      toast.error(error.message || "Unable to load complaint");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(`/admin/status/${id}`, statusForm);
      setComplaint(data);
      toast.success("Complaint updated");
      load();
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!complaint) return null;

  return (
    <div className="page-shell">
      <PageHeader title="Complaint Details" description="Review complaint information, image proof, requester details, and status history." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="panel p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold">{complaint.title}</h1>
              <p className="mt-1 text-sm text-slate-500">{complaint.category} | {new Date(complaint.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <StatusBadge value={complaint.priority} />
              <StatusBadge value={complaint.status} />
            </div>
          </div>

          <p className="mt-6 whitespace-pre-line leading-7 text-slate-700">{complaint.description}</p>
          {complaint.image && (
            <img className="mt-6 max-h-96 w-full rounded-md border border-slate-200 object-cover" src={`${uploadBaseUrl}${complaint.image}`} alt={complaint.title} />
          )}

          <div className="mt-8">
            <h2 className="section-title">Status History</h2>
            <div className="mt-4 space-y-3">
              {complaint.history?.map((item) => (
                <div key={item._id} className="rounded-md border border-slate-100 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StatusBadge value={item.status} />
                    <span className="text-xs font-medium text-slate-500">{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  {item.note && <p className="mt-2 text-sm text-slate-600">{item.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-5">
            <h2 className="section-title">Submitted By</h2>
            <p className="mt-3 text-sm font-semibold">{complaint.userId?.name}</p>
            <p className="text-sm text-slate-500">{complaint.userId?.email}</p>
          </div>

          {user?.role === "admin" && (
            <form className="panel space-y-4 p-5" onSubmit={updateStatus}>
              <h2 className="section-title">Admin Update</h2>
              <label>
                <span className="label">Status</span>
                <select className="input" value={statusForm.status} onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Rejected</option>
                </select>
              </label>
              <label>
                <span className="label">Priority</span>
                <select className="input" value={statusForm.priority} onChange={(e) => setStatusForm({ ...statusForm, priority: e.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>
              <label>
                <span className="label">Update Note</span>
                <textarea className="input min-h-24" placeholder="Update note" value={statusForm.note} onChange={(e) => setStatusForm({ ...statusForm, note: e.target.value })} />
              </label>
              <button className="btn-primary w-full">
                <Save size={16} /> Save Update
              </button>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ComplaintDetails;
