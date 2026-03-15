import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import MotivationalQuote from "../components/MotivationalQuote";

const THUMBS = {
  "Web Development": { bg:"linear-gradient(135deg,#1e3a5f,#0d2461)", emoji:"💻" },
  "Data Science":    { bg:"linear-gradient(135deg,#065f46,#047857)", emoji:"📊" },
  "Design":          { bg:"linear-gradient(135deg,#4c1d95,#6d28d9)", emoji:"🎨" },
  "Marketing":       { bg:"linear-gradient(135deg,#7c2d12,#c2410c)", emoji:"📣" },
  "Business":        { bg:"linear-gradient(135deg,#1e3a5f,#1d4ed8)", emoji:"💼" },
  "Other":           { bg:"linear-gradient(135deg,#1f2937,#374151)", emoji:"📚" },
};

export default function CourseDetail() {
  const { id }     = useParams();
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const [course,    setCourse]   = useState(null);
  const [loading,   setLoading]  = useState(true);
  const [enrolling, setEnrolling]= useState(false);
  const [message,   setMessage]  = useState(null);
  const [expanded,  setExpanded] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then(r => setCourse(r.data.data))
      .catch(() => navigate("/courses"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return navigate("/login");
    if (user.role !== "student") return setMessage({ type:"error", text:"Only students can enroll in courses." });
    setEnrolling(true);
    try {
      await api.post("/enroll", { courseId: id });
      setMessage({ type:"success", text:"🎉 Successfully enrolled! Go to your dashboard to start learning." });
    } catch (err) {
      setMessage({ type:"error", text: err.response?.data?.message || "Enrollment failed. Please try again." });
    } finally { setEnrolling(false); }
  };

  if (loading) return <div className="page-loading"><div className="spinner"></div><p>Loading course...</p></div>;
  if (!course) return null;

  const thumb = THUMBS[course.category] || THUMBS["Other"];
  const totalDuration = course.lessons?.reduce((acc, l) => acc + parseInt(l.duration) || 0, 0) || 0;

  return (
    <div>
      {/* Hero */}
      <div className="course-detail-hero">
        <div className="course-detail-inner">
          <div>
            {/* Breadcrumb */}
            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.8125rem",color:"rgba(255,255,255,0.6)",marginBottom:"1rem"}}>
              <Link to="/" style={{color:"#60a5fa"}}>Home</Link>
              <span>›</span>
              <Link to="/courses" style={{color:"#60a5fa"}}>Courses</Link>
              <span>›</span>
              <span>{course.category}</span>
            </div>

            <span className="badge badge-blue" style={{marginBottom:"1rem",display:"inline-block"}}>{course.category}</span>
            <h1 className="course-detail-hero" style={{fontFamily:"var(--font-serif)",fontSize:"2rem",fontWeight:400,lineHeight:1.3,color:"white",marginBottom:"1rem"}}>{course.title}</h1>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:"1rem",lineHeight:1.7,marginBottom:"1.25rem",maxWidth:640}}>{course.description}</p>

            <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.25rem",flexWrap:"wrap"}}>
              <span style={{color:"#fbbf24",fontSize:"0.875rem"}}>★★★★★</span>
              <span style={{color:"#fbbf24",fontWeight:800,fontSize:"0.875rem"}}>4.8</span>
              <span style={{color:"rgba(255,255,255,0.5)",fontSize:"0.8125rem"}}>(12,483 ratings)</span>
              <span style={{color:"rgba(255,255,255,0.5)",fontSize:"0.8125rem"}}>·</span>
              <span style={{color:"rgba(255,255,255,0.75)",fontSize:"0.875rem"}}>{course.enrolledCount || 0} students</span>
            </div>

            <div style={{display:"flex",flexWrap:"wrap",gap:"1.25rem",fontSize:"0.875rem",color:"rgba(255,255,255,0.7)"}}>
              <span>👤 Created by <strong style={{color:"#60a5fa"}}>{course.instructor?.name}</strong></span>
              <span>📖 {course.lessons?.length || 0} lessons</span>
              <span>⏱️ {totalDuration} minutes total</span>
              <span>🌐 English</span>
              <span>🔄 Last updated 2024</span>
            </div>
          </div>

          {/* Enroll Card */}
          <div className="course-enroll-card">
            <div className="course-enroll-thumb" style={{background: thumb.bg}}>
              <span style={{fontSize:"4rem"}}>{thumb.emoji}</span>
            </div>
            <div className="course-enroll-body">
              <div className="course-enroll-price" style={{color:"var(--gray-900)"}}>
                {course.price === 0 ? <span style={{color:"var(--green)"}}>Free</span> : `$${course.price}`}
              </div>

              {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

              <button className="btn btn-primary btn-lg" style={{width:"100%",justifyContent:"center",marginBottom:"0.75rem"}} onClick={handleEnroll} disabled={enrolling}>
                {enrolling ? "Enrolling..." : course.price === 0 ? "Enroll for Free" : "Enroll Now"}
              </button>
              <button className="btn btn-ghost btn-lg" style={{width:"100%",justifyContent:"center",marginBottom:"1.25rem"}}>
                Try for Free
              </button>

              <p style={{fontSize:"0.75rem",color:"var(--gray-400)",textAlign:"center",marginBottom:"1.25rem"}}>
                30-Day Money-Back Guarantee
              </p>

              <div style={{display:"flex",flexDirection:"column",gap:"0.625rem"}}>
                {[
                  `📖 ${course.lessons?.length || 0} lessons`,
                  `⏱️ ${totalDuration} minutes of content`,
                  "📱 Access on mobile and desktop",
                  "🏆 Certificate of completion",
                  "♾️ Full lifetime access",
                ].map(f => (
                  <div key={f} style={{display:"flex",alignItems:"center",gap:"0.625rem",fontSize:"0.875rem",color:"var(--gray-700)"}}>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div style={{background:"var(--white)",padding:"3rem 2rem"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>

          {/* What you'll learn */}
          <div style={{background:"var(--gray-50)",border:"1px solid var(--gray-200)",borderRadius:12,padding:"2rem",marginBottom:"2.5rem"}}>
            <h2 style={{fontFamily:"var(--font-serif)",fontSize:"1.5rem",fontWeight:400,marginBottom:"1.25rem"}}>What you'll learn</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.75rem"}}>
              {[
                "Build full-stack web applications",
                "Work with MongoDB databases",
                "Create REST APIs with Express",
                "Build dynamic UIs with React",
                "Implement JWT Authentication",
                "Deploy to production servers",
                "Write clean, maintainable code",
                "Follow industry best practices",
              ].map(item => (
                <div key={item} style={{display:"flex",alignItems:"flex-start",gap:"0.625rem",fontSize:"0.875rem",color:"var(--gray-700)"}}>
                  <span style={{color:"var(--green)",fontWeight:700,flexShrink:0}}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Course Curriculum */}
          <h2 style={{fontFamily:"var(--font-serif)",fontSize:"1.5rem",fontWeight:400,marginBottom:"0.5rem"}}>Course Content</h2>
          <p style={{fontSize:"0.875rem",color:"var(--gray-500)",marginBottom:"1.25rem"}}>
            {course.lessons?.length || 0} lessons · {totalDuration} min total length
          </p>

          {course.lessons?.length > 0 ? (
            <div style={{border:"1px solid var(--gray-200)",borderRadius:12,overflow:"hidden"}}>
              {course.lessons.map((lesson, i) => (
                <div key={i} style={{borderBottom: i < course.lessons.length-1 ? "1px solid var(--gray-100)" : "none"}}>
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1rem 1.25rem",background:"none",border:"none",cursor:"pointer",textAlign:"left",transition:"background 0.15s"}}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--gray-50)"}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                      <div style={{width:32,height:32,borderRadius:"50%",background:"var(--blue-light)",color:"var(--blue)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"0.8125rem",flexShrink:0}}>
                        {i+1}
                      </div>
                      <div>
                        <div style={{fontWeight:600,fontSize:"0.9375rem",color:"var(--gray-900)"}}>{lesson.title}</div>
                        <div style={{fontSize:"0.75rem",color:"var(--gray-400)",marginTop:"0.125rem"}}>{lesson.duration || "N/A"}</div>
                      </div>
                    </div>
                    <span style={{color:"var(--gray-400)",transition:"transform 0.2s",transform: expanded===i ? "rotate(180deg)" : "none"}}>▼</span>
                  </button>
                  {expanded === i && (
                    <div style={{padding:"0 1.25rem 1.25rem 4rem",fontSize:"0.875rem",color:"var(--gray-600)",lineHeight:1.7}}>
                      {lesson.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{textAlign:"center",padding:"3rem",color:"var(--gray-400)",border:"1px solid var(--gray-200)",borderRadius:12}}>
              <div style={{fontSize:"3rem",marginBottom:"1rem"}}>📝</div>
              <p>No lessons added yet. Check back soon!</p>
            </div>
          )}

          {/* Instructor */}
          <div style={{marginTop:"3rem",paddingTop:"2.5rem",borderTop:"1px solid var(--gray-200)"}}>
            <h2 style={{fontFamily:"var(--font-serif)",fontSize:"1.5rem",fontWeight:400,marginBottom:"1.5rem"}}>Your Instructor</h2>
            <div style={{display:"flex",gap:"1.5rem",alignItems:"flex-start"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),#7c3aed)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"1.5rem",flexShrink:0}}>
                {course.instructor?.name?.charAt(0)}
              </div>
              <div>
                <h3 style={{fontWeight:700,fontSize:"1.125rem",marginBottom:"0.25rem"}}>{course.instructor?.name}</h3>
                <p style={{fontSize:"0.875rem",color:"var(--gray-500)",marginBottom:"0.75rem"}}>{course.instructor?.bio || "Experienced instructor at EduFlow"}</p>
                <div style={{display:"flex",gap:"1.5rem",fontSize:"0.8125rem",color:"var(--gray-500)"}}>
                  <span>⭐ 4.8 Instructor Rating</span>
                  <span>👥 {course.enrolledCount || 0} Students</span>
                  <span>📚 {1} Course</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MotivationalQuote />
      <Footer />
    </div>
  );
}
