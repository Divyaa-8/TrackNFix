import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintTable from "../components/ComplaintTable";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import api from "../services/api";

const AdminComplaints = () => {
  const [filters, setFilters] = useState({ page: 1, limit: 8 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data: response } = await api.get("/complaints", { params: filters });
      setData(response);
    } catch (error) {
      toast.error(error.message || "Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this complaint?")) return;
    await api.delete(`/complaints/${id}`);
    toast.success("Complaint deleted");
    load();
  };

  useEffect(() => {
    load();
  }, [filters]);

  return (
    <div className="page-shell">
      <PageHeader title="Complaint Management" description="Filter, review, inspect, and delete complaint records from one workspace." />
      <ComplaintFilters filters={filters} setFilters={setFilters} />
      {loading ? <LoadingSpinner /> : <ComplaintTable admin complaints={data?.complaints || []} onDelete={remove} />}
      <Pagination page={data?.page} pages={data?.pages} onPage={(page) => setFilters({ ...filters, page })} />
    </div>
  );
};

export default AdminComplaints;
