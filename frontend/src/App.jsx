import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Components
import Navbar          from "./components/Navbar";
import ChatBot         from "./components/ChatBot";
import AnnouncementBar from "./components/AnnouncementBar";
import ClickEffects    from "./components/ClickEffects";

// Routes
import ProtectedRoute  from "./routes/ProtectedRoute";

// Public Pages
import Home         from "./pages/Home";
import { About }    from "./pages/About";
import Courses      from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import { Login, Register } from "./pages/Auth";

// Dashboard Pages
import StudentDashboard    from "./pages/dashboards/StudentDashboard";
import InstructorDashboard from "./pages/dashboards/InstructorDashboard";
import AdminDashboard      from "./pages/dashboards/AdminDashboard";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <ClickEffects />

      <Routes>
        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/courses"     element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        {/* ===== AUTH ROUTES ===== */}
        <Route path="/login"    element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* ===== DASHBOARD REDIRECT ===== */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {user?.role === "admin"      ? <Navigate to="/admin"      replace /> :
             user?.role === "instructor" ? <Navigate to="/instructor" replace /> :
                                          <Navigate to="/student"    replace />}
          </ProtectedRoute>
        }/>

        {/* ===== STUDENT ROUTES ===== */}
        <Route path="/student/*" element={
          <ProtectedRoute roles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }/>

        {/* ===== INSTRUCTOR ROUTES ===== */}
        <Route path="/instructor/*" element={
          <ProtectedRoute roles={["instructor"]}>
            <InstructorDashboard />
          </ProtectedRoute>
        }/>

        {/* ===== ADMIN ROUTES ===== */}
        <Route path="/admin/*" element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>

        {/* ===== 404 FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* AI Chatbot — visible on all pages */}
      <ChatBot />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
