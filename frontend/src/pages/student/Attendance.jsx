import React, { useEffect, useState, useContext } from 'react';
import { studentService } from '../services/studentService';
import { AuthContext } from '../context/AuthContext';
import { AttendanceChart } from '../components/AttendanceChart';

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    studentService.getAttendance(user.id)
      .then(res => {
        setAttendanceData(res.data.attendance);
        setSummary(res.data.summary);
      })
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Attendance</h2>
      
      <div className="mb-6">
        <AttendanceChart data={summary} />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Subject</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((att, idx) => (
            <tr key={idx} className="text-center border-t">
              <td>{att.subject}</td>
              <td>{att.date}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
