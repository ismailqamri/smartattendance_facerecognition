import api from "./api";

const notificationService = {
  getNotifications: () => api.get("/notifications"),
};

export default notificationService;
