// =============================================
// EduFlowLogo.jsx
// Professional SVG logo with brand identity
// =============================================

export function EduFlowLogo({ size = 40, showText = true, theme = "dark" }) {
  const textColor = theme === "dark" ? "#0056d2" : "#ffffff";
  const subColor  = theme === "dark" ? "#7c3aed" : "rgba(255,255,255,0.8)";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
      {/* Icon Mark */}
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0056d2" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect width="40" height="40" rx="10" fill="url(#logoGrad1)" />

        {/* Graduation cap / book icon */}
        {/* Book base */}
        <rect x="8" y="14" width="24" height="16" rx="2" fill="white" opacity="0.15" />
        <rect x="9" y="15" width="22" height="14" rx="1.5" fill="white" opacity="0.1" />

        {/* Book spine line */}
        <line x1="20" y1="15" x2="20" y2="29" stroke="white" strokeWidth="1.5" opacity="0.5" />

        {/* Left page lines */}
        <line x1="11" y1="19" x2="18" y2="19" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        <line x1="11" y1="22" x2="18" y2="22" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        <line x1="11" y1="25" x2="18" y2="25" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>

        {/* Right page lines */}
        <line x1="22" y1="19" x2="29" y2="19" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        <line x1="22" y1="22" x2="29" y2="22" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
        <line x1="22" y1="25" x2="29" y2="25" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>

        {/* Graduation cap on top */}
        <polygon points="20,7 28,11 20,15 12,11" fill="white" opacity="0.95" />
        <line x1="28" y1="11" x2="28" y2="15" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round"/>
        <circle cx="28" cy="15.5" r="1.5" fill="white" opacity="0.9" />

        {/* Shine */}
        <circle cx="12" cy="10" r="3" fill="white" opacity="0.08" />
      </svg>

      {/* Text */}
      {showText && (
        <div style={{ lineHeight: 1 }}>
          <div style={{
            fontSize: size * 0.45,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: textColor,
            fontFamily: "'Geist', system-ui, sans-serif",
          }}>
            Edu<span style={{ color: subColor }}>Flow</span>
          </div>
          <div style={{
            fontSize: size * 0.2,
            color: subColor,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: 1,
            opacity: 0.8,
          }}>
            Learn · Grow · Succeed
          </div>
        </div>
      )}
    </div>
  );
}

// Compact icon-only logo
export function EduFlowIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0056d2" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#iconGrad)" />
      <rect x="8" y="14" width="24" height="16" rx="2" fill="white" opacity="0.15" />
      <line x1="20" y1="15" x2="20" y2="29" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <line x1="11" y1="19" x2="18" y2="19" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
      <line x1="11" y1="22" x2="18" y2="22" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
      <line x1="22" y1="19" x2="29" y2="19" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
      <line x1="22" y1="22" x2="29" y2="22" stroke="white" strokeWidth="1.2" opacity="0.7" strokeLinecap="round"/>
      <polygon points="20,7 28,11 20,15 12,11" fill="white" opacity="0.95" />
      <line x1="28" y1="11" x2="28" y2="15" stroke="white" strokeWidth="1.5" opacity="0.8" strokeLinecap="round"/>
      <circle cx="28" cy="15.5" r="1.5" fill="white" opacity="0.9" />
    </svg>
  );
}

// Chatbot avatar logo
export function ChatBotLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0056d2" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="18" fill="url(#botGrad)" />
      {/* Robot face */}
      <rect x="9" y="12" width="18" height="14" rx="4" fill="white" opacity="0.9" />
      {/* Eyes */}
      <circle cx="14" cy="18" r="2.5" fill="#0056d2" />
      <circle cx="22" cy="18" r="2.5" fill="#0056d2" />
      <circle cx="15" cy="17" r="1" fill="white" />
      <circle cx="23" cy="17" r="1" fill="white" />
      {/* Mouth */}
      <path d="M13 22 Q18 25 23 22" stroke="#0056d2" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Antenna */}
      <line x1="18" y1="12" x2="18" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="7" r="2" fill="white" />
      {/* Side bolts */}
      <circle cx="9"  cy="18" r="1.5" fill="white" opacity="0.6" />
      <circle cx="27" cy="18" r="1.5" fill="white" opacity="0.6" />
    </svg>
  );
}
