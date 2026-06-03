"use client";

import * as React from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSound } from "./sound-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const { muted, toggleMuted, playSound } = useSound();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleToggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    const soundFile =
      nextTheme === "dark" ? "/sounds/night.mp3" : "/sounds/morning.mp3";

    playSound(soundFile);

    setTheme(nextTheme);
  };

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={handleToggleTheme}
        className="
          p-2 
          hover:scale-105 active:scale-95 
          transition-transform duration-150 ease-in-out
          focus:outline-none
        "
        aria-label="Toggle Theme"
      >
        <span className="relative flex h-9 w-9 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {resolvedTheme === "dark" ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-9 w-9 text-slate-700 fill-slate-700" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-9 w-9 text-yellow-400 fill-yellow-400" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      <button
        type="button"
        onClick={toggleMuted}
        className="
          p-2
          hover:scale-105 active:scale-95
          transition-transform duration-150 ease-in-out
          focus:outline-none
        "
        aria-label={muted ? "Unmute site sounds" : "Mute site sounds"}
        aria-pressed={muted}
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {muted ? (
              <motion.span
                key="mute"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <VolumeX
                  className={`h-7 w-7 ${
                    resolvedTheme === "dark"
                      ? "text-slate-200 opacity-40"
                      : "text-slate-700 opacity-40"
                  }`}
                />
              </motion.span>
            ) : (
              <motion.span
                key="unmute"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Volume2
                  className={`h-7 w-7 ${
                    resolvedTheme === "dark"
                      ? "text-slate-200 opacity-90"
                      : "text-slate-700 opacity-90"
                  }`}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
}
