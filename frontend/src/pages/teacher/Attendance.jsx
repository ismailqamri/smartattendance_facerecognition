import React, { useEffect, useState } from 'react';
import { teacherService } from '../services/teacherService';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    teacherService.getAttendance()
      .then(res => setAttendance(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleEdit = (id) => setEditing(editing === id ? null : id);

  const updateStatus = (id, status) => {
    teacherService.updateAttendance(id, { status })
      .then(() => {
        setAttendance(prev => prev.map(a => a.id === id ? { ...a, status } : a));
        setEditing(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Student</th>
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((att) => (
            <tr key={att.id} className="text-center border-t">
              <td>{att.studentName}</td>
              <td>{att.subject}</td>
              <td>{att.date}</td>
              <td>
                {editing === att.id ? (
                  <select defaultValue={att.status} onChange={(e) => updateStatus(att.id, e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                ) : att.status}
              </td>
              <td>
                <button onClick={() => toggleEdit(att.id)} className="text-blue-500">
                  {editing === att.id ? 'Cancel' : 'Edit'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
