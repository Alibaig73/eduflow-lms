import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export function About() {
  return (
    <div>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0a1628,#0d2461)",padding:"5rem 2rem",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(0,86,210,0.2) 0%, transparent 70%)",pointerEvents:"none"}}></div>
        <div style={{position:"relative",maxWidth:720,margin:"0 auto"}}>
          <div style={{display:"inline-block",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",color:"#93c5fd",fontSize:"0.8125rem",fontWeight:600,padding:"0.375rem 0.875rem",borderRadius:100,marginBottom:"1.5rem"}}>
            About EduFlow
          </div>
          <h1 style={{fontFamily:"var(--font-serif)",fontSize:"clamp(2.5rem,5vw,3.5rem)",color:"white",lineHeight:1.15,marginBottom:"1.25rem",fontWeight:400}}>
            We're changing how the world <em style={{color:"#60a5fa",fontStyle:"italic"}}>learns</em>
          </h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:"1.0625rem",lineHeight:1.7}}>
            EduFlow is a leading online learning platform that helps anyone, anywhere access the best education and improve their lives.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{background:"var(--white)",padding:"4rem 2rem",borderBottom:"1px solid var(--gray-200)"}}>
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"2rem",textAlign:"center"}}>
            {[
              { num:"77M+",   label:"Registered Learners" },
              { num:"5,400+", label:"Available Courses" },
              { num:"275+",   label:"University Partners" },
              { num:"2,000+", label:"Business Partners" },
              { num:"92%",    label:"Career Success Rate" },
              { num:"150+",   label:"Countries Reached" },
            ].map(s => (
              <div key={s.label}>
                <div style={{fontFamily:"var(--font-sans)",fontSize:"2.25rem",fontWeight:800,color:"var(--blue)",marginBottom:"0.375rem"}}>{s.num}</div>
                <div style={{fontSize:"0.875rem",color:"var(--gray-500)",fontWeight:500}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>
            <div>
              <p style={{color:"var(--blue)",fontSize:"0.875rem",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:"0.75rem"}}>Our Mission</p>
              <h2 style={{fontFamily:"var(--font-serif)",fontSize:"2.25rem",fontWeight:400,lineHeight:1.2,marginBottom:"1.25rem"}}>Providing universal access to world-class education</h2>
              <p style={{color:"var(--gray-600)",lineHeight:1.8,marginBottom:"1.25rem"}}>
                We believe everyone deserves access to quality education. Our platform connects passionate learners with expert instructors from top universities and leading companies worldwide.
              </p>
              <p style={{color:"var(--gray-600)",lineHeight:1.8,marginBottom:"2rem"}}>
                Built with the MERN Stack (MongoDB, Express, React, Node.js), EduFlow itself is a testament to what modern web technology can achieve in the education sector.
              </p>
              <Link to="/courses" className="btn btn-primary btn-lg">Start Learning Today</Link>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
              {[
                { icon:"🎯", title:"Outcome-Focused",   desc:"Every course is designed with real career outcomes in mind." },
                { icon:"🌍", title:"Global Reach",      desc:"Learners from 150+ countries trust EduFlow for their education." },
                { icon:"👨‍🏫", title:"Expert Faculty",   desc:"Instructors are vetted professionals with real-world experience." },
                { icon:"🔄", title:"Always Updated",    desc:"Course content is regularly updated to match industry trends." },
              ].map(v => (
                <div key={v.title} style={{background:"var(--gray-50)",borderRadius:12,padding:"1.5rem",border:"1px solid var(--gray-200)"}}>
                  <div style={{fontSize:"1.75rem",marginBottom:"0.75rem"}}>{v.icon}</div>
                  <h3 style={{fontWeight:700,fontSize:"0.9375rem",marginBottom:"0.375rem"}}>{v.title}</h3>
                  <p style={{fontSize:"0.8125rem",color:"var(--gray-500)",lineHeight:1.6}}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section section-gray">
        <div className="container" style={{textAlign:"center"}}>
          <h2 style={{fontFamily:"var(--font-serif)",fontSize:"2rem",fontWeight:400,marginBottom:"0.75rem"}}>Built with Modern Technology</h2>
          <p style={{color:"var(--gray-500)",marginBottom:"3rem"}}>EduFlow is a full-stack MERN application showcasing industry-standard development practices</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.5rem"}}>
            {[
              { name:"MongoDB",  role:"Database",      color:"#13aa52", emoji:"🍃", desc:"NoSQL database for flexible data storage" },
              { name:"Express",  role:"Backend",       color:"#000000", emoji:"⚡", desc:"Fast, minimal Node.js web framework" },
              { name:"React",    role:"Frontend",      color:"#61dafb", emoji:"⚛️", desc:"Component-based UI library by Meta" },
              { name:"Node.js",  role:"Runtime",       color:"#339933", emoji:"🟢", desc:"JavaScript runtime for the server" },
              { name:"JWT",      role:"Auth",          color:"#d63aff", emoji:"🔐", desc:"Secure JSON Web Token authentication" },
              { name:"Mongoose", role:"ODM",           color:"#880000", emoji:"🔗", desc:"Elegant MongoDB object modeling" },
            ].map(t => (
              <div key={t.name} style={{background:"var(--white)",borderRadius:12,padding:"1.75rem",border:"1px solid var(--gray-200)",textAlign:"left",boxShadow:"var(--shadow-xs)"}}>
                <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.875rem"}}>
                  <span style={{fontSize:"1.75rem"}}>{t.emoji}</span>
                  <div>
                    <div style={{fontWeight:800,fontSize:"1rem"}}>{t.name}</div>
                    <div style={{fontSize:"0.75rem",color:"var(--gray-500)",textTransform:"uppercase",letterSpacing:"0.05em"}}>{t.role}</div>
                  </div>
                </div>
                <p style={{fontSize:"0.8125rem",color:"var(--gray-500)",lineHeight:1.6}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:"var(--blue)",padding:"5rem 2rem",textAlign:"center"}}>
        <div style={{maxWidth:560,margin:"0 auto"}}>
          <h2 style={{fontFamily:"var(--font-serif)",fontSize:"2.25rem",color:"white",marginBottom:"1rem",fontWeight:400}}>Ready to get started?</h2>
          <p style={{color:"rgba(255,255,255,0.8)",marginBottom:"2rem"}}>Join millions of learners and start your journey today.</p>
          <Link to="/register" className="btn btn-xl" style={{background:"white",color:"var(--blue)",fontWeight:700}}>
            Join EduFlow for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
