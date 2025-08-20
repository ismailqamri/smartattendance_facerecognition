import api from "./api";

const studentService = {
  getAttendance: () => api.get("/students/attendance"),
  getNotifications: () => api.get("/students/notifications"),
};

export default studentService;
