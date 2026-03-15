import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, useParams } from "react-router-dom";
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
// MY COURSES
// =============================================
function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg,     setMsg]     = useState(null);

  const load = () => {
    api.get("/courses/my").then(r => setCourses(r.data.data || [])).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/courses/${id}`);
      setMsg({ type:"success", text:"Course deleted successfully." });
      load();
    } catch { setMsg({ type:"error", text:"Delete failed." }); }
    setTimeout(() => setMsg(null), 3000);
  };

  const handlePublish = async (course) => {
    try {
      await api.put(`/courses/${course._id}`, { isPublished: !course.isPublished });
      setMsg({ type:"success", text:`Course ${!course.isPublished ? "published" : "unpublished"}!` });
      load();
    } catch { setMsg({ type:"error", text:"Failed to update status." }); }
    setTimeout(() => setMsg(null), 3000);
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div><p>Loading courses...</p></div>;

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"2rem",flexWrap:"wrap",gap:"1rem"}}>
        <div className="dash-page-header" style={{margin:0}}>
          <h1>My Courses</h1>
          <p>{courses.length} course{courses.length !== 1 ? "s" : ""} created</p>
        </div>
        <Link to="/instructor/create" className="btn btn-primary btn-lg">+ Create New Course</Link>
      </div>

      {msg && <div className={`alert alert-${msg.type}`} style={{marginBottom:"1.5rem"}}>{msg.text}</div>}

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"2rem"}}>
        {[
          { icon:"📚", label:"Total Courses",    val: courses.length,                                bg:"#dbeafe" },
          { icon:"✅", label:"Published",        val: courses.filter(c=>c.isPublished).length,      bg:"#dcfce7" },
          { icon:"📝", label:"Drafts",           val: courses.filter(c=>!c.isPublished).length,     bg:"#fef9c3" },
          { icon:"👥", label:"Total Students",   val: courses.reduce((s,c)=>s+(c.enrolledCount||0),0), bg:"#f5f3ff" },
        ].map(s => (
          <div key={s.label} style={{background:"var(--white)",borderRadius:12,padding:"1.25rem",border:"1px solid var(--gray-200)",display:"flex",alignItems:"center",gap:"0.875rem"}}>
            <div style={{width:40,height:40,borderRadius:10,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem"}}>{s.icon}</div>
            <div>
              <div style={{fontSize:"1.5rem",fontWeight:800,lineHeight:1}}>{s.val}</div>
              <div style={{fontSize:"0.75rem",color:"var(--gray-500)",fontWeight:500}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 ? (
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"4rem",textAlign:"center"}}>
          <div style={{fontSize:"4rem",marginBottom:"1rem"}}>📝</div>
          <h3 style={{fontSize:"1.25rem",fontWeight:700,marginBottom:"0.5rem"}}>No courses yet</h3>
          <p style={{color:"var(--gray-500)",marginBottom:"1.5rem"}}>Create your first course and start teaching!</p>
          <Link to="/instructor/create" className="btn btn-primary btn-lg">Create First Course</Link>
        </div>
      ) : (
        <div className="table-wrap">
          <div className="table-toolbar">
            <div>
              <div className="table-title">All Courses</div>
            </div>
            <Link to="/instructor/create" className="btn btn-primary btn-sm">+ New Course</Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Price</th>
                <th>Students</th>
                <th>Lessons</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c._id}>
                  <td>
                    <div style={{display:"flex",alignItems:"center",gap:"0.875rem"}}>
                      <div style={{width:48,height:36,borderRadius:6,overflow:"hidden",flexShrink:0}}>
                        <CourseThumbnail category={c.category} height={36} />
                      </div>
                      <div>
                        <div style={{fontWeight:700,fontSize:"0.875rem",color:"var(--gray-900)",maxWidth:200}}>{c.title}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{c.category}</span></td>
                  <td style={{fontWeight:700}}>{c.price===0?"Free":`$${c.price}`}</td>
                  <td>{c.enrolledCount || 0}</td>
                  <td>{c.lessons?.length || 0}</td>
                  <td>
                    <button onClick={() => handlePublish(c)}
                      className={`badge ${c.isPublished?"badge-green":"badge-orange"}`}
                      style={{border:"none",cursor:"pointer",padding:"0.3rem 0.75rem"}}
                    >{c.isPublished ? "✅ Published" : "📝 Draft"}</button>
                  </td>
                  <td>
                    <div style={{display:"flex",gap:"0.5rem"}}>
                      <Link to={`/instructor/lessons/${c._id}`} className="btn btn-sm btn-ghost">📖 Lessons</Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id, c.title)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// =============================================
// CREATE COURSE
// =============================================
function CreateCourse() {
  const [form, setForm] = useState({ title:"", description:"", category:"Web Development", price:0, isPublished:false });
  const [msg,  setMsg]  = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setMsg(null);
    try {
      await api.post("/courses", form);
      setMsg({ type:"success", text:"🎉 Course created successfully! Add lessons now." });
      setForm({ title:"", description:"", category:"Web Development", price:0, isPublished:false });
    } catch (err) {
      setMsg({ type:"error", text: err.response?.data?.message || "Failed to create course." });
    } finally { setLoading(false); }
  };

  return (
    <div>
      <div className="dash-page-header"><h1>Create New Course</h1><p>Fill in the details to publish your course</p></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:"2rem",alignItems:"start"}}>
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"2rem"}}>
          {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            <div className="form-group">
              <label className="form-label">Course Title *</label>
              <input className="form-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Complete MERN Stack Bootcamp" required />
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-input" rows={5} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="What will students learn? What makes this course unique?" required />
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                  {["Web Development","Data Science","Design","Marketing","Business","Other"].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (USD)</label>
                <input className="form-input" type="number" min={0} max={999} value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} />
                <span className="form-hint">Set 0 for a free course</span>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"1rem",background:"var(--gray-50)",borderRadius:8}}>
              <input type="checkbox" id="publish" checked={form.isPublished} onChange={e=>setForm({...form,isPublished:e.target.checked})} style={{width:16,height:16,accentColor:"var(--blue)"}} />
              <label htmlFor="publish" style={{fontSize:"0.875rem",fontWeight:600,color:"var(--gray-700)",cursor:"pointer"}}>Publish immediately (visible to students)</label>
            </div>
            <div style={{display:"flex",gap:"0.75rem"}}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{flex:1,justifyContent:"center"}}>
                {loading ? "Creating..." : "🚀 Create Course"}
              </button>
              <Link to="/instructor" className="btn btn-ghost btn-lg">Cancel</Link>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",overflow:"hidden",position:"sticky",top:80}}>
          <div style={{height:140,overflow:"hidden"}}>
            <CourseThumbnail category={form.category} height={140} />
          </div>
          <div style={{padding:"1.25rem"}}>
            <span className="badge badge-blue" style={{marginBottom:"0.75rem",display:"inline-block"}}>{form.category}</span>
            <h3 style={{fontWeight:700,fontSize:"1rem",marginBottom:"0.5rem",color:"var(--gray-900)"}}>{form.title || "Course Title Preview"}</h3>
            <p style={{fontSize:"0.8125rem",color:"var(--gray-500)",marginBottom:"1rem",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{form.description || "Course description will appear here..."}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:"1.25rem",fontWeight:800,color:"var(--gray-900)"}}>{form.price===0?"Free":`$${form.price}`}</span>
              <span className={`badge ${form.isPublished?"badge-green":"badge-orange"}`}>{form.isPublished?"Published":"Draft"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================
// UPLOAD LESSONS
// =============================================
function UploadLesson() {
  const { id } = useParams();
  const [course,   setCourse]   = useState(null);
  const [form,     setForm]     = useState({ title:"", content:"", duration:"" });
  const [msg,      setMsg]      = useState(null);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`).then(r => setCourse(r.data.data)).catch(() => {});
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post(`/courses/${id}/lessons`, form);
      setMsg({ type:"success", text:"✅ Lesson added successfully!" });
      setForm({ title:"", content:"", duration:"" });
      api.get(`/courses/${id}`).then(r => setCourse(r.data.data));
    } catch (err) {
      setMsg({ type:"error", text: err.response?.data?.message || "Failed to add lesson." });
    } finally { setLoading(false); setTimeout(() => setMsg(null), 3000); }
  };

  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"2rem"}}>
        <Link to="/instructor" className="btn btn-ghost btn-sm">← Back</Link>
        <div className="dash-page-header" style={{margin:0}}>
          <h1>Upload Lesson</h1>
          <p>{course?.title}</p>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:"2rem",alignItems:"start"}}>
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"2rem"}}>
          {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}
          <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:"1.25rem"}}>
            <div className="form-group">
              <label className="form-label">Lesson Title *</label>
              <input className="form-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Introduction to React Hooks" required />
            </div>
            <div className="form-group">
              <label className="form-label">Lesson Content *</label>
              <textarea className="form-input" rows={8} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write your lesson content here. Explain concepts clearly..." required />
            </div>
            <div className="form-group">
              <label className="form-label">Duration</label>
              <input className="form-input" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} placeholder="e.g. 15 min, 1 hour" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{justifyContent:"center"}}>
              {loading ? "Adding..." : "➕ Add Lesson"}
            </button>
          </form>
        </div>

        {/* Existing lessons */}
        <div style={{background:"var(--white)",borderRadius:16,border:"1px solid var(--gray-200)",padding:"1.5rem"}}>
          <h3 style={{fontWeight:700,fontSize:"0.9375rem",marginBottom:"1rem"}}>Existing Lessons ({course?.lessons?.length || 0})</h3>
          {course?.lessons?.length > 0 ? (
            <div style={{display:"flex",flexDirection:"column",gap:"0.625rem"}}>
              {course.lessons.map((l,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.75rem",background:"var(--gray-50)",borderRadius:8,border:"1px solid var(--gray-200)"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"var(--blue-light)",color:"var(--blue)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"0.75rem",flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1,overflow:"hidden"}}>
                    <div style={{fontWeight:600,fontSize:"0.8125rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{l.title}</div>
                    <div style={{fontSize:"0.75rem",color:"var(--gray-400)"}}>{l.duration||"N/A"}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{color:"var(--gray-400)",fontSize:"0.875rem",textAlign:"center",padding:"2rem 0"}}>No lessons yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InstructorDashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="dashboard">
      <aside className="dash-sidebar">
        <div className="dash-sidebar-header">
          <Link to="/" style={{textDecoration:"none",display:"block",marginBottom:"1.25rem"}}>
            <EduFlowLogo size={26} showText={true} theme="light" />
          </Link>
          <div className="dash-sidebar-role">Instructor Portal</div>
          <div className="dash-sidebar-name">{user?.name}</div>
        </div>
        <div className="dash-section-title">Teaching</div>
        <SidebarLink to="/instructor"        icon="📋" label="My Courses" />
        <SidebarLink to="/instructor/create" icon="➕" label="Create Course" />
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
            <Route index              element={<ManageCourses />} />
            <Route path="create"      element={<CreateCourse />} />
            <Route path="lessons/:id" element={<UploadLesson />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
