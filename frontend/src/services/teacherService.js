import api from "./api";

const teacherService = {
  startClass: (teacherId) => api.post(`/teachers/${teacherId}/class/start`),
  stopClass: (teacherId) => api.post(`/teachers/${teacherId}/class/stop`),
  getAttendance: () => api.get("/teachers/attendance"),
  updateAttendance: (attendanceId, data) =>
    api.put(`/teachers/attendance/${attendanceId}`, data),
  getAttendanceSummary: () => api.get("/teachers/attendance/summary"),
};

export default teacherService;
