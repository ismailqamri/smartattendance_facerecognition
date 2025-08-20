import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Reports() {
  const data = [
    { subject: "Math", percentage: 80 },
    { subject: "Science", percentage: 90 },
    { subject: "History", percentage: 70 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Reports</h1>
      <div className="bg-white shadow rounded p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
