import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import MotivationalQuote from "../components/MotivationalQuote";

const CATEGORIES = [
  { label:"Data Science",    emoji:"📊", count:"425 courses" },
  { label:"Business",        emoji:"💼", count:"1,095 courses" },
  { label:"Web Development", emoji:"💻", count:"782 courses" },
  { label:"Design",          emoji:"🎨", count:"334 courses" },
  { label:"Marketing",       emoji:"📣", count:"246 courses" },
];

const TESTIMONIALS = [
  { name:"Sarah Johnson", role:"Software Engineer at Google", text:"EduFlow completely transformed my career. I went from a junior developer to a senior engineer in just 18 months.", avatar:"SJ" },
  { name:"Ahmed Raza",    role:"Data Analyst at Microsoft",   text:"The quality of courses here is unmatched. The instructors are real industry professionals who know their stuff.", avatar:"AR" },
  { name:"Maria Garcia",  role:"UX Designer at Apple",        text:"I enrolled in the Design Masterclass and landed my dream job within 3 months. Absolutely worth every penny!", avatar:"MG" },
];

const HERO_TEXTS = [
  { line1: "Learn", line2: "Without", line3: "Limits" },
  { line1: "Build", line2: "Your",    line3: "Future" },
  { line1: "Master",line2: "New",     line3: "Skills" },
  { line1: "Launch",line2: "Your",    line3: "Career" },
];

