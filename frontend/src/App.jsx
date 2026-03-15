import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar           from "./components/Navbar";
import ChatBot          from "./components/ChatBot";
import AnnouncementBar  from "./components/AnnouncementBar";
import ClickEffects     from "./components/ClickEffects";
import Home             from "./pages/Home";
import { About }    from "./pages/About";
import Courses      from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import { Login, Register } from "./pages/Auth";
import StudentDashboard    from "./pages/dashboards/StudentDashboard";
import InstructorDashboard from "./pages/dashboards/InstructorDashboard";
import AdminDashboard      from "./pages/dashboards/AdminDashboard";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;
  if (!user)   return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <ClickEffects />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/about"       element={<About />} />
        <Route path="/courses"     element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/login"       element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register"    element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard"   element={
          <ProtectedRoute>
            {user?.role === "admin" ? <Navigate to="/admin" /> :
             user?.role === "instructor" ? <Navigate to="/instructor" /> :
             <Navigate to="/student" />}
          </ProtectedRoute>
        }/>
        <Route path="/student/*"    element={<ProtectedRoute roles={["student"]}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/instructor/*" element={<ProtectedRoute roles={["instructor"]}><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/admin/*"      element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="*"            element={<Navigate to="/" />} />
      </Routes>
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
