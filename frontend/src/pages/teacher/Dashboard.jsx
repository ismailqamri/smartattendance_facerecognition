// src/pages/teacher/Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock subjects (replace with API in real app)
const subjects = [
  { id: 1, name: "Math", class: "Class 1" },
  { id: 2, name: "Science", class: "Class 1" },
  { id: 3, name: "History", class: "Class 2" },
];

export default function TeacherDashboard() {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [classActive, setClassActive] = useState(false);

  const startClass = () => {
    if (!selectedSubject) {
      alert("Please select a subject first!");
      return;
    }
    setClassActive(true);
    alert(`Class started for ${selectedSubject}`);
    // Optional: call backend API to start session
  };

  const stopClass = () => {
    setClassActive(false);
    alert(`Class stopped for ${selectedSubject}`);
    // Optional: call backend API to stop session
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      {/* Subject selection */}
      <div className="bg-white shadow rounded p-4 mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <div>
          <label className="block mb-2 font-semibold">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name} ({sub.class})
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 md:mt-0">
          {classActive ? (
            <button
              onClick={stopClass}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Stop Class
            </button>
          ) : (
            <button
              onClick={startClass}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Start Class
            </button>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex space-x-4">
        <Link
          to="/teacher/class-control"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Class Control
        </Link>
        <Link
          to={`/teacher/attendance`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Attendance
        </Link>
        <Link
          to="/teacher/reports"
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Reports
        </Link>
      </div>

      {/* Status */}
      {classActive && selectedSubject && (
        <div className="mt-4 bg-green-100 text-green-800 p-2 rounded">
          Attendance is being marked for <strong>{selectedSubject}</strong>.
        </div>
      )}
    </div>
  );
}
