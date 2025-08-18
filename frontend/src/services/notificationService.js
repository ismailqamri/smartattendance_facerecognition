import api from './api';

export const notificationService = {
  getNotifications: (userId) => api.get(`/notifications/${userId}`),
};
