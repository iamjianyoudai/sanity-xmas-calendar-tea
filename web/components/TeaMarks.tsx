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
            <div className="mark-outer group w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/70 shadow-lg flex items-center justify-center transition-all duration-300 opacity hover:scale-110 md:hover:scale-110 lg:hover:scale-125">
              <div
                className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full bg-gray-100 transition-colors duration-300 group-hover:bg-[color]"
                style={{
                  backgroundColor:
                    isActive && mark.slug !== "white-tea"
                      ? mark.color
                      : "white",
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
