"use client";

import React, { useEffect, useState } from "react";
import Wave from "react-wavify";
import { useTheme } from "next-themes";

const WavifyBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  // Define colors based on theme
  const isDark = resolvedTheme === "dark";

  // Light Mode Colors (Ocean Blue)
  const lightStart = "#9fd2ff";
  const lightEnd = "#c6e4fe";

  // Dark Mode Colors (Deep Navy)
  // These hex codes match the "floor" of the dark mode reference
  const darkStart = "#1e3a8a"; // Dark Blue
  const darkEnd = "#172554"; // Darker Blue

  return (
    <Wave
      fill="url(#oceanGradient)"
      paused={false}
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "250px", // Increased slightly to cover bottom better
        zIndex: 0,
      }}
      options={{
        height: 20,
        amplitude: 25,
        speed: 0.2,
        points: 4,
      }}
    >
      <defs>
        <linearGradient id="oceanGradient" gradientTransform="rotate(90)">
          <stop
            offset="0%"
            stopColor={isDark ? darkStart : lightStart}
            style={{ transition: "stop-color 0.5s" }}
          />
          <stop
            offset="100%"
            stopColor={isDark ? darkEnd : lightEnd}
            style={{ transition: "stop-color 0.5s" }}
          />
        </linearGradient>
      </defs>
    </Wave>
  );
};

export default WavifyBackground;
