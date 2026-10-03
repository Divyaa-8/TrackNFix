import React from "react";

const StatCard = ({ icon: Icon, label, value, tone = "bg-blue-50 text-blue-700" }) => (
  <div className="panel p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="mt-2 text-3xl font-bold text-ink">{value ?? 0}</p>
      </div>
      <div className={`grid h-11 w-11 place-items-center rounded-md ${tone}`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);

export default StatCard;
