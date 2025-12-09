"use client";

import { useState } from "react";

export default function GlobalVideoPlayer() {
  const [isDocked, setIsDocked] = useState(false);

  return (
    <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 pointer-events-auto">
      <div
        className="relative w-[180px] md:w-[320px] overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-black/70 backdrop-blur-md transition-transform duration-300 ease-in-out"
        style={{
          transform: isDocked ? "translateX(-98%)" : "translateX(0)",
        }}
      >
        {/* Peek handle (single chevron) */}
        <button
          type="button"
          onClick={() => setIsDocked((p) => !p)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-black/75 border border-white/25 text-white flex items-center justify-center shadow-lg hover:bg-black/90 transition-colors cursor-pointer"
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

        <div style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-300"
            src="https://www.youtube.com/embed/Tx2WCJkLGhs?autoplay=1&mute=1&rel=0&playsinline=1&loop=1&playlist=Tx2WCJkLGhs"
            title="Tea Experience"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
