"use client";

import React from "react";
import { SiTiktok, SiInstagram, SiGithub, SiLinkedin } from "react-icons/si";

export default function Dock() {
  // Base style for all icons: Bigger size (w-8/h-8 to w-10/h-10) & Smooth transition
  const baseClass =
    "w-8 h-8 md:w-10 md:h-10 transition-all duration-300 ease-out cursor-pointer text-slate-500 dark:text-slate-400";

  // Hover Scale: pop up to 1.5x size
  const hoverScale = "hover:scale-150 hover:-translate-y-2";

  return (
    <div
      className="
      fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50
      flex items-center gap-6 md:gap-8 px-8 py-5
      bg-white/40 dark:bg-black/30 
      backdrop-blur-xl 
      rounded-3xl 
      border border-white/40 dark:border-white/10 
      shadow-2xl dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]
    "
    >
      {/* GITHUB: Hover -> Black (Light) / White (Dark) */}
      <a
        href="https://github.com/marstio"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <SiGithub
          className={`${baseClass} ${hoverScale} hover:text-black dark:hover:text-white`}
        />
      </a>

      {/* LINKEDIN: Hover -> LinkedIn Blue (#0077b5) */}
      <a
        href="https://www.linkedin.com/in/julian-ramirez-95a919315/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <SiLinkedin
          className={`${baseClass} ${hoverScale} hover:text-[#0077b5] dark:hover:text-[#0077b5]`}
        />
      </a>

      {/* INSTAGRAM: Hover -> Brand Pink (#E1306C) */}
      <a
        href="https://www.instagram.com/jul.pixx/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <SiInstagram
          className={`${baseClass} ${hoverScale} hover:text-[#E1306C] dark:hover:text-[#E1306C]`}
        />
      </a>

      {/* TIKTOK: Hover -> Black (Light) / White (Dark) */}
      <a
        href="https://www.tiktok.com/@jooleannn"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <SiTiktok
          className={`${baseClass} ${hoverScale} hover:text-black dark:hover:text-white`}
        />
      </a>
    </div>
  );
}
