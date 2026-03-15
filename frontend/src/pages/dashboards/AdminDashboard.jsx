import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { EduFlowLogo } from "../../components/EduFlowLogo";
import CourseThumbnail from "../../components/CourseThumbnail";

function SidebarLink({ to, icon, label }) {
  const loc = useLocation();
  return (
    <Link to={to} className={`dash-nav-link ${loc.pathname === to ? "active" : ""}`}>
      <span style={{fontSize:"1.1rem"}}>{icon}</span><span>{label}</span>
    </Link>
  );
}

// =============================================
// ANALYTICS
// =============================================
function Analytics() {
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users/analytics").then(r => setStats(r.data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loading"><div className="spinner"></div><p>Loading analytics...</p></div>;

  const statCards = [
    { icon:"👥", label:"Total Users",       val: stats?.totalUsers,       bg:"#dbeafe", color:"var(--blue)" },
    { icon:"🎓", label:"Students",          val: stats?.totalStudents,    bg:"#dcfce7", color:"var(--green)" },
    { icon:"👨‍🏫",label:"Instructors",       val: stats?.totalInstructors, bg:"#f5f3ff", color:"var(--purple)" },
    { icon:"📚", label:"Total Courses",     val: stats?.totalCourses,     bg:"#fef9c3", color:"#b45309" },
    { icon:"✅", label:"Published Courses", val: stats?.publishedCourses, bg:"#dcfce7", color:"var(--green)" },
    { icon:"📝", label:"Enrollments",       val: stats?.totalEnrollments, bg:"#fee2e2", color:"var(--red)" },
  ];

  return (
    <div>
      <div className="dash-page-header"><h1>Platform Analytics</h1><p>Overview of your learning platform performance</p></div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.25rem",marginBottom:"2.5rem"}}>
        {statCards.map(s => (
          <div key={s.label} style={{background:"var(--white)",borderRadius:16,padding:"1.5rem",border:"1px solid var(--gray-200)",boxShadow:"0 1px 3px rgba(0,0,0,0.06)",transition:"all 0.2s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform="none"}
          >
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
              <div style={{width:48,height:48,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem"}}>{s.icon}</div>
              <span style={{fontSize:"0.75rem",fontWeight:600,color:"var(--green)",background:"var(--green-light)",padding:"0.25rem 0.5rem",borderRadius:100}}>↑ Live</span>
            </div>
            <div style={{fontSize:"2.25rem",fontWeight:900,color:"var(--gray-900)",lineHeight:1,marginBottom:"0.375rem"}}>{s.val ?? 0}</div>
            <div style={{fontSize:"0.8125rem",color:"var(--gray-500)",fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"2rem",marginBottom:"2rem"}}>
        <h3 style={{fontWeight:700,fontSize:"1rem",marginBottom:"1.5rem"}}>Quick Actions</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
          {[
            { icon:"👥", label:"Manage Users",   to:"/admin/users",   color:"var(--blue)" },
            { icon:"📚", label:"Manage Courses", to:"/admin/courses", color:"var(--purple)" },
            { icon:"🔍", label:"Browse Courses", to:"/courses",       color:"var(--teal)" },
          ].map(a => (
            <Link key={a.label} to={a.to} style={{display:"flex",alignItems:"center",gap:"0.875rem",padding:"1.25rem",borderRadius:12,border:"1.5px solid var(--gray-200)",textDecoration:"none",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color;e.currentTarget.style.background="var(--gray-50)"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--gray-200)";e.currentTarget.style.background="transparent"}}
            >
              <div style={{fontSize:"1.5rem"}}>{a.icon}</div>
              <span style={{fontWeight:700,color:"var(--gray-900)",fontSize:"0.9375rem"}}>{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Platform Health */}
      <div style={{background:"linear-gradient(135deg,#0a1628,#0d2461)",borderRadius:16,padding:"2rem",color:"white"}}>
        <h3 style={{fontWeight:700,marginBottom:"1.5rem",fontSize:"1rem",opacity:0.9}}>📊 Platform Health</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem"}}>
          {[
            { label:"Course Publish Rate", val: stats?.totalCourses > 0 ? Math.round((stats?.publishedCourses/stats?.totalCourses)*100) : 0, color:"#60a5fa" },
            { label:"Student Enrollment Rate", val: stats?.totalUsers > 0 ? Math.round((stats?.totalStudents/stats?.totalUsers)*100) : 0, color:"#34d399" },
          ].map(m => (
            <div key={m.label}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.875rem",marginBottom:"0.5rem"}}>
                <span style={{opacity:0.75}}>{m.label}</span>
                <span style={{fontWeight:800,color:m.color}}>{m.val}%</span>
              </div>
              <div style={{height:8,background:"rgba(255,255,255,0.1)",borderRadius:100,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${m.val}%`,background:m.color,borderRadius:100,transition:"width 1s ease"}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================
// MANAGE USERS
// =============================================
function ManageUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");
  const [msg,     setMsg]     = useState(null);

  const load = () => api.get("/users").then(r => setUsers(r.data.data || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete user "${name}"? This is permanent.`)) return;
    try {
      await api.delete(`/users/${id}`);
      setMsg({ type:"success", text:`User "${name}" deleted.` });
      load();
    } catch (err) { setMsg({ type:"error", text: err.response?.data?.message || "Delete failed." }); }
    setTimeout(() => setMsg(null), 3000);
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.role === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="dash-page-header"><h1>Manage Users</h1><p>{users.length} registered users</p></div>
      {msg && <div className={`alert alert-${msg.type}`} style={{marginBottom:"1.5rem"}}>{msg.text}</div>}

      <div className="table-wrap">
        <div className="table-toolbar">
          <div>
            <div className="table-title">All Users</div>
          </div>
          <div style={{display:"flex",gap:"0.75rem",flexWrap:"wrap"}}>
            <div className="search-bar" style={{minWidth:220}}>
              <span style={{color:"var(--gray-400)"}}>🔍</span>
              <input type="text" placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <div className="filter-tabs">
              {["All","Student","Instructor","Admin"].map(f => (
                <button key={f} className={`filter-tab ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{textAlign:"center",padding:"3rem",color:"var(--gray-400)"}}>No users found</td></tr>
            ) : filtered.map(u => (
              <tr key={u._id}>
                <td>
                  <div className="td-user">
                    <div className="td-avatar">{u.name?.charAt(0)}</div>
                    <div>
                      <div style={{fontWeight:700,color:"var(--gray-900)"}}>{u.name}</div>
                    </div>
                  </div>
                </td>
                <td style={{color:"var(--gray-500)"}}>{u.email}</td>
                <td>
                  <span className={`badge ${u.role==="admin"?"badge-purple":u.role==="instructor"?"badge-blue":"badge-green"}`} style={{textTransform:"capitalize"}}>
                    {u.role==="admin"?"👑":u.role==="instructor"?"👨‍🏫":"🎓"} {u.role}
                  </span>
                </td>
                <td style={{color:"var(--gray-500)",fontSize:"0.8125rem"}}>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  {u.role !== "admin"
                    ? <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id, u.name)}>🗑️ Delete</button>
                    : <span style={{fontSize:"0.8125rem",color:"var(--gray-400)"}}>Protected</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =============================================
// MANAGE COURSES
// =============================================
function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [msg,     setMsg]     = useState(null);

  const load = () => api.get("/courses/all").then(r => setCourses(r.data.data || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await api.delete(`/courses/${id}`);
      setMsg({ type:"success", text:"Course deleted." });
      load();
    } catch { setMsg({ type:"error", text:"Delete failed." }); }
    setTimeout(() => setMsg(null), 3000);
  };

  const handleTogglePublish = async (course) => {
    try {
      await api.put(`/courses/${course._id}`, { isPublished: !course.isPublished });
      load();
    } catch {}
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.instructor?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="page-loading"><div className="spinner"></div></div>;

  return (
    <div>
      <div className="dash-page-header"><h1>Manage Courses</h1><p>{courses.length} total courses</p></div>
      {msg && <div className={`alert alert-${msg.type}`} style={{marginBottom:"1.5rem"}}>{msg.text}</div>}

      <div className="table-wrap">
        <div className="table-toolbar">
          <div className="table-title">All Courses</div>
          <div className="search-bar" style={{minWidth:260}}>
            <span style={{color:"var(--gray-400)"}}>🔍</span>
            <input type="text" placeholder="Search courses..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Course</th><th>Instructor</th><th>Category</th><th>Students</th><th>Price</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} style={{textAlign:"center",padding:"3rem",color:"var(--gray-400)"}}>No courses found</td></tr>
            ) : filtered.map(c => (
              <tr key={c._id}>
                <td>
                  <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
                    <div style={{width:48,height:36,borderRadius:6,overflow:"hidden",flexShrink:0}}>
                      <CourseThumbnail category={c.category} height={36} />
                    </div>
                    <span style={{fontWeight:700,maxWidth:180,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.title}</span>
                  </div>
                </td>
                <td style={{color:"var(--gray-600)"}}>{c.instructor?.name}</td>
                <td><span className="badge badge-blue">{c.category}</span></td>
                <td>{c.enrolledCount || 0}</td>
                <td style={{fontWeight:700}}>{c.price===0?"Free":`$${c.price}`}</td>
                <td>
                  <button onClick={() => handleTogglePublish(c)}
                    className={`badge ${c.isPublished?"badge-green":"badge-orange"}`}
                    style={{border:"none",cursor:"pointer"}}
                  >{c.isPublished?"✅ Live":"📝 Draft"}</button>
                </td>
                <td>
                  <div style={{display:"flex",gap:"0.5rem"}}>
                    <Link to={`/courses/${c._id}`} className="btn btn-sm btn-ghost">👁️</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id, c.title)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <Link to="/" style={{textDecoration:"none",display:"block",marginBottom:"1.25rem"}}>
            <EduFlowLogo size={26} showText={true} theme="light" />
          </Link>
          <div className="dash-sidebar-role">Admin Portal</div>
          <div className="dash-sidebar-name">{user?.name}</div>
        </div>
        <div className="dash-section-title">Dashboard</div>
        <SidebarLink to="/admin"         icon="📊" label="Analytics" />
        <SidebarLink to="/admin/users"   icon="👥" label="Manage Users" />
        <SidebarLink to="/admin/courses" icon="📚" label="Manage Courses" />
        <div className="dash-section-title">Navigation</div>
        <Link to="/courses" className="dash-nav-link"><span style={{fontSize:"1.1rem"}}>🔍</span><span>Browse Courses</span></Link>
        <Link to="/"        className="dash-nav-link"><span style={{fontSize:"1.1rem"}}>🏠</span><span>Back to Home</span></Link>
        <div style={{marginTop:"auto",padding:"0.75rem 0",borderTop:"1px solid rgba(255,255,255,0.08)"}}>
          <button onClick={logout} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.5625rem 0.75rem",borderRadius:6,color:"rgba(255,100,100,0.8)",fontSize:"0.875rem",fontFamily:"var(--font-sans)"}}>
            <span style={{fontSize:"1.1rem"}}>🚪</span><span>Log Out</span>
          </button>
        </div>
      </aside>
      <main className="dash-main">
        <div className="dash-main-inner">
          <Routes>
            <Route index          element={<Analytics />} />
            <Route path="users"   element={<ManageUsers />} />
            <Route path="courses" element={<ManageCourses />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
