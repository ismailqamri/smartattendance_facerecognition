// src/components/AttendanceTable.jsx
import React, { useMemo, useState } from "react";

export default function AttendanceTable({
  data = [],               // [{ id, date, subject, studentName, status: "Present"|"Absent" }]
  editable = false,
  onToggleStatus,          // (row) => void
  pageSize = 10,
  showStudent = true,
  showSubject = true,
}) {
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const term = q.toLowerCase();
    return data.filter(
      (r) =>
        r.studentName?.toLowerCase().includes(term) ||
        r.subject?.toLowerCase().includes(term) ||
        r.date?.toLowerCase().includes(term) ||
        r.status?.toLowerCase().includes(term)
    );
  }, [q, data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  function next() { setPage((p) => Math.min(totalPages, p + 1)); }
  function prev() { setPage((p) => Math.max(1, p - 1)); }

  return (
    <div className="w-full">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          className="w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
          placeholder="Search student, subject, date…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filtered.length} records • Page {page} / {totalPages}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <table className="min-w-[720px] w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-sm text-gray-600 dark:text-gray-300">
              <th className="px-4 py-3">Date</th>
              {showSubject && <th className="px-4 py-3">Subject</th>}
              {showStudent && <th className="px-4 py-3">Student</th>}
              <th className="px-4 py-3">Status</th>
              {editable && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400" colSpan={editable ? 5 : 4}>
                  No records found.
                </td>
              </tr>
            )}
            {slice.map((row) => (
              <tr key={row.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3">{row.date}</td>
                {showSubject && <td className="px-4 py-3">{row.subject}</td>}
                {showStudent && <td className="px-4 py-3">{row.studentName}</td>}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      row.status === "Present"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                {editable && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleStatus?.(row)}
                      className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Toggle
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          onClick={prev}
          disabled={page === 1}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={next}
          disabled={page === totalPages}
          className="rounded-lg border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
