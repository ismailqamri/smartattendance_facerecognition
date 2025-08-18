import React, { useEffect, useState } from 'react';
import { teacherService } from '../services/teacherService';
import { AttendanceChart } from '../components/AttendanceChart';

const Reports = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    teacherService.getAttendanceSummary()
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Reports</h2>
      <AttendanceChart data={summary} />
    </div>
  );
};

export default Reports;
