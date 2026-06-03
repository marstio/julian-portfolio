"use client";

import React from "react";

const STAR_COLOR = "#fffce6";

// --- STATIC CONFIGURATION ---
const STATIC_STARS = [
  // (Keeping your stars exactly as they were in the last step)
  { top: "35%", left: "18%", size: "lg", delay: "1.5s" },
  { top: "65%", left: "8%", size: "sm", delay: "0.5s" },
  { top: "8%", left: "85%", size: "lg", delay: "1s" },
  { top: "60%", left: "88%", size: "sm", delay: "2.2s" },
  { top: "5%", left: "50%", size: "sm", delay: "0.2s" },
];

const STATIC_DOTS = [
  // --- EXISTING DOTS ---
  { top: "10%", left: "30%" },
  { top: "20%", left: "60%" },
  { top: "80%", left: "90%" },
  { top: "30%", left: "5%" },
  { top: "5%", left: "90%" },
  { top: "70%", left: "50%" },

  // --- NEW ADDITIONS (Fills the sides) ---
  // Left Side Extras
  { top: "55%", left: "12%" }, // Mid-low left
  { top: "85%", left: "5%" }, // Bottom left corner

  // Right Side Extras
  { top: "40%", left: "95%" }, // Mid-right edge
  { top: "25%", left: "85%" }, // Upper-right area
];

const StarfieldLayers: React.FC = () => {
  return (
    <div
      className="sky"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <div id="stars" className="sky-stars">
        {STATIC_DOTS.map((dot, i) => (
          <span
            key={`dot-${i}`}
            className="dot dot--blinking"
            style={{
              width: `4px`,
              height: `4px`,
              background: STAR_COLOR,
              top: dot.top,
              left: dot.left,
              opacity: 0.6,
            }}
          ></span>
        ))}
        {STATIC_STARS.map((star, i) => (
          <span
            key={`static-star-${i}`}
            className={`star star--${star.size}`}
            style={{
              position: "absolute",
              color: STAR_COLOR,
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          >
            <span className="star__part"></span>
            <span className="star__part"></span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarfieldLayers;
