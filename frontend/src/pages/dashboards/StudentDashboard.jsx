import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { EduFlowLogo } from "../../components/EduFlowLogo";
import CourseThumbnail from "../../components/CourseThumbnail";
import MotivationalQuote from "../../components/MotivationalQuote";

function SidebarLink({ to, icon, label }) {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link to={to} className={`dash-nav-link ${active ? "active" : ""}`}>
      <span style={{fontSize:"1.1rem"}}>{icon}</span><span>{label}</span>
    </Link>
  );
}

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [updating,    setUpdating]    = useState(null);
  const [msg,         setMsg]         = useState(null);

  const load = () => {
    api.get("/enroll/my-courses")
      .then(r => setEnrollments(r.data.data || []))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleProgress = async (courseId, newProgress) => {
    setUpdating(courseId);
    try {
      await api.put("/enroll/progress", { courseId, progress: newProgress });
      setMsg({ type:"success", text:`Progress updated to ${newProgress}%!` });
      load();
    } catch { setMsg({ type:"error", text:"Failed to update." }); }
    finally { setUpdating(null); setTimeout(() => setMsg(null), 3000); }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div><p>Loading courses...</p></div>;

  return (
    <div>
      <div className="dash-page-header">
        <h1>My Learning</h1>
        <p>Track your progress and continue where you left off</p>
      </div>

      {msg && <div className={`alert alert-${msg.type}`} style={{marginBottom:"1.5rem"}}>{msg.text}</div>}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"2rem"}}>
        {[
          { icon:"📚", label:"Enrolled",   val: enrollments.length,                             bg:"#dbeafe" },
          { icon:"✅", label:"Completed",  val: enrollments.filter(e=>e.isCompleted).length,    bg:"#dcfce7" },
          { icon:"⏳", label:"In Progress",val: enrollments.filter(e=>!e.isCompleted).length,   bg:"#fef9c3" },
        ].map(s => (
          <div key={s.label} style={{background:"var(--white)",borderRadius:12,padding:"1.25rem",border:"1px solid var(--gray-200)",display:"flex",alignItems:"center",gap:"1rem"}}>
            <div style={{width:44,height:44,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.25rem"}}>{s.icon}</div>
            <div>
              <div style={{fontSize:"1.75rem",fontWeight:800,lineHeight:1}}>{s.val}</div>
              <div style={{fontSize:"0.8125rem",color:"var(--gray-500)",fontWeight:500}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {enrollments.length === 0 ? (
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"4rem",textAlign:"center"}}>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>📚</div>
          <h3 style={{fontSize:"1.25rem",fontWeight:700,marginBottom:"0.5rem"}}>No courses yet</h3>
          <p style={{color:"var(--gray-500)",marginBottom:"1.5rem"}}>Start learning by enrolling in a course</p>
          <Link to="/courses" className="btn btn-primary btn-lg">Browse Courses</Link>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"1.5rem"}}>
          {enrollments.map(e => (
            <div key={e._id} style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",overflow:"hidden",transition:"box-shadow 0.2s"}}
              onMouseEnter={el=>el.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"}
              onMouseLeave={el=>el.currentTarget.style.boxShadow="none"}
            >
              <div style={{height:120,overflow:"hidden",position:"relative"}}>
                <CourseThumbnail category={e.course?.category} height={120} />
                {e.isCompleted && (
                  <div style={{position:"absolute",top:8,right:8,background:"rgba(22,163,74,0.9)",color:"white",fontSize:"0.75rem",fontWeight:700,padding:"0.25rem 0.625rem",borderRadius:100}}>✅ Completed</div>
                )}
              </div>
              <div style={{padding:"1.25rem"}}>
                <h3 style={{fontWeight:700,fontSize:"0.9375rem",lineHeight:1.3,marginBottom:"0.25rem"}}>{e.course?.title}</h3>
                <p style={{fontSize:"0.8125rem",color:"var(--gray-500)",marginBottom:"1rem"}}>by {e.course?.instructor?.name}</p>
                <div style={{marginBottom:"0.75rem"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.8125rem",marginBottom:"0.375rem"}}>
                    <span style={{color:"var(--gray-600)",fontWeight:500}}>Progress</span>
                    <span style={{fontWeight:800,color:"var(--blue)"}}>{e.progress}%</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-fill" style={{width:`${e.progress}%`}}></div>
                  </div>
                </div>
                <div style={{display:"flex",gap:"0.375rem",marginBottom:"0.75rem"}}>
                  {[25,50,75,100].map(p => (
                    <button key={p} onClick={() => handleProgress(e.course?._id, p)}
                      disabled={updating === e.course?._id || e.progress >= p}
                      style={{flex:1,padding:"0.35rem 0",borderRadius:6,border:`1px solid ${e.progress>=p?"#bbf7d0":"var(--gray-200)"}`,background:e.progress>=p?"var(--green-light)":"var(--gray-50)",color:e.progress>=p?"var(--green)":"var(--gray-600)",fontSize:"0.75rem",fontWeight:700,cursor:e.progress>=p?"default":"pointer",fontFamily:"var(--font-sans)",transition:"all 0.15s"}}
                    >{p}%</button>
                  ))}
                </div>
                <Link to={`/courses/${e.course?._id}`} className="btn btn-primary" style={{width:"100%",justifyContent:"center"}}>
                  {e.isCompleted ? "📖 Review" : "▶ Continue"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Profile() {
  const { user } = useAuth();
  const [form,    setForm]    = useState({ name: user?.name || "", bio: user?.bio || "" });
  const [msg,     setMsg]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.put("/users/profile", form);
      setMsg({ type:"success", text:"Profile updated successfully!" });
    } catch { setMsg({ type:"error", text:"Update failed." }); }
    finally { setLoading(false); setTimeout(() => setMsg(null), 3000); }
  };

  return (
    <div>
      <div className="dash-page-header"><h1>My Profile</h1><p>Manage your account details</p></div>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:"2rem",alignItems:"start"}}>
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"2rem",textAlign:"center"}}>
          <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),#7c3aed)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"2rem",margin:"0 auto 1rem"}}>{user?.name?.charAt(0)}</div>
          <h3 style={{fontWeight:700,marginBottom:"0.25rem"}}>{user?.name}</h3>
          <p style={{fontSize:"0.8125rem",color:"var(--gray-500)",marginBottom:"0.75rem"}}>{user?.email}</p>
          <span className="badge badge-blue" style={{textTransform:"capitalize"}}>{user?.role}</span>
        </div>
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"2rem"}}>
          <h3 style={{fontWeight:700,marginBottom:"1.5rem",paddingBottom:"1rem",borderBottom:"1px solid var(--gray-200)"}}>Edit Profile</h3>
          {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
          <form onSubmit={handleSave} style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" value={user?.email} disabled style={{background:"var(--gray-100)",cursor:"not-allowed"}} />
            </div>
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-input" rows={4} value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} placeholder="Tell us about yourself..." />
            </div>
            <div style={{display:"flex",gap:"0.75rem"}}>
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading?"Saving...":"💾 Save Changes"}</button>
              <button type="button" className="btn btn-ghost" onClick={()=>setForm({name:user?.name||"",bio:user?.bio||""})}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <Link to="/" style={{textDecoration:"none",display:"block",marginBottom:"1.25rem"}}>
            <EduFlowLogo size={26} showText={true} theme="light" />
          </Link>
          <div className="dash-sidebar-role">Student Portal</div>
          <div className="dash-sidebar-name">{user?.name}</div>
        </div>
        <div className="dash-section-title">Learning</div>
        <SidebarLink to="/student"         icon="📚" label="My Courses" />
        <SidebarLink to="/student/profile" icon="👤" label="My Profile" />
        <div className="dash-section-title">Explore</div>
        <Link to="/courses" className="dash-nav-link"><span style={{fontSize:"1.1rem"}}>🔍</span><span>Browse Courses</span></Link>
        <Link to="/"        className="dash-nav-link"><span style={{fontSize:"1.1rem"}}>🏠</span><span>Back to Home</span></Link>
        <div style={{marginTop:"auto",padding:"0.75rem 0",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          <button onClick={logout} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.5625rem 0.75rem",borderRadius:6,color:"rgba(255,100,100,0.8)",fontSize:"0.875rem",fontWeight:500,fontFamily:"var(--font-sans)"}}>
            <span style={{fontSize:"1.1rem"}}>🚪</span><span>Log Out</span>
          </button>
        </div>
      </aside>
      <main className="dash-main">
        <div className="dash-main-inner">
          <Routes>
            <Route index          element={<MyCourses />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
