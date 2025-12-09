"use client";

import { useState } from "react";

export default function GlobalVideoPlayer() {
  const [isDocked, setIsDocked] = useState(false);

  return (
    <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 pointer-events-auto">
      {/* Wrapper that slides both video and button together */}
      <div
        className="flex items-center gap-2 transition-transform duration-300 ease-in-out group"
        style={{
          transform: isDocked ? "translateX(-98%)" : "translateX(0)",
        }}
      >
        {/* Video container */}
        <div className="relative w-[180px] md:w-[320px] overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-black/70 backdrop-blur-md flex-shrink-0">
          <div style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              src="https://www.youtube.com/embed/Tx2WCJkLGhs?autoplay=1&mute=1&rel=0&playsinline=1&loop=1&playlist=Tx2WCJkLGhs"
              title="Tea Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Button outside video container - hidden by default, shown on hover or when docked */}
        <button
          type="button"
          onClick={() => setIsDocked((p) => !p)}
          className={`h-9 w-9 rounded-full bg-black/75 border border-white/25 text-white flex items-center justify-center shadow-lg hover:bg-black/90 transition-all duration-300 cursor-pointer flex-shrink-0 ${
            isDocked
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          }`}
          aria-label={isDocked ? "Slide video out" : "Slide video in"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            style={{ transform: isDocked ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
