"use client";

import TeaMarkCard from "@/components/TeaMarkCard";

type Layout = {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

interface TeaMarksProps {
  marks: {
    id: number;
    x: number;
    y: number;
    color: string;
    label: string;
    name: string;
    description: string;
    imageUrl: string;
    slug: string;
  }[];
  layout: Layout;
  clickedMarkId: number | null;
  onToggle: (id: number) => void;
}

export default function TeaMarks({
  marks,
  layout,
  clickedMarkId,
  onToggle,
}: TeaMarksProps) {
  if (!layout.width || !layout.height) return null;

  return (
    <>
      {marks.map((mark) => {
        const left = layout.offsetX + mark.x * layout.width;
        const top = layout.offsetY + mark.y * layout.height;
        const isActive = clickedMarkId === mark.id;
        return (
          <div
            key={mark.id}
            className="absolute group cursor-pointer z-10"
            style={{
              left,
              top,
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(mark.id);
            }}
          >
            <div className="mark-outer group w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/40 shadow-lg flex items-center justify-center transition-all duration-300 opacity hover:scale-110 md:hover:scale-110 lg:hover:scale-125">
              <div
                className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full bg-gray-100/80 transition-colors duration-300 group-hover:bg-[color]"
                style={{
                  backgroundColor:
                    isActive && mark.slug !== "white-tea"
                      ? mark.color
                      : "rgba(255, 255, 255, 0.8)",
                }}
              />
            </div>
          </div>
        );
      })}

      {marks.map((mark) => {
        const shouldShow = clickedMarkId === mark.id;
        if (!shouldShow) return null;
        const left = layout.offsetX + mark.x * layout.width;
        const top = layout.offsetY + mark.y * layout.height;
        return (
          <TeaMarkCard
            key={`card-${mark.id}`}
            imageUrl={mark.imageUrl}
            name={mark.name}
            description={mark.description}
            slug={mark.slug}
            position={{ left, top }}
          />
        );
      })}
    </>
  );
}
