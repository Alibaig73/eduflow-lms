import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EduFlowLogo } from "./EduFlowLogo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";
  const dashPath = user?.role === "admin" ? "/admin" : user?.role === "instructor" ? "/instructor" : "/student";

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" style={{textDecoration:"none"}}>
          <EduFlowLogo size={36} showText={true} theme="dark" />
        </Link>

        <div className="nav-links">
          <Link to="/"        className={isActive("/")}>Home</Link>
          <Link to="/courses" className={isActive("/courses")}>Explore</Link>
          <Link to="/about"   className={isActive("/about")}>About</Link>
        </div>

        <div className="nav-search">
          <span style={{color:"var(--gray-400)",fontSize:"0.875rem"}}>🔍</span>
          <input type="text" placeholder="Search courses..." />
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to={dashPath} className="nav-user-btn">
                <div className="nav-avatar">{user.name.charAt(0).toUpperCase()}</div>
                <span>{user.name.split(" ")[0]}</span>
              </Link>
              <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login"    className="btn btn-ghost btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Join for Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
