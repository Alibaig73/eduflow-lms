import { useState, useEffect } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";

const CATS = ["All","Web Development","Data Science","Design","Marketing","Business","Other"];

export default function Courses() {
  const [courses,  setCourses]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search)            params.search   = search;
    if (category !== "All") params.category = category;
    api.get("/courses", { params })
      .then(r => setCourses(r.data.data || []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div>
      {/* Page Header */}
      <div style={{background:"var(--gray-900)",padding:"3rem 2rem"}}>
        <div className="container">
          <div style={{maxWidth:640}}>
            <p style={{color:"#60a5fa",fontSize:"0.875rem",fontWeight:600,marginBottom:"0.625rem"}}>EduFlow Catalog</p>
            <h1 style={{fontFamily:"var(--font-serif)",fontSize:"clamp(2rem,4vw,2.75rem)",color:"white",marginBottom:"1rem",fontWeight:400}}>All the skills you need<br/>in one place</h1>
            <p style={{color:"rgba(255,255,255,0.65)",marginBottom:"2rem"}}>From critical skills to technical topics, EduFlow supports your professional development.</p>
            {/* Search */}
            <div style={{display:"flex",gap:"0.75rem"}}>
              <div className="search-bar" style={{flex:1,background:"white"}}>
                <span style={{color:"var(--gray-400)"}}>🔍</span>
                <input type="text" placeholder="What do you want to learn?"
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn btn-primary btn-lg">Search</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{background:"var(--gray-50)",minHeight:"70vh"}}>
        <div className="container" style={{paddingTop:"2rem",paddingBottom:"4rem"}}>
          <div style={{display:"flex",gap:"2rem",alignItems:"flex-start"}}>

            {/* Sidebar Filters */}
            <div style={{width:220,flexShrink:0,background:"var(--white)",borderRadius:12,border:"1px solid var(--gray-200)",padding:"1.5rem",position:"sticky",top:80}}>
              <h3 style={{fontSize:"0.875rem",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--gray-500)",marginBottom:"1rem"}}>Category</h3>
              <div style={{display:"flex",flexDirection:"column",gap:"0.125rem"}}>
                {CATS.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    style={{padding:"0.5rem 0.75rem",borderRadius:6,border:"none",background: category===c?"var(--blue-light)":"transparent",color: category===c?"var(--blue)":"var(--gray-700)",fontFamily:"var(--font-sans)",fontSize:"0.875rem",fontWeight: category===c?700:500,cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}
                  >{c}</button>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
                <div>
                  <h2 style={{fontSize:"1.25rem",fontWeight:800,color:"var(--gray-900)"}}>
                    {category === "All" ? "All Courses" : category}
                  </h2>
                  <p style={{fontSize:"0.875rem",color:"var(--gray-500)",marginTop:"0.25rem"}}>
                    {loading ? "Loading..." : `${courses.length} results`}
                  </p>
                </div>
                <select style={{padding:"0.5rem 1rem",borderRadius:8,border:"1.5px solid var(--gray-300)",fontFamily:"var(--font-sans)",fontSize:"0.875rem",outline:"none",background:"white"}}>
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                </select>
              </div>

              {loading ? (
                <div className="page-loading"><div className="spinner"></div><p>Loading courses...</p></div>
              ) : courses.length > 0 ? (
                <div className="courses-grid">
                  {courses.map((c,i) => <CourseCard key={c._id} course={c} index={i} />)}
                </div>
              ) : (
                <div className="empty-state">
                  <span className="empty-state-icon">🔍</span>
                  <h3>No courses found</h3>
                  <p>Try adjusting your search or browse all categories.</p>
                  <button className="btn btn-primary" onClick={() => { setSearch(""); setCategory("All"); }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
