// src/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth"; // default export

// Layout (Navbar + Sidebar)
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentAttendance from "./pages/student/Attendance";
import StudentNotifications from "./pages/student/Notifications";

// Teacher pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import ClassControl from "./pages/teacher/ClassControl";
import TeacherAttendance from "./pages/teacher/Attendance";
import Reports from "./pages/teacher/Reports";

// Misc
import NotFound from "./pages/NotFound";

function ProtectedShell() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="w-full p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="p-6">Checking session…</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function RequireRole({ allow, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to="/404" replace />;
  return children;
}

function RedirectHome() {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  return <Navigate to="/student/dashboard" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<RedirectHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Shell */}
        <Route
          element={
            <RequireAuth>
              <ProtectedShell />
            </RequireAuth>
          }
        >
          {/* Student */}
          <Route
            path="/student/dashboard"
            element={<RequireRole allow={["student"]}><StudentDashboard /></RequireRole>}
          />
          <Route
            path="/student/attendance"
            element={<RequireRole allow={["student"]}><StudentAttendance /></RequireRole>}
          />
          <Route
            path="/student/notifications"
            element={<RequireRole allow={["student"]}><StudentNotifications /></RequireRole>}
          />

          {/* Teacher */}
          <Route
            path="/teacher/dashboard"
            element={<RequireRole allow={["teacher", "admin"]}><TeacherDashboard /></RequireRole>}
          />
          <Route
            path="/teacher/class-control"
            element={<RequireRole allow={["teacher", "admin"]}><ClassControl /></RequireRole>}
          />
          <Route
            path="/teacher/attendance"
            element={<RequireRole allow={["teacher", "admin"]}><TeacherAttendance /></RequireRole>}
          />
          <Route
            path="/teacher/reports"
            element={<RequireRole allow={["teacher", "admin"]}><Reports /></RequireRole>}
          />
        </Route>

        {/* Not found */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
