// =============================================
// CourseThumbnail.jsx
// Unique SVG banners for each course category
// =============================================

export default function CourseThumbnail({ category, title = "", height = 168 }) {
  const thumbnails = {

    "Web Development": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="wdBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0f172a"/>
            <stop offset="100%" stopColor="#1e3a8a"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#wdBg)"/>
        {/* Grid pattern */}
        {[0,1,2,3,4,5,6,7,8].map(i=><line key={`h${i}`} x1="0" y1={i*25} x2="400" y2={i*25} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i=><line key={`v${i}`} x1={i*28} y1="0" x2={i*28} y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
        {/* Browser window */}
        <rect x="60" y="30" width="280" height="140" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <rect x="60" y="30" width="280" height="28" rx="8" fill="rgba(255,255,255,0.1)"/>
        <circle cx="80"  cy="44" r="5" fill="#ef4444" opacity="0.8"/>
        <circle cx="96"  cy="44" r="5" fill="#f59e0b" opacity="0.8"/>
        <circle cx="112" cy="44" r="5" fill="#22c55e" opacity="0.8"/>
        <rect x="128" y="38" width="140" height="12" rx="6" fill="rgba(255,255,255,0.1)"/>
        {/* Code lines */}
        <rect x="80"  y="74" width="60" height="6" rx="3" fill="#60a5fa" opacity="0.8"/>
        <rect x="148" y="74" width="40" height="6" rx="3" fill="#f472b6" opacity="0.6"/>
        <rect x="80"  y="88" width="20" height="6" rx="3" fill="#a78bfa" opacity="0.7"/>
        <rect x="108" y="88" width="80" height="6" rx="3" fill="#34d399" opacity="0.6"/>
        <rect x="80"  y="102" width="100" height="6" rx="3" fill="#60a5fa" opacity="0.5"/>
        <rect x="88"  y="116" width="70" height="6" rx="3" fill="#fbbf24" opacity="0.6"/>
        <rect x="88"  y="130" width="50" height="6" rx="3" fill="#f472b6" opacity="0.5"/>
        <rect x="80"  y="144" width="30" height="6" rx="3" fill="#a78bfa" opacity="0.7"/>
        {/* Glow */}
        <circle cx="340" cy="40" r="50" fill="#3b82f6" opacity="0.08"/>
        {/* Label */}
        <text x="20" y="185" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">&lt;/&gt; Web Development</text>
      </svg>
    ),

    "Data Science": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="dsBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#064e3b"/>
            <stop offset="100%" stopColor="#065f46"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#dsBg)"/>
        {/* Chart bars */}
        <rect x="50"  y="130" width="30" height="50" rx="4" fill="#34d399" opacity="0.7"/>
        <rect x="90"  y="100" width="30" height="80" rx="4" fill="#34d399" opacity="0.8"/>
        <rect x="130" y="80"  width="30" height="100" rx="4" fill="#10b981" opacity="0.9"/>
        <rect x="170" y="60"  width="30" height="120" rx="4" fill="#059669"/>
        <rect x="210" y="90"  width="30" height="90"  rx="4" fill="#34d399" opacity="0.8"/>
        <rect x="250" y="70"  width="30" height="110" rx="4" fill="#10b981" opacity="0.9"/>
        <rect x="290" y="50"  width="30" height="130" rx="4" fill="#059669"/>
        <rect x="330" y="110" width="30" height="70"  rx="4" fill="#34d399" opacity="0.7"/>
        {/* Line chart */}
        <polyline points="65,140 105,110 145,85 185,65 225,95 265,75 305,55 345,115" fill="none" stroke="#6ee7b7" strokeWidth="2.5" opacity="0.9"/>
        {[65,105,145,185,225,265,305,345].map((x,i)=>{
          const ys=[140,110,85,65,95,75,55,115]; return <circle key={x} cx={x} cy={ys[i]} r="4" fill="#6ee7b7" opacity="0.9"/>;
        })}
        {/* Baseline */}
        <line x1="40" y1="180" x2="380" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <text x="20" y="185" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">📊 Data Science</text>
      </svg>
    ),

    "Design": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="deBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#2e1065"/>
            <stop offset="100%" stopColor="#4c1d95"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#deBg)"/>
        {/* Design elements */}
        <circle cx="120" cy="100" r="60" fill="none" stroke="#c4b5fd" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="120" cy="100" r="40" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="120" cy="100" r="20" fill="#7c3aed" opacity="0.6"/>
        {/* Color swatches */}
        <rect x="220" y="40"  width="40" height="40" rx="8" fill="#f472b6" opacity="0.8"/>
        <rect x="270" y="40"  width="40" height="40" rx="8" fill="#60a5fa" opacity="0.8"/>
        <rect x="320" y="40"  width="40" height="40" rx="8" fill="#34d399" opacity="0.8"/>
        <rect x="220" y="90"  width="40" height="40" rx="8" fill="#fbbf24" opacity="0.8"/>
        <rect x="270" y="90"  width="40" height="40" rx="8" fill="#a78bfa" opacity="0.8"/>
        <rect x="320" y="90"  width="40" height="40" rx="8" fill="#f87171" opacity="0.8"/>
        {/* Pen tool */}
        <path d="M50 160 L80 130 L90 140 L60 170 Z" fill="none" stroke="#c4b5fd" strokeWidth="2" opacity="0.6"/>
        <line x1="80" y1="130" x2="100" y2="110" stroke="#c4b5fd" strokeWidth="2" opacity="0.6"/>
        <circle cx="100" cy="110" r="4" fill="#c4b5fd" opacity="0.8"/>
        <text x="20" y="192" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">🎨 UI/UX Design</text>
      </svg>
    ),

    "Marketing": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="mkBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#7c2d12"/>
            <stop offset="100%" stopColor="#9a3412"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#mkBg)"/>
        {/* Megaphone */}
        <path d="M60 80 L120 60 L120 140 L60 120 Z" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.7"/>
        <rect x="40" y="80" width="25" height="40" rx="4" fill="#fed7aa" opacity="0.6"/>
        <path d="M120 80 C160 60 200 50 220 100 C200 150 160 140 120 120" fill="none" stroke="#fb923c" strokeWidth="2.5" opacity="0.8"/>
        {/* Sound waves */}
        <path d="M240 70 Q280 100 240 130" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.5"/>
        <path d="M260 55 Q320 100 260 145" fill="none" stroke="#fed7aa" strokeWidth="2" opacity="0.4"/>
        <path d="M280 40 Q360 100 280 160" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.3"/>
        {/* Stats rising */}
        <polyline points="30,180 80,165 130,150 180,130 230,110 280,85 330,60" fill="none" stroke="#fb923c" strokeWidth="2" opacity="0.6"/>
        <circle cx="330" cy="60" r="5" fill="#f97316"/>
        <text x="20" y="195" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">📣 Digital Marketing</text>
      </svg>
    ),

    "Business": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="buBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1e3a5f"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#buBg)"/>
        {/* Building/skyline */}
        <rect x="50"  y="80"  width="40" height="100" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="100" y="50"  width="50" height="130" rx="2" fill="rgba(255,255,255,0.1)"  stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="160" y="30"  width="60" height="150" rx="2" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="230" y="60"  width="45" height="120" rx="2" fill="rgba(255,255,255,0.1)"  stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="285" y="90"  width="35" height="90"  rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="330" y="70"  width="40" height="110" rx="2" fill="rgba(255,255,255,0.1)"  stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        {/* Windows */}
        {[[60,90],[70,90],[60,106],[70,106],[110,62],[126,62],[110,78],[126,78],[172,42],[188,42],[204,42],[172,58],[188,58],[204,58]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="8" height="8" rx="1" fill="#fbbf24" opacity={Math.random()>0.5?0.7:0.2}/>
        ))}
        {/* Pie chart */}
        <circle cx="340" cy="50" r="25" fill="none" stroke="#3b82f6" strokeWidth="8" strokeDasharray="47 110" strokeDashoffset="0" opacity="0.8"/>
        <circle cx="340" cy="50" r="25" fill="none" stroke="#60a5fa" strokeWidth="8" strokeDasharray="30 110" strokeDashoffset="-47" opacity="0.7"/>
        <circle cx="340" cy="50" r="25" fill="none" stroke="#93c5fd" strokeWidth="8" strokeDasharray="33 110" strokeDashoffset="-77" opacity="0.6"/>
        <text x="20" y="192" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">💼 Business</text>
      </svg>
    ),

    "Other": (
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" width="100%" height={height} style={{display:"block"}}>
        <defs>
          <linearGradient id="otBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#1f2937"/>
            <stop offset="100%" stopColor="#374151"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#otBg)"/>
        {/* Books */}
        <rect x="60"  y="60"  width="25" height="100" rx="3" fill="#3b82f6" opacity="0.8"/>
        <rect x="88"  y="75"  width="25" height="85"  rx="3" fill="#8b5cf6" opacity="0.8"/>
        <rect x="116" y="50"  width="25" height="110" rx="3" fill="#ec4899" opacity="0.8"/>
        <rect x="144" y="80"  width="25" height="80"  rx="3" fill="#f59e0b" opacity="0.8"/>
        <rect x="172" y="65"  width="25" height="95"  rx="3" fill="#10b981" opacity="0.8"/>
        {/* Stars */}
        {[[280,50],[320,80],[260,120],[340,130],[300,160]].map(([x,y],i)=>(
          <text key={i} x={x} y={y} fill="#fbbf24" opacity={0.3+i*0.1} fontSize={12+i*4}>★</text>
        ))}
        <text x="20" y="192" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">📚 Course</text>
      </svg>
    ),
  };

  return thumbnails[category] || thumbnails["Other"];
}
