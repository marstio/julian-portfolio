"use client";

import { AnimatePresence, motion } from "framer-motion"; // <-- Added motion here
import {
  User,
  Briefcase,
  FileText,
  Mail,
  GraduationCap,
  Code2,
  Gamepad2,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

import WavifyBackground from "../components/wavify";
import TypewriterText from "../components/typewriter";
import StarfieldLayers from "../components/starfield";
import WindowCard from "../components/windowcard";
import { ThemeToggle } from "../components/theme-toggle";
import DaySkyElements from "../components/day-sky-elements";
import Dock from "../components/dock";
import DraggableWindow from "../components/draggable-window";
import { useSound } from "../components/sound-provider";

// A simple auto-playing carousel component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Changes image every 4 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-300 dark:border-white/10 shadow-sm group min-h-[150px] md:min-h-0">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={(src.split("/").pop() || `slide-${index}`)
            .replace(/[-_]/g, " ")
            .replace(/\.[a-zA-Z0-9]+$/, "")}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-3" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // NEW: State for tracking which project's inline drawer is open
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const [greetingStep, setGreetingStep] = useState(0);
  const { playSound } = useSound();

  const constraintsRef = useRef<HTMLElement>(null);
  const accentText = "color: #f59300;";
  const greetingMessages = [
    `hi! <span style="${accentText}">i'm <span class="hover:opacity-50 transition-opacity duration-300 ease-in-out cursor-pointer">Julian.</span></span>`,
    `Hey... <span style="${accentText}">Stop</span> that!`,
    `<span style="${accentText}">Seriously</span>.`,
    `That's not very <span style="${accentText}">nice</span> :(`,
    `This is <span style="${accentText}">awkward</span>.`,
    `Hi again... <span style="${accentText}">I'm <span class="hover:opacity-50 transition-opacity duration-300 ease-in-out cursor-pointer">Julian.</span></span>`,
  ];

  const handleGreetingClick = () => {
    setGreetingStep((current) =>
      Math.min(current + 1, greetingMessages.length - 1),
    );
  };

  const contactEmail = "julian.gabramirez.04@gmail.com";

  const copyContactEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleMascotHover = () => {
    playSound("/sounds/squeak.wav", 0.7);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderAppIcon = (name: string, IconComponent: any) => (
    <div
      onClick={() => setActiveWindow(name)}
      className="group flex flex-col items-center gap-2 cursor-pointer"
    >
      <div
        className="
        w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
        rounded-2xl transition-all duration-300
        bg-white/40 dark:bg-black/30 backdrop-blur-md
        border border-white/60 dark:border-white/20
        shadow-lg group-hover:shadow-xl
        group-hover:scale-110 group-hover:-translate-y-1
      "
      >
        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-slate-700 dark:text-slate-200" />
      </div>

      <span className="font-mono text-xs md:text-sm text-slate-700 dark:text-slate-300 bg-white/30 dark:bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm transition-opacity">
        {name}
      </span>
    </div>
  );

  const shortenFileNameForMobile = (fileName: string) => {
    const lastDotIndex = fileName.lastIndexOf(".");
    const hasExtension = lastDotIndex > 0 && lastDotIndex < fileName.length - 1;

    if (!hasExtension) {
      return fileName.length > 14 ? `${fileName.slice(0, 12)}..` : fileName;
    }

    const name = fileName.slice(0, lastDotIndex);
    const extension = fileName.slice(lastDotIndex);

    if (name.length <= 12) return fileName;
    return `${name.slice(0, 10)}..${extension}`;
  };

  const ImageAttachmentBadge = ({
    src,
    title,
  }: {
    src: string;
    title: string;
  }) => {
    const mobileTitle = shortenFileNameForMobile(title);

    return (
      <button
        onClick={() => setPreviewImage({ src, title })}
        title={title}
        className="flex max-w-full items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded text-[11px] sm:text-xs font-mono hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-rose-500 shrink-0"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>
        <span className="sm:hidden block max-w-[120px] truncate">
          {mobileTitle}
        </span>
        <span className="hidden sm:block">{title}</span>
      </button>
    );
  };

  // NEW: Helper function to render the inline drawer toggle button
  const renderCommandToggle = (projectId: string) => (
    <button
      onClick={() =>
        setExpandedProject((prev) => (prev === projectId ? null : projectId))
      }
      className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:opacity-70 transition-opacity"
    >
      <span className="text-gray-400 dark:text-gray-500">{">"}</span>{" "}
      ./show_assets.sh {projectId}
      <span className="text-gray-400 dark:text-gray-500 ml-1">
        {expandedProject === projectId ? "[-]" : "[+]"}
      </span>
    </button>
  );

  // NEW: Helper function to render the expandable image grid
  const renderProjectAssets = (projectId: string, images: string[]) => (
    <AnimatePresence>
      {expandedProject === projectId && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="mt-3 p-3 bg-black/5 dark:bg-black/40 border border-gray-300 dark:border-white/10 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-3">
            {images.map((img, idx) => (
              // 1. Added a wrapper div to contain the hover zoom effect
              <div
                key={idx}
                className="overflow-hidden rounded border border-gray-300 dark:border-white/10 shadow-sm bg-gray-200 dark:bg-slate-800"
              >
                <img
                  src={img}
                  alt={(() => {
                    const filename =
                      img.split("/").pop() || "asset-" + (idx + 1);
                    return (
                      projectId +
                      " — " +
                      filename
                        .replace(/[-_]/g, " ")
                        .replace(/\.[a-zA-Z0-9]+$/, "")
                    );
                  })()}
                  // 2. Replaced `h-auto` with `aspect-video`, and added a hover scale!
                  className={`w-full aspect-video object-cover hover:scale-105 transition-transform duration-500 cursor-pointer ${
                    projectId === "dlsu-workshop" &&
                    (img.endsWith("/dlsu.jpg") ||
                      img.endsWith("/dlsu3.jpg") ||
                      img.endsWith("/dlsu4.jpg"))
                      ? "object-[50%_70%]"
                      : projectId === "dlsu-workshop"
                        ? "object-bottom"
                        : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return (
    <main
      ref={constraintsRef}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#d0efff] dark:bg-[#0f172a] transition-colors duration-500 ease-in-out flex flex-col justify-center items-center"
    >
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-250 pointer-events-none">
        <DaySkyElements />
      </div>
      <div className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-250 pointer-events-none">
        <StarfieldLayers />
      </div>

      <div className="px-4 w-full flex justify-center pb-20 z-10">
        <WindowCard
          className="transition-colors duration-250"
          onCloseClick={handleGreetingClick}
        >
          <TypewriterText
            key={greetingStep}
            texts={[greetingMessages[greetingStep]]}
            loop={false}
            speed={70}
            delay={2000}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-black dark:text-white font-sans transition-colors duration-200 ease-linear"
          />

          <div
            className={`text-center font-mono text-xs md:text-sm text-slate-600 dark:text-slate-400 transition-opacity duration-1000 ease-in-out ${showSubtitle ? "opacity-100" : "opacity-0"}`}
          >
            developer &nbsp;•&nbsp; data scientist &nbsp;•&nbsp; researcher
          </div>

          <div
            className={`flex gap-6 md:gap-10 mt-10 justify-center transition-all duration-1000 delay-300 ease-out ${showSubtitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {renderAppIcon("about", User)}
            {renderAppIcon("work", Briefcase)}
            {renderAppIcon("projects", FileText)}
            {renderAppIcon("contact", Mail)}
          </div>
        </WindowCard>
      </div>

      <Dock />

      <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
        <WavifyBackground />
      </div>

      <button
        type="button"
        onMouseEnter={handleMascotHover}
        aria-label="Chokee mascot"
        className="group fixed bottom-4 left-4 z-40 flex items-end justify-start focus:outline-none"
      >
        <motion.img
          src="/images/chokee3.png"
          alt="Chokee mascot"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-28 w-28 md:h-32 md:w-32 object-contain transition-all duration-300 ease-out group-hover:drop-shadow-[0_18px_14px_rgba(0,0,0,0.32)] group-focus-visible:drop-shadow-[0_18px_14px_rgba(0,0,0,0.32)]"
          draggable={false}
        />
      </button>

      {/* DRAGGABLE POP-UP WINDOWS */}
      <AnimatePresence>
        {/* --- ABOUT WINDOW --- */}
        {activeWindow === "about" && (
          <DraggableWindow
            key="about-window"
            title="about_me.txt"
            onClose={() => setActiveWindow(null)}
            constraintsRef={constraintsRef}
            maxWidth={850}
            initialTop="6vh"
            fixedContent={
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-sky-100 dark:bg-slate-700 flex-shrink-0 border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/aboutme/Featured.png"
                    alt="Julian's Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left space-y-2 mt-2 md:mt-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Julian Gabriel Ramirez
                  </h2>
                  <p className="text-sm md:text-base opacity-90 leading-relaxed">
                    4th-year Computer Science student specializing in Data
                    Science. <br />
                    Based in North Caloocan, Metro Manila.
                  </p>
                </div>
              </div>
            }
          >
            <div className="space-y-6 pr-2 md:pr-4">
              {/* Education */}
              <section className="flex flex-col md:flex-row gap-5 items-stretch">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <ImageCarousel
                    images={[
                      "/images/aboutme/Online.png",
                      "/images/aboutme/CSS.jpg",
                    ]}
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-sky-500" />
                    Academic Journey
                  </h3>
                  <div className="opacity-90 leading-relaxed text-sm text-gray-700 dark:text-gray-300 space-y-2 text-justify">
                    <p>
                      I recently graduated from the University of Santo Tomas in
                      Computer Science, specializing in Data Science. Aiming to
                      solve real-world problems, my thesis focused on mitigating{" "}
                      <span className="text-sky-500 dark:text-sky-400 font-medium">
                        spatial bias in flood risk prediction models
                      </span>{" "}
                      for the Philippines, and our team is currently working on
                      getting it published.
                    </p>
                    <p>
                      I genuinely love this field for the challenge of building
                      things from scratch and solving tricky problems to create
                      functional software. Looking ahead, I am considering a
                      Master's degree to dive deeper into the complex algorithms
                      and computing principles behind it all.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200 dark:border-white/10" />

              {/* Tech & Projects */}
              <section className="flex flex-col md:flex-row gap-5 items-stretch">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <ImageCarousel
                    images={[
                      "/images/aboutme/cics.png",
                      "/images/aboutme/tomweb.jpg",
                    ]}
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-amber-500" />
                    Tech & Projects
                  </h3>
                  <p className="opacity-90 leading-relaxed text-sm mb-3 text-gray-700 dark:text-gray-300">
                    I spend most of my time building full-stack web apps and
                    wrangling data. My go-to tools are{" "}
                    <span className="text-amber-500 font-medium">
                      Next.js, React, and TypeScript.
                    </span>
                  </p>
                  <ul className="list-disc ml-4 space-y-1 opacity-90 text-sm text-gray-700 dark:text-gray-300">
                    <li>
                      Completed a Software Engineering internship at{" "}
                      <strong>Amdocs</strong>.
                    </li>
                    <li>
                      Building <strong>Commit</strong>, a developer-focused
                      habit tracker.
                    </li>
                    <li>
                      Leading frontend development for the{" "}
                      <strong>Angat Bayanihan Volunteer Network (ABVN)</strong>{" "}
                      microsite.
                    </li>
                  </ul>
                </div>
              </section>

              <hr className="border-gray-200 dark:border-white/10" />

              {/* Off Keyboard */}
              <section className="flex flex-col md:flex-row gap-5 items-stretch">
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <ImageCarousel
                    images={[
                      "/images/aboutme/bar.jpg",
                      "/images/aboutme/sun.jpg",
                    ]}
                  />
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Gamepad2 className="w-6 h-6 text-emerald-500" />
                    Off the Keyboard
                  </h3>
                  <p className="opacity-90 leading-relaxed text-sm text-gray-700 dark:text-gray-300">
                    Outside of coding, I'm usually catching up on{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Frieren
                    </span>{" "}
                    or{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Blue Lock
                    </span>
                    , diving into titles like{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Until Then
                    </span>
                    ,<em> FNAF</em>, and <em>TETR.IO</em>, or watching
                    basketball court and hitting the football field. I also have
                    a passion for constantly maxing out my "life stats" by
                    picking up new skills, whether that's learning Blender,
                    studying music theory, or building out my home lab.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 dark:border-white/10" />

              {/* Others Section */}
              <section className="pt-2">
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                  Other quick facts:
                </h3>
                <ul className="list-disc ml-5 space-y-2 opacity-90 text-sm">
                  <li>
                    This portfolio UI design was inspired by Sharlene Yap's
                    website!
                  </li>
                  <li>
                    That's it for now, there are some more projects I'm working
                    on in the background that I'll release soon :)
                  </li>
                  <li>
                    The dog chibi on the bottom left was commissioned from{" "}
                    <a
                      href="https://x.com/082507v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-500 dark:text-sky-400 font-medium hover:underline"
                    >
                      Losea (@082507v)
                    </a>
                    .
                  </li>
                </ul>
                <p className="mt-4 text-sm opacity-80">
                  See more on{" "}
                  <a
                    href="https://github.com/marstio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-500 font-medium hover:underline"
                  >
                    GitHub
                  </a>
                </p>
              </section>
            </div>
          </DraggableWindow>
        )}

        {/* --- WORK WINDOW --- */}
        {activeWindow === "work" && (
          <DraggableWindow
            key="work-window"
            title="experience.sh"
            onClose={() => setActiveWindow(null)}
            constraintsRef={constraintsRef}
          >
            <div className="space-y-8">
              {/* Amdocs */}
              <div>
                <h2 className="text-xl font-bold">Software Engineer Intern</h2>
                <p className="text-rose-500 dark:text-rose-400 font-mono text-sm mt-1">
                  Amdocs | Jan 2026 - Apr 2026
                </p>
                <ul className="list-disc ml-5 mt-3 opacity-90 space-y-2 text-sm leading-relaxed">
                  <li>
                    Engineered a centralized Next.js (TypeScript) dashboard for
                    Korean Telecom to monitor real-time server health metrics
                    (CPU, RAM, Disk) across multiple remote nodes using
                    node-ssh.
                  </li>
                  <li>
                    Fortified application security by implementing HMAC-signed
                    httpOnly session cookies, strict input sanitization, and
                    rate-limiting protocols.
                  </li>
                  <li>
                    Architected end-to-end operational auditability by securely
                    logging all user actions to an Oracle database via SSH and
                    sqlplus, while optimizing UI performance through client-side
                    status caching and controlled concurrency.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ImageAttachmentBadge
                    src="/images/experience/KT.png"
                    title="kt_dashboard_v1.png"
                  />
                  <ImageAttachmentBadge
                    src="/images/experience/interns.jpg"
                    title="amdocs_interns.png"
                  />
                </div>
              </div>

              {/* TomasinoWeb */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-5">
                <h2 className="text-xl font-bold">Front-end Developer</h2>
                <p className="text-yellow-500 dark:text-yellow-400 font-mono text-sm mt-1">
                  TomasinoWeb | 2025 - Present
                </p>
                <ul className="list-disc ml-5 mt-3 opacity-90 space-y-2 text-sm leading-relaxed">
                  <li>
                    Contributed to the development of over 4 websites, focusing
                    on coding key components to enhance functionality and user
                    experience.
                  </li>
                  <li>
                    Collaborated seamlessly with a cross-functional team to
                    ensure the successful integration of various website
                    features.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ImageAttachmentBadge
                    src="/images/experience/jointomasinoweb.jpg"
                    title="tw_r101.jpg"
                  />
                </div>
              </div>

              {/* Computer Science Society */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-5">
                <h2 className="text-xl font-bold">
                  Executive Associate of the President
                </h2>
                <p className="text-blue-500 dark:text-blue-400 font-mono text-sm mt-1">
                  UST Computer Science Society | 2025 - Present
                </p>
                <ul className="list-disc ml-5 mt-3 opacity-90 space-y-2 text-sm leading-relaxed">
                  <li>
                    Drove the execution of 3+ key organizational initiatives by
                    proactively identifying areas of contribution and ensuring
                    strategic alignment with the President's vision.
                  </li>
                  <li>
                    Facilitated and managed high-level communication between the
                    President's office and cross-functional committees to ensure
                    project coherence.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ImageAttachmentBadge
                    src="/images/experience/assem.jpeg"
                    title="css_assembly_2025.png"
                  />
                </div>
              </div>

              {/* Community Development Volunteer */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-5">
                <h2 className="text-xl font-bold">
                  Community Development Volunteer
                </h2>
                <p className="text-green-600 dark:text-green-400 font-mono text-sm mt-1">
                  Sierra Madre | 2024
                </p>
                <ul className="list-disc ml-5 mt-3 opacity-90 space-y-2 text-sm leading-relaxed">
                  <li>
                    Collaborated with a team to develop a community website for
                    Sierra Madre using the React Framework.
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ImageAttachmentBadge
                    src="/images/experience/savesierramadre.jpg"
                    title="save_sierra_madre.png"
                  />
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* --- PROJECTS WINDOW --- */}
        {activeWindow === "projects" && (
          <DraggableWindow
            key="projects-window"
            title="projects.json"
            onClose={() => setActiveWindow(null)}
            constraintsRef={constraintsRef}
          >
            <div className="space-y-6">
              {/* Flood Risk Prediction Thesis */}
              <div>
                <h2 className="text-xl font-bold">
                  Flood Risk Prediction Thesis
                </h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Data Science / Machine Learning
                </p>
                <div className="opacity-90 mt-2 text-sm leading-relaxed space-y-3">
                  <p className="italic">
                    "A Residual-Driven Cascading Hybrid Spatially-Aware Random
                    Forest and XGBoost Approach for Spatial Bias Mitigation in
                    Philippine Urban-Rural Flood Risk Prediction."
                  </p>
                  <p>
                    Awarded <strong>Best Thesis</strong>, this research
                    addresses the critical challenge of flood risk forecasting
                    in the Philippines by accounting for the vast geographical
                    differences between urban centers and rural provinces.
                    Instead of relying on traditional models that struggle with
                    spatial variations, our team engineered a hybrid machine
                    learning solution:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Core Architecture:</strong> Cascaded Random Forest
                      and XGBoost algorithms to build a robust predictive
                      baseline.
                    </li>
                    <li>
                      <strong>Bias Mitigation:</strong> Integrated spatial
                      autocorrelation testing to actively target and reduce
                      spatial bias, ensuring the algorithm accurately interprets
                      diverse terrains.
                    </li>
                    <li>
                      <strong>Real-World Impact:</strong> Delivered a reliable,
                      terrain-aware predictive tool designed to enhance local
                      disaster risk reduction and planning efforts.
                    </li>
                  </ul>
                </div>
                {renderCommandToggle("thesis")}
                {renderProjectAssets("thesis", [
                  "/images/projects/best-thesis.jpg",
                  "/images/projects/thesis-dashboard.png",
                  "/images/projects/bastemayor.png",
                  "/images/projects/ustt.jpg",
                ])}
              </div>

              {/* Victimatch */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-4">
                <h2 className="text-xl font-bold">Victimatch</h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Hackathon / Next.js / Firebase
                </p>
                <div className="opacity-90 mt-3 text-sm leading-relaxed space-y-4">
                  <p>
                    Built during a fast-paced hackathon at Ateneo, Victimatch is
                    a disaster response platform designed to bridge the critical
                    gap between those in need and those ready to help.
                  </p>
                  <p>
                    To ensure rapid response times, we engineered an{" "}
                    <strong>AI-powered matching system</strong> that categorizes
                    emergency requests and seamlessly connects victims with
                    verified volunteers. By integrating{" "}
                    <strong>Next.js, Firebase, and WebSockets</strong> with the{" "}
                    <strong>Google Maps API</strong>, the platform provides
                    real-time location tracking and secure registration.
                  </p>
                  <p>
                    Beyond its technical architecture, the project is deeply
                    rooted in the Filipino values of <em>bayanihan</em> and{" "}
                    <em>pakikipagkapwa-tao</em>—leveraging tech to build a
                    highly accessible network driven by compassion, commitment,
                    and competence during national crises.
                  </p>
                </div>
                {renderCommandToggle("victimatch")}
                {renderProjectAssets("victimatch", [
                  "/images/projects/compsat.jpg",
                  "/images/projects/compsat2.jpg",
                  "/images/projects/compsat3.jpg",
                  "/images/projects/victimatch2.png",
                ])}
              </div>

              {/* DLSU Data Science Workshop */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-4">
                <h2 className="text-xl font-bold">
                  Data Science Workshop @ DLSU
                </h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Masterclass / Python / SQL / Tableau / Excel
                </p>
                <div className="opacity-90 mt-3 text-sm leading-relaxed space-y-4 text-justify">
                  <p>
                    I attended an intensive, four-session data science workshop
                    hosted at De La Salle University. The program was led by Dr.
                    Jennifer Widom, the Dean of Engineering at Stanford
                    University, as part of her international instructional
                    series.
                  </p>
                  <p>
                    The curriculum was entirely hands-on, focusing on practical
                    data manipulation and analysis. Across the sessions, we
                    worked directly with core data tools, covering advanced
                    spreadsheet analysis in Excel, database querying with SQL,
                    statistical data testing in Python, and building interactive
                    visualization dashboards using Tableau.
                  </p>
                  <p>
                    I am incredibly thankful for this experience. Having the
                    opportunity to learn these core data principles directly
                    under a Stanford professor alongside fellow student
                    developers was both highly challenging and deeply rewarding.
                  </p>
                </div>
                {renderCommandToggle("dlsu-workshop")}
                {renderProjectAssets("dlsu-workshop", [
                  "/images/projects/dlsu.jpg",
                  "/images/projects/dlsu2.jpg",
                  "/images/projects/dlsu3.jpg",
                  "/images/projects/dlsu4.jpg",
                ])}
              </div>

              {/* School Organization Works */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-4">
                <h2 className="text-xl font-bold">School Organization Works</h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Front End / Typescript / NextJS / Firebase / React
                </p>
                <p className="opacity-90 mt-2 text-sm leading-relaxed">
                  CSS and TomasinoWeb projects for the University of Santo Tomas
                  Computer Science
                </p>
                {renderCommandToggle("org_works")}
                {renderProjectAssets("org_works", [
                  "/images/projects/uaap-tomasinoweb.jpg",
                  "/images/projects/savesierramadre.jpg",
                  "/images/projects/jointomasinoweb.jpg",
                  "/images/projects/AngatBuhay.png",
                ])}
              </div>

              {/* FoodLoop PH */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-4">
                <h2 className="text-xl font-bold">FoodLoop PH</h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Startup MVP
                </p>
                <p className="opacity-90 mt-2 text-sm leading-relaxed">
                  A marketplace platform designed to rescue surplus food from
                  restaurants, applying lean canvas business models.
                </p>
                {renderCommandToggle("foodloop")}
                {renderProjectAssets("foodloop", [
                  "https://placehold.co/600x400/1e293b/ffffff?text=FoodLoop+App+UI",
                ])}
              </div>

              {/* Java 2D Animations */}
              <div className="border-t border-gray-300 dark:border-white/10 pt-4">
                <h2 className="text-xl font-bold">Java 2D Animations</h2>
                <p className="text-amber-500 font-mono text-xs mt-1">
                  Creative Coding
                </p>
                <p className="opacity-90 mt-2 text-sm leading-relaxed">
                  Developed extensive problem-solving scripts using Java 2D
                  graphics, focusing on shape transformations and custom
                  animations.
                </p>
                {renderCommandToggle("java2d")}
                {renderProjectAssets("java2d", [
                  "https://placehold.co/600x400/1e293b/ffffff?text=Java+Output+Window",
                ])}
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* --- CONTACT WINDOW --- */}
        {activeWindow === "contact" && (
          <DraggableWindow
            key="contact-window"
            title="contact.exe"
            onClose={() => setActiveWindow(null)}
            constraintsRef={constraintsRef}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 px-4 max-w-[520px] mx-auto">
              <div className="flex items-center gap-3">
                <Mail className="w-7 h-7 text-sky-500" />
                <h2 className="text-2xl font-bold">Let's Connect!</h2>
              </div>

              <p className="opacity-90">
                I'm always open to new opportunities, collaborations, or a quick
                chat — feel free to reach out by email.
              </p>

              <img
                src="/images/aboutme/Featured.png"
                alt="Chokee holding an envelope"
                className="w-40 h-40 object-contain rounded-md shadow-md"
              />

              <div className="text-sm opacity-90">
                <div className="mb-3">
                  <span className="text-xs text-slate-500 mr-2">
                    email me at:
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sky-500 font-medium underline-offset-2 hover:underline"
                  >
                    {contactEmail}
                  </a>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <a
                    href={`mailto:${contactEmail}?subject=Portfolio%20Contact&body=Hi%20Julian%2C%0A%0A`}
                    className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
                  >
                    Send me an email
                  </a>

                  <button
                    type="button"
                    onClick={copyContactEmail}
                    className="px-3 py-2 text-sm font-mono text-sky-700 dark:text-sky-300 bg-white/80 dark:bg-black/20 rounded-md border border-sky-200 dark:border-sky-700 hover:bg-white transition-colors"
                  >
                    {emailCopied ? "Copied" : "Copy email"}
                  </button>
                </div>
              </div>
            </div>
          </DraggableWindow>
        )}

        {/* --- IMAGE PREVIEW WINDOW --- */}
        {previewImage && (
          <DraggableWindow
            key={`preview-${previewImage.title}`}
            title={`Preview - ${previewImage.title}`}
            onClose={() => setPreviewImage(null)}
            constraintsRef={constraintsRef}
          >
            <div className="flex justify-center items-center p-2 bg-gray-100 dark:bg-black/30 rounded-lg overflow-hidden min-h-[200px]">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-w-full max-h-[50vh] object-contain rounded shadow-sm border border-gray-300 dark:border-white/10"
              />
            </div>
          </DraggableWindow>
        )}
      </AnimatePresence>
    </main>
  );
}
