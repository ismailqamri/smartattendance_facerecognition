import React, { useState, useEffect } from "react";

export default function StudentNotifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your attendance in Math is below 75%" },
    { id: 2, message: "Science class on 20th Aug was missed" },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 && <p>No notifications</p>}
      <ul className="space-y-2">
        {notifications.map((note) => (
          <li key={note.id} className="bg-yellow-100 p-2 rounded">
            {note.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
