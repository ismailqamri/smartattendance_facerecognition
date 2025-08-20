import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [student, setStudent] = useState({ name: "John Doe", attendance: 82 });

  // Mock fetching student data (replace with API call)
  useEffect(() => {
    // Example: fetch("/students/me")...
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {student.name}</h1>
      <div className="bg-white shadow rounded p-4 mb-4">
        <p>Your current attendance: <span className="font-semibold">{student.attendance}%</span></p>
        {student.attendance < 75 && (
          <p className="text-red-500 mt-2">⚠ You need to improve your attendance!</p>
        )}
      </div>
      <div className="flex space-x-4">
        <Link to="/student/attendance" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Attendance</Link>
        <Link to="/student/notifications" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Notifications</Link>
      </div>
    </div>
  );
}
