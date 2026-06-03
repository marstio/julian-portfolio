"use client";

import * as React from "react";

type SoundContextValue = {
  muted: boolean;
  toggleMuted: () => void;
  setMuted: (muted: boolean) => void;
  playSound: (src: string, volume?: number) => void;
};

const SoundContext = React.createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMutedState] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const storedMuted = window.localStorage.getItem("site-muted");
    if (storedMuted !== null) {
      setMutedState(storedMuted === "true");
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }

    window.localStorage.setItem("site-muted", String(muted));
  }, [mounted, muted]);

  const setMuted = React.useCallback((nextMuted: boolean) => {
    setMutedState(nextMuted);
  }, []);

  const toggleMuted = React.useCallback(() => {
    setMutedState((currentMuted) => !currentMuted);
  }, []);

  const playSound = React.useCallback(
    (src: string, volume = 0.6) => {
      if (muted) {
        return;
      }

      const audio = new Audio(src);
      audio.volume = volume;
      void audio.play().catch(() => {
        // Ignore playback errors so the UI stays responsive.
      });
    },
    [muted],
  );

  const value = React.useMemo(
    () => ({ muted, toggleMuted, setMuted, playSound }),
    [muted, playSound, setMuted, toggleMuted],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const context = React.useContext(SoundContext);

  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }

  return context;
}
