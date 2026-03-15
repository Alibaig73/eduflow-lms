import { Link } from "react-router-dom";
import { EduFlowLogo } from "./EduFlowLogo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-grid">
          <div>
            <div style={{marginBottom:"0.875rem"}}>
              <EduFlowLogo size={36} showText={true} theme="light" />
            </div>
            <p className="footer-brand-desc">The world's best online learning platform. Start, switch, or advance your career with over 5,400 courses from top universities and companies.</p>
            <div style={{display:"flex",gap:"0.75rem",marginTop:"1.25rem"}}>
              {["𝕏","in","f","▶"].map(s => (
                <div key={s} style={{width:36,height:36,borderRadius:8,background:"rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.875rem",cursor:"pointer",transition:"background 0.15s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
                  onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                >{s}</div>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Learn</h4>
            <ul>
              <li><Link to="/courses">All Courses</Link></li>
              <li><Link to="/courses">Web Development</Link></li>
              <li><Link to="/courses">Data Science</Link></li>
              <li><Link to="/courses">Design</Link></li>
              <li><Link to="/courses">Business</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Community</h4>
            <ul>
              <li><a href="#">Learners</a></li>
              <li><a href="#">Partners</a></li>
              <li><a href="#">Developers</a></li>
              <li><a href="#">Beta Testers</a></li>
              <li><a href="#">Translators</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 EduFlow, Inc. All rights reserved.</span>
          <div style={{display:"flex",gap:"1.5rem"}}>
            <a href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"0.8125rem"}}>Privacy</a>
            <a href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"0.8125rem"}}>Terms</a>
            <a href="#" style={{color:"rgba(255,255,255,0.4)",fontSize:"0.8125rem"}}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
