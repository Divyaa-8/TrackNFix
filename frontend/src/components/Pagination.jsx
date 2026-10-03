import React from "react";

const Pagination = ({ page = 1, pages = 1, onPage }) => (
  <div className="flex items-center justify-end gap-3">
    <button className="btn-secondary" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</button>
    <span className="text-sm font-medium text-slate-500">Page {page} of {pages}</span>
    <button className="btn-secondary" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
  </div>
);

export default Pagination;
