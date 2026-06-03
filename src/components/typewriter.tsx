// src/components/TypewriterText.tsx
"use client";

import React, { useEffect, useRef } from "react";
// @ts-ignore - typewriter-effect does not provide typings for the core entrypoint
import Typewriter from "typewriter-effect/dist/core";

interface TypewriterTextProps {
  texts: string[]; // An array of strings to type out
  loop?: boolean; // Optional: Set to true to loop through the texts
  speed?: number; // Optional: Typing speed (default is 40ms per character)
  delay?: number; // Optional: Delay before deleting/starting next string (default is 2500ms)
  className?: string; // Optional: Tailwind CSS classes to apply to the text
  cursorClassName?: string; // Optional: Tailwind CSS classes for the cursor
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  loop = false, // We'll still respect this prop for future use, but for single text, it's false
  speed = 40,
  delay = 2500,
  className,
  cursorClassName, // kept for API compatibility
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textSignature = texts.join("\u0001");

  useEffect(() => {
    const container = containerRef.current;
    if (!container || texts.length === 0) return;

    // Reset on each rerender so the next message starts from a clean state.
    container.innerHTML = "";

    const typewriter = new Typewriter(container, {
      autoStart: false,
      loop,
      delay: speed,
      deleteSpeed: "natural",
      cursor: "|",
    });

    // Defer sequence start so Strict Mode's first effect pass can be cancelled cleanly.
    const startId = window.setTimeout(() => {
      if (texts.length === 1 && !loop) {
        typewriter.typeString(texts[0]).start();
      } else {
        texts.forEach((text, index) => {
          typewriter.typeString(text);
          if (index < texts.length - 1 || loop) {
            typewriter.pauseFor(delay).deleteAll();
          }
        });
        typewriter.start();
      }
    }, 0);

    if (cursorClassName) {
      requestAnimationFrame(() => {
        const cursorEl = container.querySelector(".Typewriter__cursor");
        if (cursorEl) {
          cursorClassName
            .split(" ")
            .filter(Boolean)
            .forEach((cls) => cursorEl.classList.add(cls));
        }
      });
    }

    return () => {
      window.clearTimeout(startId);
      typewriter.stop();
      container.innerHTML = "";
    };
  }, [textSignature, loop, speed, delay, cursorClassName]);

  return (
    <div className={className}>
      <div ref={containerRef} />
    </div>
  );
};

export default TypewriterText;
