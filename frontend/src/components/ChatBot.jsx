import { useState, useRef, useEffect } from "react";
import { ChatBotLogo } from "./EduFlowLogo";

const QUICK_REPLIES = [
  "What courses do you offer?",
  "How do I enroll?",
  "Is there a free trial?",
  "How do I become an instructor?",
];

const BOT_RESPONSES = {
  "hello":       "👋 Hi there! Welcome to EduFlow! I'm your AI learning assistant. How can I help you today?",
  "hi":          "👋 Hello! Great to see you! How can I assist you with your learning journey?",
  "courses":     "📚 We offer 5,400+ courses across Web Development, Data Science, Design, Marketing, Business and more! You can browse all courses at our Explore page. What topic interests you?",
  "enroll":      "🎓 Enrolling is super easy! Just:\n1. Create a free account\n2. Browse courses\n3. Click 'Enroll Now' on any course\n4. Start learning immediately!\n\nWould you like help finding a course?",
  "free":        "✅ Yes! EduFlow offers:\n• Free account registration\n• Many free courses\n• 7-day free trial on premium\n• 30-day money-back guarantee\n\nNo credit card required to get started!",
  "instructor":  "👨‍🏫 Becoming an instructor is easy!\n1. Register and select 'Instructor' role\n2. Login to your Instructor Dashboard\n3. Click 'Create Course'\n4. Add your lessons\n5. Publish and start earning!\n\nWould you like to sign up now?",
  "price":       "💰 Our pricing:\n• Many courses are completely FREE\n• Paid courses range from $9 - $99\n• 30-day money-back guarantee\n• Lifetime access after purchase",
  "certificate": "🏆 Yes! You receive a verified certificate after completing any course. These certificates are recognized by 2,000+ companies including Google, Microsoft, and Amazon!",
  "mern":        "💻 Our MERN Stack Bootcamp covers:\n• MongoDB database design\n• Express.js REST APIs\n• React.js frontend\n• Node.js backend\n• JWT Authentication\n• Full project deployment\n\nIt's our most popular course!",
  "contact":     "📧 You can reach us at:\n• Email: support@eduflow.com\n• Live chat: Available 24/7\n• Help Center: help.eduflow.com\n\nOur support team typically responds within 2 hours!",
  "default":     "🤔 I'm not sure about that, but I'm here to help! You can ask me about:\n• Available courses\n• How to enroll\n• Pricing & certificates\n• Becoming an instructor\n\nOr visit our Help Center for more info!",
};

function getBotResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) return BOT_RESPONSES["hello"];
  if (msg.includes("course") || msg.includes("learn") || msg.includes("topic")) return BOT_RESPONSES["courses"];
  if (msg.includes("enroll") || msg.includes("join") || msg.includes("sign up") || msg.includes("register")) return BOT_RESPONSES["enroll"];
  if (msg.includes("free") || msg.includes("trial") || msg.includes("cost")) return BOT_RESPONSES["free"];
  if (msg.includes("instructor") || msg.includes("teach") || msg.includes("create course")) return BOT_RESPONSES["instructor"];
  if (msg.includes("price") || msg.includes("paid") || msg.includes("money") || msg.includes("dollar")) return BOT_RESPONSES["price"];
  if (msg.includes("certificate") || msg.includes("cert") || msg.includes("degree")) return BOT_RESPONSES["certificate"];
  if (msg.includes("mern") || msg.includes("react") || msg.includes("node") || msg.includes("mongo")) return BOT_RESPONSES["mern"];
  if (msg.includes("contact") || msg.includes("support") || msg.includes("help") || msg.includes("email")) return BOT_RESPONSES["contact"];
  return BOT_RESPONSES["default"];
}

