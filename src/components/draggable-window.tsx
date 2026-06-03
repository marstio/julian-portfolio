"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DraggableWindowProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  constraintsRef?: React.RefObject<HTMLElement | null>;
  fixedContent?: React.ReactNode;
  // NEW: Control the exact width of each window individually!
  maxWidth?: number;
  initialTop?: string;
}

export default function DraggableWindow({
  title,
  onClose,
  children,
  constraintsRef,
  fixedContent,
  maxWidth = 850, // Defaults to 850px if you don't specify one
  initialTop = "10vh",
}: DraggableWindowProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0}
      initial={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0 }}
      animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1 }}
      exit={isMobile ? { opacity: 0, y: "100%" } : { opacity: 0 }}
      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      className={`
        z-[60] flex flex-col overflow-hidden border border-white/40 dark:border-white/20 
        bg-white/30 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        ${
          isMobile
            ? "fixed inset-x-0 bottom-0 w-full h-[85vh] rounded-t-3xl rounded-b-none"
            : "absolute rounded-xl"
        }
      `}
      // UPDATED: Dynamic math to perfectly center the window no matter what maxWidth you pass to it!
      style={
        isMobile
          ? {}
          : {
              width: `min(90vw, ${maxWidth}px)`,
              top: initialTop,
              left: `calc(50vw - min(45vw, ${maxWidth / 2}px))`,
            }
      }
    >
      {/* HEADER BAR */}
      <div
        className={`
        group relative bg-white/40 dark:bg-slate-900/60 border-b border-gray-300/50 dark:border-white/10 px-4 py-3 flex items-center justify-between 
        ${isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"}
      `}
      >
        <div className="flex gap-2 z-10">
          <button
            type="button"
            onClick={onClose}
            title="Close Window"
            className="w-3 h-3 rounded-full bg-rose-400 dark:bg-rose-500 border border-black/10 shadow-sm hover:brightness-75 transition-all flex items-center justify-center"
          >
            <svg
              viewBox="0 0 10 10"
              className="h-1.5 w-1.5 opacity-0 text-black/70 transition-opacity duration-200 group-hover:opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M1.5 2.5l6 6M7.5 2.5L1.5 8.5" />
            </svg>
          </button>
          <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500 border border-black/10 shadow-sm flex items-center justify-center">
            <svg
              viewBox="0 0 10 10"
              className="h-2 w-2 opacity-0 text-black/70 transition-opacity duration-200 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M1.9 5.3h6.2" />
            </svg>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 dark:bg-emerald-500 border border-black/10 shadow-sm flex items-center justify-center">
            <svg
              viewBox="0 0 10 10"
              className="h-2 w-2 opacity-0 text-black/70 transition-opacity duration-200 group-hover:opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Arrow 1: Points towards top-right */}
              <path d="M5.5 2h2.5v2.5" />

              {/* Arrow 2: Points towards bottom-left */}
              <path d="M4.5 8H2V5.5" />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-14 md:px-16">
          <span className="block w-full truncate text-center font-mono text-[11px] md:text-sm text-gray-700 dark:text-gray-300 font-medium tracking-wide">
            {title}
          </span>
        </div>

        <div className="w-12"></div>
      </div>

      {/* CONTENT BODY WRAPPER */}
      <div className="flex flex-col flex-grow overflow-hidden">
        {/* FIXED HEADER */}
        {fixedContent && (
          <div className="px-6 md:px-8 pt-6 md:pt-8 shrink-0 cursor-auto">
            {fixedContent}
            <hr className="mt-6 border-gray-300/50 dark:border-white/10" />
          </div>
        )}

        {/* SCROLLABLE BODY */}
        <div
          className={`
          overflow-y-auto cursor-auto text-gray-800 dark:text-gray-200 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-gray-300/80 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600/80 
          [&::-webkit-scrollbar-thumb]:rounded-full
          ${fixedContent ? "p-6 md:p-8 pt-6" : "p-6 md:p-8"} 
          ${isMobile ? "h-full pb-20" : "max-h-[65vh]"}
        `}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
