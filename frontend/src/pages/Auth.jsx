import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// =============================================
// LOGIN PAGE
// =============================================
export function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : user.role === "instructor" ? "/instructor" : "/student");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-layout">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div style={{marginBottom:"2rem"}}>
            <Link to="/" style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"white",fontWeight:800,fontSize:"1.25rem",marginBottom:"2.5rem",textDecoration:"none"}}>
              <div style={{width:32,height:32,background:"rgba(255,255,255,0.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>E</div>
              EduFlow
            </Link>
          </div>
          <h2>Welcome back to <em>learning</em></h2>
          <p>Continue your learning journey and achieve your career goals with EduFlow's world-class courses.</p>
          <div className="auth-left-features">
            {[
              { icon:"🎯", title:"Personalized Learning",  desc:"AI-powered recommendations just for you" },
              { icon:"🏆", title:"Industry Certificates",  desc:"Recognized by 2,000+ companies worldwide" },
              { icon:"👥", title:"Global Community",       desc:"Learn alongside 77M+ learners worldwide" },
            ].map(f => (
              <div key={f.title} className="auth-feature">
                <div className="auth-feature-icon">{f.icon}</div>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-header">
            <h1>Sign in</h1>
            <p>Welcome back! Please enter your credentials.</p>
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label" style={{display:"flex",justifyContent:"space-between"}}>
                <span>Password</span>
                <a href="#" style={{color:"var(--blue)",fontWeight:500,fontSize:"0.8125rem"}}>Forgot password?</a>
              </label>
              <input className="form-input" type="password" placeholder="Enter your password"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",justifyContent:"center",marginTop:"0.5rem"}} disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Quick Login Hint */}
          <div style={{marginTop:"1.5rem",background:"var(--blue-light)",borderRadius:10,padding:"1rem",fontSize:"0.8125rem"}}>
            <strong style={{color:"var(--blue)",display:"block",marginBottom:"0.5rem"}}>🔑 Demo Accounts:</strong>
            <div style={{color:"var(--gray-700)",display:"flex",flexDirection:"column",gap:"0.25rem"}}>
              <span>👑 Admin: admin@lms.com / admin123</span>
              <span>👨‍🏫 Instructor: ali@lms.com / ali123</span>
              <span>🎓 Student: student@lms.com / student123</span>
            </div>
          </div>

          <p className="auth-footer-text">
            New to EduFlow? <Link to="/register">Join for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// =============================================
// REGISTER PAGE
// =============================================
export function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]       = useState({ name:"", email:"", password:"", role:"student" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setError(""); setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      navigate(user.role === "instructor" ? "/instructor" : "/student");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-layout">
      {/* Left Panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" style={{display:"flex",alignItems:"center",gap:"0.5rem",color:"white",fontWeight:800,fontSize:"1.25rem",marginBottom:"2.5rem",textDecoration:"none"}}>
            <div style={{width:32,height:32,background:"rgba(255,255,255,0.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>E</div>
            EduFlow
          </Link>
          <h2>Start your learning <em>journey</em> today</h2>
          <p>Join over 77 million learners and unlock your potential with world-class courses from industry experts.</p>
          <div style={{display:"flex",flexDirection:"column",gap:"1rem",marginTop:"2rem"}}>
            {[
              { icon:"📚", title:"5,400+ Courses Available",     desc:"From beginner to advanced" },
              { icon:"🎓", title:"Earn Verified Certificates",   desc:"Recognized by top companies" },
              { icon:"💼", title:"Advance Your Career",          desc:"87% of learners see career benefits" },
              { icon:"📱", title:"Learn on Any Device",          desc:"Access anywhere, anytime" },
            ].map(f => (
              <div key={f.title} className="auth-feature">
                <div className="auth-feature-icon">{f.icon}</div>
                <div>
                  <strong>{f.title}</strong>
                  <span>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">
          <div className="auth-form-header">
            <h1>Create your account</h1>
            <p>Join EduFlow and start learning today. Free forever.</p>
          </div>

          {error && <div className="alert alert-error">⚠️ {error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div className="form-group">
              <label className="form-label">I want to join as</label>
              <div className="role-selector">
                <div className={`role-option ${form.role==="student"?"selected":""}`} onClick={() => setForm({...form, role:"student"})}>
                  <div className="role-option-icon">🎓</div>
                  <div className="role-option-label">Student</div>
                  <div className="role-option-desc">I want to learn</div>
                </div>
                <div className={`role-option ${form.role==="instructor"?"selected":""}`} onClick={() => setForm({...form, role:"instructor"})}>
                  <div className="role-option-icon">👨‍🏫</div>
                  <div className="role-option-label">Instructor</div>
                  <div className="role-option-desc">I want to teach</div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" type="text" placeholder="Ali Hassan"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="ali@example.com"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Minimum 6 characters"
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{width:"100%",justifyContent:"center",marginTop:"0.5rem"}} disabled={loading}>
              {loading ? "Creating account..." : `Join as ${form.role === "student" ? "Student" : "Instructor"}`}
            </button>

            <p style={{fontSize:"0.75rem",color:"var(--gray-400)",textAlign:"center"}}>
              By joining, you agree to our <a href="#" style={{color:"var(--blue)"}}>Terms of Service</a> and <a href="#" style={{color:"var(--blue)"}}>Privacy Policy</a>
            </p>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
