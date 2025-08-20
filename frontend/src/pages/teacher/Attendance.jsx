// src/pages/teacher/Attendance.jsx
import React, { useState, useEffect } from "react";

export default function TeacherAttendance() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [attendanceDates, setAttendanceDates] = useState([]);

  // Mock subjects - in real app, fetch from backend
  const subjects = [
    { id: 1, name: "Math", class: "Class 1" },
    { id: 2, name: "Science", class: "Class 1" },
    { id: 3, name: "History", class: "Class 2" },
  ];

  // Mock attendance data per subject
  const attendanceData = {
    Math: {
      students: [
        { id: 1, name: "Alice", attendance: { "2025-08-01": true, "2025-08-05": true, "2025-08-10": false } },
        { id: 2, name: "Bob", attendance: { "2025-08-01": true, "2025-08-05": false, "2025-08-10": true } },
      ],
      dates: ["2025-08-01", "2025-08-05", "2025-08-10"],
    },
    Science: {
      students: [
        { id: 1, name: "Alice", attendance: { "2025-08-02": true, "2025-08-06": false } },
        { id: 3, name: "Charlie", attendance: { "2025-08-02": true, "2025-08-06": true } },
      ],
      dates: ["2025-08-02", "2025-08-06"],
    },
    History: {
      students: [
        { id: 2, name: "Bob", attendance: { "2025-08-03": true, "2025-08-07": true } },
        { id: 3, name: "Charlie", attendance: { "2025-08-03": false, "2025-08-07": true } },
      ],
      dates: ["2025-08-03", "2025-08-07"],
    },
  };

  // Update table when subject changes
  useEffect(() => {
    if (selectedSubject) {
      setStudents(attendanceData[selectedSubject].students);
      setAttendanceDates(attendanceData[selectedSubject].dates);
    } else {
      setStudents([]);
      setAttendanceDates([]);
    }
  }, [selectedSubject]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Viewer</h1>

      {/* Subject Select */}
      <div className="bg-white shadow rounded p-4 mb-4">
        <label className="block mb-2 font-semibold">Select Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        >
          <option value="">-- Select Subject --</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name} ({sub.class})
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Table */}
      {selectedSubject && students.length > 0 && (
        <div className="bg-white shadow rounded p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-2">
            {subjects.find((s) => s.name === selectedSubject).class} - {selectedSubject} Attendance
          </h2>

          <table className="w-full border-collapse text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 sticky left-0 bg-gray-100 z-10">Student</th>
                {attendanceDates.map((date) => (
                  <th key={date} className="border px-4 py-2">{date}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((stu) => (
                <tr key={stu.id}>
                  <td className="border px-4 py-2 font-semibold sticky left-0 bg-white z-0">{stu.name}</td>
                  {attendanceDates.map((date) => (
                    <td
                      key={date}
                      className={`border px-4 py-2 ${
                        stu.attendance[date] ? "text-green-500 font-bold" : "text-red-500 font-bold"
                      }`}
                    >
                      {stu.attendance[date] ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
