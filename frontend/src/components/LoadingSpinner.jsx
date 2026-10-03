import React from "react";

const LoadingSpinner = ({ label = "Loading" }) => (
  <div className="flex min-h-40 items-center justify-center gap-3 text-sm font-medium text-slate-500">
    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
    {label}
  </div>
);

export default LoadingSpinner;
