import { useState, useEffect } from "react";

const QUOTES = [
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" },
  { text: "Learning is not attained by chance. It must be sought for with ardor and diligence.", author: "Abigail Adams" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Knowledge is power. Information is liberating. Education is the premise of progress.", author: "Kofi Annan" },
  { text: "The mind is not a vessel to be filled but a fire to be kindled.", author: "Plutarch" },
  { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats" },
  { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo" },
  { text: "In learning you will teach, and in teaching you will learn.", author: "Phil Collins" },
];

function getRandomQuote(exclude = -1) {
  let idx;
  do { idx = Math.floor(Math.random() * QUOTES.length); }
  while (idx === exclude && QUOTES.length > 1);
  return { ...QUOTES[idx], idx };
}

export default function MotivationalQuote({ compact = false }) {
  const [quote,   setQuote]   = useState(() => getRandomQuote());
  const [fading,  setFading]  = useState(false);
  const [liked,   setLiked]   = useState(false);
  const [copied,  setCopied]  = useState(false);

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => rotateQuote(), 10000);
    return () => clearInterval(timer);
  }, [quote.idx]);

  const rotateQuote = () => {
    setFading(true);
    setLiked(false);
    setTimeout(() => {
      setQuote(getRandomQuote(quote.idx));
      setFading(false);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <div style={{
        background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
        border: "1px solid #e0e7ff", borderRadius: 12, padding: "1.25rem 1.5rem",
        transition: "opacity 0.4s ease", opacity: fading ? 0 : 1,
      }}>
        <p style={{ fontSize: "0.9rem", color: "var(--gray-700)", fontStyle: "italic", lineHeight: 1.6, marginBottom: "0.5rem" }}>
          "{quote.text}"
        </p>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--blue)" }}>— {quote.author}</p>
      </div>
    );
  }

  return (
    <section style={{
      background: "linear-gradient(135deg, #0a1628 0%, #1e1b4b 50%, #0d2461 100%)",
      padding: "5rem 2rem", position: "relative", overflow: "hidden",
    }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, background: "rgba(0,86,210,0.08)", borderRadius: "50%", filter: "blur(60px)" }}></div>
        <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 250, height: 250, background: "rgba(124,58,237,0.08)", borderRadius: "50%", filter: "blur(60px)" }}></div>
        {/* Decorative quote mark */}
        <div style={{ position: "absolute", top: "1rem", left: "5%", fontSize: "12rem", color: "rgba(255,255,255,0.02)", fontFamily: "Georgia", lineHeight: 1, userSelect: "none" }}>"</div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
          color: "#93c5fd", fontSize: "0.75rem", fontWeight: 600,
          padding: "0.375rem 1rem", borderRadius: 100, marginBottom: "2rem",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          ✨ Daily Inspiration
        </div>

        {/* Quote */}
        <div style={{
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(10px)" : "translateY(0)",
        }}>
          <blockquote style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
            color: "white", lineHeight: 1.4,
            fontWeight: 400, fontStyle: "italic",
            marginBottom: "1.5rem",
          }}>
            "{quote.text}"
          </blockquote>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}></div>
            <p style={{ color: "#93c5fd", fontWeight: 700, fontSize: "0.9375rem", whiteSpace: "nowrap" }}>
              — {quote.author}
            </p>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)" }}></div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Like */}
          <button onClick={() => setLiked(!liked)} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5625rem 1.25rem", borderRadius: 100,
            background: liked ? "rgba(239,68,68,0.2)" : "rgba(255,255,255,0.08)",
            border: `1.5px solid ${liked ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)"}`,
            color: liked ? "#f87171" : "rgba(255,255,255,0.7)",
            cursor: "pointer", fontSize: "0.875rem", fontWeight: 600,
            transition: "all 0.2s", fontFamily: "var(--font-sans)",
          }}>
            {liked ? "❤️" : "🤍"} {liked ? "Liked!" : "Like"}
          </button>

          {/* Copy */}
          <button onClick={handleCopy} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5625rem 1.25rem", borderRadius: 100,
            background: copied ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)",
            border: `1.5px solid ${copied ? "rgba(34,197,94,0.5)" : "rgba(255,255,255,0.15)"}`,
            color: copied ? "#4ade80" : "rgba(255,255,255,0.7)",
            cursor: "pointer", fontSize: "0.875rem", fontWeight: 600,
            transition: "all 0.2s", fontFamily: "var(--font-sans)",
          }}>
            {copied ? "✅" : "📋"} {copied ? "Copied!" : "Copy"}
          </button>

          {/* Next Quote */}
          <button onClick={rotateQuote} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5625rem 1.25rem", borderRadius: 100,
            background: "rgba(0,86,210,0.3)",
            border: "1.5px solid rgba(0,86,210,0.5)",
            color: "#93c5fd",
            cursor: "pointer", fontSize: "0.875rem", fontWeight: 600,
            transition: "all 0.2s", fontFamily: "var(--font-sans)",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,86,210,0.5)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,86,210,0.3)"}
          >
            🔄 New Quote
          </button>
        </div>

        {/* Dots indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem", marginTop: "2rem" }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === 2 ? 20 : 6, height: 6, borderRadius: 100,
              background: i === 2 ? "#3b82f6" : "rgba(255,255,255,0.2)",
              transition: "all 0.3s",
            }}></div>
          ))}
        </div>
      </div>
    </section>
  );
}
