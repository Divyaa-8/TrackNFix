import React from "react";

const styles = {
  Pending: "bg-amber-100 text-amber-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-orange-100 text-orange-700",
  High: "bg-red-100 text-red-700"
};

const StatusBadge = ({ value }) => (
  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[value] || "bg-slate-100 text-slate-700"}`}>
    {value}
  </span>
);

export default StatusBadge;
