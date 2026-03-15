export default function AnnouncementBar() {
  const items = [
    "🎉 New Course: Advanced React Patterns — Enroll Now",
    "🏆 EduFlow rated #1 Learning Platform 2026",
    "🚀 500+ new courses added this month",
    "💼 87% of learners report career benefits",
    "🎓 Get certified by Google, IBM & Microsoft",
    "🌍 Join 77M+ learners from 150+ countries",
    "⚡ Limited time: 50% off all premium courses",
  ];

  return (
    <div style={{
      background: "linear-gradient(90deg, #0056d2, #7c3aed)",
      overflow: "hidden", height: 40,
      display: "flex", alignItems: "center",
    }}>
      <div style={{
        display: "flex", gap: "4rem",
        animation: "marquee 30s linear infinite",
        whiteSpace: "nowrap",
      }}>
        {/* Duplicate for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.8125rem", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            {item}
            <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: "1.5rem" }}>•</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
