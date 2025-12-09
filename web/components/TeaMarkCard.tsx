import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

interface TeaMarkCardProps {
  imageUrl?: string;
  name: string;
  description?: string;
  slug?: string;
  position: { left: number; top: number };
}

export default function TeaMarkCard({
  imageUrl,
  name,
  description,
  position,
}: TeaMarkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(!imageUrl);
  const [clamped, setClamped] = useState({
    left: position.left + 20,
    top: position.top - 20,
  });

  // Clamp the card so it stays on screen even when the mark is at the edge.
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const pad = 12; // viewport padding
    const gap = 16; // gap from the mark
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const rect = card.getBoundingClientRect();
    const cardW = rect.width;
    const cardH = rect.height;

    // Try positions in order: top-right, bottom-right, top-left, bottom-left
    const candidates = [
      { left: position.left + gap, top: position.top - cardH - gap }, // top-right
      { left: position.left + gap, top: position.top + gap }, // bottom-right
      { left: position.left - cardW - gap, top: position.top - cardH - gap }, // top-left
      { left: position.left - cardW - gap, top: position.top + gap }, // bottom-left
    ];

    const fits = (c: { left: number; top: number }) =>
      c.left >= pad &&
      c.top >= pad &&
      c.left + cardW + pad <= vw &&
      c.top + cardH + pad <= vh;

    const firstFit = candidates.find(fits) ?? candidates[0];

    const clampedLeft = Math.min(
      Math.max(firstFit.left, pad),
      vw - cardW - pad
    );
    const clampedTop = Math.min(Math.max(firstFit.top, pad), vh - cardH - pad);

    setClamped({ left: clampedLeft, top: clampedTop });
  }, [position.left, position.top]);

  return (
    <div
      ref={cardRef}
      className="absolute z-30 pointer-events-auto"
      style={{
        left: clamped.left,
        top: clamped.top,
      }}
    >
      <div className="bg-black/40 backdrop-blur-md rounded-md shadow-2xl border border-white/20 p-4 md:p-5 w-[240px] md:w-[280px] max-h-[80vh] overflow-hidden animate-[card-entrance_0.3s_ease-out_forwards]">
        {/* Image - Portrait orientation */}
        {imageUrl && (
          <div className="relative w-full h-48 md:h-56 mb-4 rounded-md overflow-hidden bg-white/5">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 240px, 280px"
              onLoadingComplete={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-white/10 animate-pulse" />
            )}
          </div>
        )}

        {/* Content */}
        <div className="text-white">
          <h3 className="text-lg md:text-xl font-bold mb-2">{name}</h3>
          {description && (
            <p className="text-sm md:text-base text-white/90 mb-4 line-clamp-4">
              {description}
            </p>
          )}
        </div>

        {/* Arrow pointing left to the mark */}
        <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2">
          <div className="w-3 h-3 bg-black/40 backdrop-blur-md border-l border-b border-white/20 transform rotate-45" />
        </div>
      </div>
    </div>
  );
}