export default function Home() {
  const [courses,  setCourses]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);
  const [animating,setAnimating]= useState(false);

  // Fetch courses directly from backend
  useEffect(() => {
    setLoading(true);
    api.get("/courses")
      
      .then(r => { const d = r.data;
        const list = d?.data || d?.courses || [];
        setCourses(Array.isArray(list) ? list.slice(0, 8) : []);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate hero text every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setSlideIdx(i => (i + 1) % HERO_TEXTS.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              🏆 Rated #1 Online Learning Platform 2026
            </div>
            <h1 style={{
              fontFamily:"var(--font-serif)",
              fontSize:"clamp(2.5rem, 4.5vw, 3.75rem)",
              color:"var(--white)", lineHeight:1.15,
              marginBottom:"1.25rem", fontWeight:400,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(-10px)" : "translateY(0)",
            }}>
              {HERO_TEXTS[slideIdx].line1}{" "}
              <em style={{fontStyle:"italic", color:"#60a5fa"}}>
                {HERO_TEXTS[slideIdx].line2}
              </em>
              <br/>{HERO_TEXTS[slideIdx].line3}
            </h1>
            <p className="hero-desc">
              Start, switch, or advance your career with more than 5,400 courses, Professional Certificates, and degrees from world-class universities and companies.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary btn-xl">Explore Courses</Link>
              <Link to="/register" className="btn btn-xl" style={{background:"rgba(255,255,255,0.15)",color:"white",border:"1.5px solid rgba(255,255,255,0.3)"}}>
                Try for Free
              </Link>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item"><strong>77M+</strong><span>Learners</span></div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-item"><strong>5,400+</strong><span>Courses</span></div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-item"><strong>275+</strong><span>Universities</span></div>
              <div className="hero-trust-divider"></div>
              <div className="hero-trust-item"><strong>92%</strong><span>Job Success</span></div>
            </div>
          </div>

          {/* Hero Card */}
          <div style={{position:"relative"}}>
            <div className="hero-card">
              <div className="hero-card-thumb">💻</div>
              <h3 className="hero-card-title" style={{color:"var(--gray-900)"}}>Complete MERN Stack Bootcamp</h3>
              <p className="hero-card-meta">Ali Hassan · 5 lessons · 2.5 hours</p>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"0.75rem"}}>
                <span style={{color:"#f59e0b",fontSize:"0.875rem"}}>★★★★★</span>
                <span style={{fontSize:"0.8125rem",fontWeight:700,color:"#b45309"}}>4.9</span>
                <span style={{fontSize:"0.8125rem",color:"var(--gray-500)"}}>(12,483)</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:"1.5rem",fontWeight:800,color:"var(--gray-900)"}}>$49</div>
                <Link to="/courses" className="btn btn-primary btn-sm">Enroll Now</Link>
              </div>
            </div>
            <div style={{background:"white",borderRadius:10,padding:"0.625rem 0.875rem",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.8125rem",fontWeight:600,position:"absolute",bottom:-20,left:-30,animation:"float 3s ease-in-out infinite"}}>
              🎓 <span>2,000+ students enrolled today</span>
            </div>
            <div style={{background:"white",borderRadius:10,padding:"0.625rem 0.875rem",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",gap:"0.5rem",fontSize:"0.8125rem",fontWeight:600,position:"absolute",top:20,left:-40,animation:"float 3s ease-in-out 1.5s infinite"}}>
              ⭐ <span>Rated 4.9/5 by learners</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <div className="partners">
        <div className="partners-inner">
          <p className="partners-label">Trusted by leading companies worldwide</p>
          <div className="partners-logos">
            {["Google","Microsoft","Amazon","Meta","IBM","Salesforce","Adobe","Intel"].map(p => (
              <div key={p} className="partner-logo">{p}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CATEGORIES ===== */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header-row">
            <div className="section-header" style={{marginBottom:0}}>
              <h2>Browse Top Categories</h2>
              <p>Choose from hundreds of courses across all categories</p>
            </div>
            <Link to="/courses" className="btn btn-ghost">View all →</Link>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"1rem",marginTop:"2rem"}}>
            {CATEGORIES.map(cat => (
              <Link to={`/courses?category=${cat.label}`} key={cat.label}
                style={{background:"var(--white)",borderRadius:12,border:"1.5px solid var(--gray-200)",padding:"1.5rem",display:"flex",flexDirection:"column",gap:"0.5rem",transition:"all 0.2s",textDecoration:"none",cursor:"pointer"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--blue)";e.currentTarget.style.boxShadow="0 4px 16px rgba(0,86,210,0.12)";e.currentTarget.style.transform="translateY(-2px)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--gray-200)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none"}}
              >
                <span style={{fontSize:"2rem"}}>{cat.emoji}</span>
                <strong style={{fontSize:"0.9375rem",fontWeight:700,color:"var(--gray-900)"}}>{cat.label}</strong>
                <span style={{fontSize:"0.8125rem",color:"var(--gray-500)"}}>{cat.count}</span>
              </Link>
            ))}
            <Link to="/courses"
              style={{background:"linear-gradient(135deg,var(--blue),#7c3aed)",borderRadius:12,padding:"1.5rem",display:"flex",flexDirection:"column",gap:"0.5rem",textDecoration:"none",cursor:"pointer"}}
            >
              <span style={{fontSize:"2rem"}}>🔍</span>
              <strong style={{fontSize:"0.9375rem",fontWeight:700,color:"white"}}>View All</strong>
              <span style={{fontSize:"0.8125rem",color:"rgba(255,255,255,0.7)"}}>5,400+ courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MOST POPULAR COURSES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header-row" style={{marginBottom:"2rem"}}>
            <div className="section-header" style={{marginBottom:0}}>
              <h2>Most Popular Courses</h2>
              <p>Join millions of learners from around the world</p>
            </div>
            <Link to="/courses" className="btn btn-ghost">View all courses →</Link>
          </div>

          {loading ? (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(272px,1fr))",gap:"1.5rem"}}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{background:"var(--gray-100)",borderRadius:16,height:320,animation:"pulse 1.5s ease-in-out infinite"}}>
                  <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
                </div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="courses-grid">
              {courses.map((c,i) => <CourseCard key={c._id} course={c} index={i} />)}
            </div>
          ) : (
            <div style={{textAlign:"center",padding:"4rem",background:"var(--gray-50)",borderRadius:16,border:"2px dashed var(--gray-200)"}}>
              <div style={{fontSize:"3rem",marginBottom:"1rem"}}>📚</div>
              <h3 style={{fontWeight:700,marginBottom:"0.5rem"}}>No courses yet</h3>
              <p style={{color:"var(--gray-500)",marginBottom:"1.5rem"}}>
                Run <code style={{background:"var(--gray-200)",padding:"0.2rem 0.5rem",borderRadius:4,fontFamily:"monospace"}}>node seeder.js</code> in your backend to add sample courses
              </p>
              <Link to="/register" className="btn btn-primary">Become an Instructor</Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY EDUFLOW ===== */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header" style={{textAlign:"center",maxWidth:600,margin:"0 auto 3rem"}}>
            <h2>Why Learners Choose EduFlow</h2>
            <p>We provide the tools and support you need to grow — personally, professionally, and financially.</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.5rem"}}>
            {[
              { icon:"🎯", title:"Industry-Recognized Certificates", desc:"Earn credentials that employers recognize and trust. 87% of EduFlow learners report career benefits." },
              { icon:"🧑‍💻", title:"Learn at Your Own Pace",          desc:"On-demand courses accessible 24/7 on any device. Learn when, where, and how you want." },
              { icon:"🏆", title:"World-Class Instructors",          desc:"Learn from experts at Google, IBM, Meta, and top universities with real-world experience." },
              { icon:"🤝", title:"Hands-On Projects",                desc:"Apply your skills with guided projects and build a portfolio that gets you hired." },
            ].map(f => (
              <div key={f.title} style={{background:"var(--white)",borderRadius:16,padding:"2rem",border:"1px solid var(--gray-200)",boxShadow:"var(--shadow-xs)",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow-md)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-xs)"}}
              >
                <div style={{fontSize:"2.5rem",marginBottom:"1rem"}}>{f.icon}</div>
                <h3 style={{fontWeight:700,fontSize:"1rem",marginBottom:"0.625rem",color:"var(--gray-900)"}}>{f.title}</h3>
                <p style={{fontSize:"0.875rem",color:"var(--gray-500)",lineHeight:1.7}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{textAlign:"center",maxWidth:600,margin:"0 auto 3rem"}}>
            <h2>What Our Learners Say</h2>
            <p>Real stories from real people who transformed their careers with EduFlow</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{background:"var(--white)",borderRadius:16,padding:"2rem",border:"1px solid var(--gray-200)",boxShadow:"var(--shadow-sm)",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="var(--shadow-md)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="var(--shadow-sm)"}}
              >
                <div style={{color:"#f59e0b",fontSize:"1.25rem",marginBottom:"1rem",letterSpacing:2}}>★★★★★</div>
                <p style={{fontSize:"0.9375rem",color:"var(--gray-700)",lineHeight:1.7,marginBottom:"1.5rem",fontStyle:"italic"}}>"{t.text}"</p>
                <div style={{display:"flex",alignItems:"center",gap:"0.875rem"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,var(--blue),#7c3aed)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:"0.875rem"}}>{t.avatar}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:"0.9rem",color:"var(--gray-900)"}}>{t.name}</div>
                    <div style={{fontSize:"0.8125rem",color:"var(--gray-500)"}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MOTIVATIONAL QUOTES ===== */}
      <MotivationalQuote />

      {/* ===== CTA ===== */}
      <section style={{background:"linear-gradient(135deg,#0a1628,#0d2461)",padding:"6rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(0,86,210,0.25) 0%, transparent 70%)",pointerEvents:"none"}}></div>
        <div style={{position:"relative",maxWidth:640,margin:"0 auto"}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#93c5fd",fontSize:"0.8125rem",fontWeight:600,padding:"0.375rem 0.875rem",borderRadius:100,marginBottom:"1.5rem"}}>
            🚀 Start Learning Today
          </div>
          <h2 style={{fontFamily:"var(--font-serif)",fontSize:"clamp(2rem,4vw,3rem)",color:"white",lineHeight:1.2,marginBottom:"1.25rem",fontWeight:400}}>
            Open Doors to a <em style={{color:"#60a5fa",fontStyle:"italic"}}>Brighter Future</em>
          </h2>
          <p style={{color:"rgba(255,255,255,0.75)",fontSize:"1.0625rem",marginBottom:"2.5rem",lineHeight:1.7}}>
            Join over 77 million learners and start your journey today. No experience required.
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <Link to="/register" className="btn btn-primary btn-xl">Get Started for Free</Link>
            <Link to="/courses"  className="btn btn-xl" style={{background:"rgba(255,255,255,0.1)",color:"white",border:"1.5px solid rgba(255,255,255,0.25)"}}>Browse Courses</Link>
          </div>
          <p style={{color:"rgba(255,255,255,0.4)",fontSize:"0.8125rem",marginTop:"1.5rem"}}>No credit card required · Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
