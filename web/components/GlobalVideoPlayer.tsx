"use client";

export default function GlobalVideoPlayer() {
  return (
    <div className="fixed left-4 bottom-4 md:left-6 md:bottom-6 z-40 pointer-events-auto">
      <div className="relative w-[180px] md:w-[320px] overflow-hidden rounded-xl shadow-2xl border border-white/20 bg-black/70 backdrop-blur-md">
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
