import React from "react";
import { Eye, Inbox, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const ComplaintTable = ({ complaints = [], onDelete, admin = false }) => (
  <div className="panel overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-100/80 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
            {admin && <th className="px-4 py-3">User</th>}
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {complaints.map((item) => (
            <tr key={item._id} className="transition hover:bg-blue-50/40">
              <td className="px-4 py-4">
                <p className="font-bold text-ink">{item.title}</p>
                <p className="mt-1 line-clamp-1 max-w-md text-xs text-slate-500">{item.description}</p>
              </td>
              <td className="px-4 py-4 font-medium text-slate-600">{item.category}</td>
              <td className="px-4 py-3"><StatusBadge value={item.priority} /></td>
              <td className="px-4 py-3"><StatusBadge value={item.status} /></td>
              {admin && <td className="px-4 py-3">{item.userId?.name || "Unknown"}</td>}
              <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link className="btn-secondary px-3" to={`/complaints/${item._id}`} title="View complaint">
                    <Eye size={16} />
                  </Link>
                  {onDelete && (
                    <button className="btn-danger px-3" onClick={() => onDelete(item._id)} title="Delete complaint">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {!complaints.length && (
            <tr>
              <td className="px-4 py-12 text-center text-slate-500" colSpan={admin ? 7 : 6}>
                <div className="flex flex-col items-center gap-2">
                  <Inbox size={30} className="text-slate-300" />
                  <span className="font-semibold">No complaints found</span>
                  <span className="text-xs">Try changing the filters or create a new complaint.</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ComplaintTable;
