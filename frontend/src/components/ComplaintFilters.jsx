import React from "react";
import { RotateCcw } from "lucide-react";

const ComplaintFilters = ({ filters, setFilters, showStatus = true }) => {
  const update = (key, value) => setFilters((current) => ({ ...current, [key]: value, page: 1 }));
  const reset = () => setFilters({ page: 1, limit: filters.limit || 8 });

  return (
    <div className="panel p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="section-title">Search & Filter</h2>
          <p className="muted">Narrow complaints by text, status, priority, date, and sorting.</p>
        </div>
        <button className="btn-secondary px-3" onClick={reset} type="button" title="Reset filters">
          <RotateCcw size={16} />
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-span-2">
          <span className="label">Search</span>
          <input className="input" placeholder="Title or category" value={filters.search || ""} onChange={(event) => update("search", event.target.value)} />
        </div>
        {showStatus && (
          <label>
            <span className="label">Status</span>
            <select className="input" value={filters.status || ""} onChange={(event) => update("status", event.target.value)}>
              <option value="">All status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </label>
        )}
        <label>
          <span className="label">Priority</span>
          <select className="input" value={filters.priority || ""} onChange={(event) => update("priority", event.target.value)}>
            <option value="">All priorities</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>
          <span className="label">Category</span>
          <input className="input" placeholder="Category" value={filters.category || ""} onChange={(event) => update("category", event.target.value)} />
        </label>
        <label>
          <span className="label">From</span>
          <input className="input" type="date" value={filters.from || ""} onChange={(event) => update("from", event.target.value)} />
        </label>
        <label>
          <span className="label">To</span>
          <input className="input" type="date" value={filters.to || ""} onChange={(event) => update("to", event.target.value)} />
        </label>
        <label>
          <span className="label">Sort By</span>
          <select className="input" value={filters.sortBy || "createdAt"} onChange={(event) => update("sortBy", event.target.value)}>
            <option value="createdAt">Created date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="title">Title</option>
          </select>
        </label>
        <label>
          <span className="label">Order</span>
          <select className="input" value={filters.order || "desc"} onChange={(event) => update("order", event.target.value)}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ComplaintFilters;
