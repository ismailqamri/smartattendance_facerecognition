import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // backend FastAPI URL
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const getAttendance = () => API.get("/attendance");
export const markAttendance = (data) => API.post("/attendance/mark", data);
