import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ComplaintFilters from "../components/ComplaintFilters";
import ComplaintTable from "../components/ComplaintTable";
import LoadingSpinner from "../components/LoadingSpinner";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import api from "../services/api";

const ComplaintHistory = () => {
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

  useEffect(() => {
    load();
  }, [filters]);

  return (
    <div className="page-shell">
      <PageHeader title="Complaint History" description="Search, filter, sort, and track all complaints you submitted." />
      <ComplaintFilters filters={filters} setFilters={setFilters} />
      {loading ? <LoadingSpinner /> : <ComplaintTable complaints={data?.complaints || []} />}
      <Pagination page={data?.page} pages={data?.pages} onPage={(page) => setFilters({ ...filters, page })} />
    </div>
  );
};

export default ComplaintHistory;