export default function ChatBot() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "👋 Hi! I'm **EduFlow AI Assistant**. I can help you find courses, answer questions, and guide your learning journey. How can I help?", time: new Date() }
  ]);
  const [input,    setInput]    = useState("");
  const [typing,   setTyping]   = useState(false);
  const [unread,   setUnread]   = useState(1);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text: text.trim(), time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, from: "bot", text: getBotResponse(text), time: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
      if (!isOpen) setUnread(n => n + 1);
    }, 1000 + Math.random() * 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatText = (text) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>{line}{i < text.split("\n").length - 1 && <br />}</span>
    ));
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ===== CHAT WINDOW ===== */}
      {isOpen && (
        <div style={{
          position: "fixed", bottom: 90, right: 24, width: 380, height: 560,
          background: "white", borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
          display: "flex", flexDirection: "column", zIndex: 1000, overflow: "hidden",
          border: "1px solid var(--gray-200)", animation: "slideUpChat 0.25s ease",
        }}>

          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #0056d2, #7c3aed)",
            padding: "1rem 1.25rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ position: "relative" }}>
                <ChatBotLogo size={40} />
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#22c55e", border: "2px solid white" }}></div>
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "0.9375rem" }}>EduFlow AI</div>
                <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.75rem" }}>● Online · Instant replies</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{
              background: "rgba(255,255,255,0.15)", border: "none",
              borderRadius: "50%", width: 32, height: 32, cursor: "pointer",
              color: "white", fontSize: "1rem", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "1rem",
            display: "flex", flexDirection: "column", gap: "0.875rem",
            background: "#f8fafc",
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: msg.from === "user" ? "row-reverse" : "row",
                alignItems: "flex-end", gap: "0.5rem",
              }}>
                {msg.from === "bot" && (
                  <div style={{ flexShrink: 0 }}>
                    <ChatBotLogo size={28} />
                  </div>
                )}
                <div style={{ maxWidth: "80%" }}>
                  <div style={{
                    background: msg.from === "user" ? "var(--blue)" : "white",
                    color: msg.from === "user" ? "white" : "var(--gray-800)",
                    borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem", lineHeight: 1.6,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    border: msg.from === "bot" ? "1px solid var(--gray-200)" : "none",
                  }}>
                    {formatText(msg.text)}
                  </div>
                  <div style={{
                    fontSize: "0.6875rem", color: "var(--gray-400)",
                    marginTop: "0.25rem",
                    textAlign: msg.from === "user" ? "right" : "left",
                  }}>
                    {formatTime(msg.time)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
              <div style={{ flexShrink: 0 }}><ChatBotLogo size={28} /></div>
                <div style={{
                  background: "white", borderRadius: "18px 18px 18px 4px",
                  padding: "0.75rem 1rem", border: "1px solid var(--gray-200)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  display: "flex", gap: "4px", alignItems: "center",
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "var(--gray-400)",
                      animation: `typingDot 1.2s ease-in-out ${i*0.2}s infinite`,
                    }}></div>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}></div>
          </div>

          {/* Quick Replies */}
          <div style={{
            padding: "0.625rem 0.875rem",
            background: "white", borderTop: "1px solid var(--gray-100)",
            display: "flex", gap: "0.375rem", flexWrap: "wrap",
          }}>
            {QUICK_REPLIES.map(qr => (
              <button key={qr} onClick={() => sendMessage(qr)} style={{
                padding: "0.3125rem 0.75rem", borderRadius: 100,
                border: "1.5px solid var(--gray-200)", background: "var(--gray-50)",
                color: "var(--blue)", fontSize: "0.75rem", fontWeight: 600,
                cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-sans)",
                whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { e.target.style.background = "var(--blue-light)"; e.target.style.borderColor = "var(--blue)"; }}
                onMouseLeave={e => { e.target.style.background = "var(--gray-50)"; e.target.style.borderColor = "var(--gray-200)"; }}
              >{qr}</button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} style={{
            padding: "0.75rem 1rem",
            background: "white", borderTop: "1px solid var(--gray-200)",
            display: "flex", gap: "0.5rem", alignItems: "center",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1, border: "1.5px solid var(--gray-200)", borderRadius: 100,
                padding: "0.5625rem 1rem", fontSize: "0.875rem",
                fontFamily: "var(--font-sans)", outline: "none", color: "var(--gray-900)",
                transition: "border-color 0.15s",
              }}
              onFocus={e => e.target.style.borderColor = "var(--blue)"}
              onBlur={e => e.target.style.borderColor = "var(--gray-200)"}
            />
            <button type="submit" disabled={!input.trim()} style={{
              width: 38, height: 38, borderRadius: "50%",
              background: input.trim() ? "var(--blue)" : "var(--gray-200)",
              border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
              color: input.trim() ? "white" : "var(--gray-400)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", transition: "all 0.15s", flexShrink: 0,
            }}>➤</button>
          </form>
        </div>
      )}

      {/* ===== TOGGLE BUTTON ===== */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 60, height: 60, borderRadius: "50%",
          background: "linear-gradient(135deg, #0056d2, #7c3aed)",
          border: "none", cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0,86,210,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.5rem", zIndex: 1000,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,86,210,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,86,210,0.4)"; }}
        title="Chat with AI Assistant"
      >
        {isOpen ? "✕" : "🤖"}
        {!isOpen && unread > 0 && (
          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 22, height: 22, borderRadius: "50%",
            background: "#ef4444", color: "white",
            fontSize: "0.6875rem", fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white",
          }}>{unread}</div>
        )}
      </button>

      {/* Animations */}
      <style>{`
        @keyframes slideUpChat {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0);    opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1;   }
        }
      `}</style>
    </>
  );
}
