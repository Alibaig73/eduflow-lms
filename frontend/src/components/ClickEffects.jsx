// =============================================
// ClickEffects.jsx
// Global click ripple + cursor effects
// =============================================
import { useEffect } from "react";

export default function ClickEffects() {
  useEffect(() => {
    // Ripple effect on every click
    const handleClick = (e) => {
      // Create ripple
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX - 10}px;
        top:  ${e.clientY - 10}px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(0, 86, 210, 0.35);
        pointer-events: none;
        z-index: 9999;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      // Sparkle on buttons
      const target = e.target.closest("button, a, .btn");
      if (target) {
        for (let i = 0; i < 6; i++) {
          const spark = document.createElement("div");
          const angle = (i / 6) * 360;
          const dist  = 30 + Math.random() * 20;
          spark.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top:  ${e.clientY}px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: ${["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#10b981","#f472b6"][i]};
            pointer-events: none;
            z-index: 9999;
            animation: sparkOut 0.6s ease-out forwards;
            --tx: ${Math.cos(angle * Math.PI / 180) * dist}px;
            --ty: ${Math.sin(angle * Math.PI / 180) * dist}px;
          `;
          document.body.appendChild(spark);
          setTimeout(() => spark.remove(), 600);
        }
      }
    };

    document.addEventListener("click", handleClick);

    // Inject CSS animations
    const style = document.createElement("style");
    style.id = "click-effects-style";
    style.textContent = `
      @keyframes rippleEffect {
        0%   { transform: scale(0);  opacity: 1; }
        100% { transform: scale(8);  opacity: 0; }
      }
      @keyframes sparkOut {
        0%   { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
      }

      /* Smooth hover on all buttons */
      button, .btn, a {
        transition: transform 0.15s ease, box-shadow 0.15s ease !important;
      }

      /* Page load fade in */
      #root {
        animation: pageFadeIn 0.4s ease;
      }
      @keyframes pageFadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* Smooth scroll everywhere */
      html { scroll-behavior: smooth; }

      /* Custom scrollbar */
      ::-webkit-scrollbar { width: 6px; height: 6px; }
      ::-webkit-scrollbar-track { background: #f1f5f9; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 100px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

      /* Focus ring */
      *:focus-visible {
        outline: 2px solid #0056d2;
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Card hover lift */
      .course-card:hover,
      .stat-card:hover {
        transform: translateY(-4px);
      }

      /* Navbar link underline effect */
      .nav-link {
        position: relative;
      }

      /* Smooth image load */
      img {
        transition: opacity 0.3s ease;
      }
    `;

    if (!document.getElementById("click-effects-style")) {
      document.head.appendChild(style);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null; // No UI — just effects
}
