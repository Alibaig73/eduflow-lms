import { Link } from "react-router-dom";
import CourseThumbnail from "./CourseThumbnail";

const RATINGS = [4.6, 4.7, 4.8, 4.9, 4.5];
const REVIEWS = ["12,483","8,291","15,672","6,104","9,847"];

function StarRating({ score }) {
  const full  = Math.floor(score);
  const stars = Array.from({ length: 5 }, (_, i) => i < full ? "★" : "☆").join("");
  return <span className="course-rating-stars">{stars}</span>;
}

export default function CourseCard({ course, index = 0 }) {
  const rating  = RATINGS[index % RATINGS.length];
  const reviews = REVIEWS[index % REVIEWS.length];
  const initials = (course.instructor?.name || "EF").split(" ").map(n=>n[0]).join("").slice(0,2);

  return (
    <Link to={`/courses/${course._id}`} style={{textDecoration:"none"}}>
      <div className="course-card">
        {/* Unique SVG Thumbnail per category */}
        <div className="course-thumb" style={{padding:0,height:168,overflow:"hidden"}}>
          <CourseThumbnail category={course.category} title={course.title} height={168} />
          <div style={{position:"absolute",top:12,left:12}}>
            <span className="badge badge-blue" style={{fontSize:"0.625rem",background:"rgba(0,0,0,0.4)",color:"white",border:"1px solid rgba(255,255,255,0.2)"}}>{course.category}</span>
          </div>
        </div>

        {/* Body */}
        <div className="course-body">
          <div className="course-provider">
            <div className="course-provider-dot">{initials}</div>
            <span className="course-provider-name">{course.instructor?.name || "EduFlow"}</span>
          </div>
          <h3 className="course-title">{course.title}</h3>
          <div className="course-rating">
            <span className="course-rating-score">{rating}</span>
            <StarRating score={rating} />
            <span className="course-rating-count">({reviews})</span>
          </div>
        </div>

        {/* Footer */}
        <div className="course-footer">
          <div className="course-meta-row">
            <span>📖 {course.lessons?.length || 0} lessons</span>
            <span>👥 {course.enrolledCount || 0}</span>
          </div>
          {course.price === 0
            ? <span className="course-price-free">Free</span>
            : <span className="course-price">${course.price}</span>
          }
        </div>
      </div>
    </Link>
  );
}
