import React from "react";

const PageHeader = ({ title, description, actions }) => (
  <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
    <div>
      <h1 className="text-2xl font-black tracking-tight text-ink md:text-3xl">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export default PageHeader;
