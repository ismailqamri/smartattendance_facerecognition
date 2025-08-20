import React, { useState } from "react";

export default function ClassControl() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", present: false },
    { id: 2, name: "Jane Smith", present: false },
  ]);

  const toggleAttendance = (id) => {
    setStudents(students.map(s => s.id === id ? {...s, present: !s.present} : s));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Class Control</h1>
      <table className="w-full table-auto border-collapse bg-white shadow rounded">
        <thead>
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2 text-center">
                <input type="checkbox" checked={s.present} onChange={() => toggleAttendance(s.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
