import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard' },
    { name: 'Attendance', path: '/student/attendance' },
    { name: 'Notifications', path: '/student/notifications' },
  ];

  const teacherLinks = [
    { name: 'Dashboard', path: '/teacher/dashboard' },
    { name: 'Class Control', path: '/teacher/class-control' },
    { name: 'Attendance', path: '/teacher/attendance' },
    { name: 'Reports', path: '/teacher/reports' },
  ];

  const links = role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <aside className="w-64 bg-gray-100 h-screen p-6 sticky top-0">
      <ul className="flex flex-col gap-4">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
