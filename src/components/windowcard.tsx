import React from "react";

interface WindowCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  onCloseClick?: () => void;
}

const WindowCard: React.FC<WindowCardProps> = ({
  title = "julian@portfolio:~",
  children,
  className = "",
  onCloseClick,
}) => {
  return (
    // MAIN WRAPPER
    <div
      className={`
      relative z-10 w-full max-w-3xl 
      rounded-xl overflow-hidden 

      shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]

      border border-white/40 dark:border-white/10
      bg-white/30 dark:bg-slate-900/40
      backdrop-blur-xl
      transition-all duration-500
      ${className}
    `}
    >
      {/* HEADER BAR */}
      <div
        className="
        group
        bg-white/40 dark:bg-slate-900/50
        border-b border-gray-300/50 dark:border-white/10
        px-4 py-3 
        flex items-center justify-between
      "
      >
        {/* BUTTONS */}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onCloseClick}
            aria-label="Change greeting"
            className="w-3 h-3 rounded-full bg-rose-400 dark:bg-rose-500 border border-black/10 shadow-sm flex items-center justify-center"
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
              className="h-2 w-2 opacity-0 text-black/70 transition-opacity duration-200 group-hover:opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <path d="M2.0 5.3h7" />
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

        {/* TITLE */}
        <div
          className="
          font-mono text-xs md:text-sm 
          text-gray-700 dark:text-gray-300 
          font-medium tracking-wide select-none 
          flex items-center gap-2
        "
        >
          <span className="opacity-70">📁</span>
          {title}
        </div>

        <div className="w-12"></div>
      </div>

      {/* CONTENT BODY */}
      <div
        className="
        bg-transparent
        p-12 flex flex-col items-center justify-center min-h-[400px]
      "
      >
        {children}
      </div>
    </div>
  );
};

export default WindowCard;
