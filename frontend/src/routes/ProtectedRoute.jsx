// =============================================
// routes/ProtectedRoute.jsx
// Protects routes based on auth & role
// =============================================
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loading">
        <div className="spinner"></div>
        <p style={{color:"var(--gray-500)",marginTop:"1rem"}}>Loading...</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → redirect to home
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
