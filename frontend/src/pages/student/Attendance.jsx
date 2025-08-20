import React, { useState, useEffect } from "react";

export default function StudentAttendance() {
  const [attendanceData, setAttendanceData] = useState([
    { subject: "Math", attended: 15, total: 20 },
    { subject: "Science", attended: 12, total: 20 },
    { subject: "History", attended: 18, total: 20 },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Details</h1>
      <div className="bg-white shadow rounded p-4">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Attended</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">% Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.subject}</td>
                <td className="border p-2">{item.attended}</td>
                <td className="border p-2">{item.total}</td>
                <td className="border p-2">{((item.attended / item.total) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
