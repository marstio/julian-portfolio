"use client";
import React from "react";

// --- BIRD COMPONENT ---
const FlappingBird = ({ className = "" }: { className?: string }) => (
  <svg
    width="50"
    height="30"
    viewBox="0 0 50 30"
    className={`text-slate-700 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="animate-flap"
      d="M2 15 C 10 1, 20 1, 25 15 C 30 1, 40 1, 48 15"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- CLOUD SHAPES ---
const CloudShapeA = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 120"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M160 50C160 27.9086 142.091 10 120 10C102.869 10 88.3163 20.7691 82.7757 35.8834C77.7077 31.6947 71.1689 29.2 64 29.2C46.3269 29.2 32 43.5269 32 61.2C32 62.8511 32.1251 64.4694 32.3665 66.0479C14.0196 69.3637 0 85.3894 0 104.4C0 125.611 17.1929 142.8 38.4 142.8H156.8C180.65 142.8 200 123.45 200 99.6C200 76.5031 182.438 57.6118 160 55.3672V50Z" />
  </svg>
);
const CloudShapeB = ({ className = "" }) => (
  <svg
    viewBox="0 0 300 100"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M260 55C260 35 245 20 225 20C220 20 215 21 210 23C200 5 175 -5 150 -5C120 -5 95 10 85 30C75 25 60 25 50 30C35 35 25 50 25 65C25 78 35 88 50 88H250C275 88 290 75 290 65C290 55 280 45 260 55Z" />
  </svg>
);

const DaySkyElements = () => {
  const cloudColor = "text-white";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* --- CLOUDS --- */}
      {/* LEFT STACK */}
      <div className="absolute top-[15%] -left-[5%] w-[500px] h-[300px] opacity-90">
        <CloudShapeB
          className={`absolute bottom-0 left-0 w-[400px] h-auto ${cloudColor}`}
        />
        <CloudShapeA
          className={`absolute bottom-[20%] left-[10%] w-[250px] h-auto ${cloudColor}`}
        />
        <CloudShapeB
          className={`absolute -bottom-[10%] left-[20%] w-[350px] h-auto ${cloudColor}`}
        />
      </div>

      {/* RIGHT STACK */}
      <div className="absolute top-[5%] -right-[10%] w-[600px] h-[400px] opacity-80">
        <CloudShapeA
          className={`absolute top-0 right-[10%] w-[300px] h-auto ${cloudColor}`}
        />
        <CloudShapeB
          className={`absolute top-[30%] right-0 w-[500px] h-auto ${cloudColor}`}
        />

        {/* THE FIXED CLOUD: 
             Moved Up (top-15%) and Right (right-40%) 
             It should now sit near the "Top Left" of this cloud stack. 
         */}
        <CloudShapeA
          className={`absolute top-[15%] right-[40%] w-[200px] h-auto ${cloudColor} opacity-70`}
        />
      </div>

      {/* --- BIRD FLOCKS --- */}
      {/* LEFT FLOCK */}
      <div className="absolute top-[25%] left-[15%] scale-110">
        <FlappingBird className="absolute left-6 opacity-90" /> {/* Top */}
        <FlappingBird className="absolute -top-4 -left-10 opacity-70 scale-75" />{" "}
        {/* New Bird */}
        <FlappingBird className="absolute top-8 -left-8 opacity-80 scale-90" />
        <FlappingBird className="absolute top-8 left-20 opacity-80 scale-90" />
        <FlappingBird className="absolute top-16 -left-2 opacity-75 scale-90" />
        <FlappingBird className="absolute top-16 left-14 opacity-75 scale-90" />
        <FlappingBird className="absolute top-2 -left-28 opacity-60 scale-75" />{" "}
        {/* Straggler */}
      </div>

      {/* RIGHT FLOCK */}
      <div className="absolute top-[10%] left-[82%] scale-90">
        <FlappingBird className="opacity-90" />
        <FlappingBird className="absolute top-5 -left-12 opacity-80 scale-90" />
        <FlappingBird className="absolute top-10 -left-20 opacity-75 scale-75" />
        <FlappingBird className="absolute top-4 left-10 opacity-80 scale-90" />
        <FlappingBird className="absolute top-9 left-18 opacity-75 scale-75" />
        <FlappingBird className="absolute top-8 -left-2 opacity-70 scale-75" />
        <FlappingBird className="absolute top-16 left-6 opacity-60 scale-50" />
      </div>
    </div>
  );
};

export default DaySkyElements;
