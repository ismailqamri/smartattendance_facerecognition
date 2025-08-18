import api from './api';

export const studentService = {
  getAttendance: (studentId) => api.get(`/students/${studentId}/attendance`),
};
