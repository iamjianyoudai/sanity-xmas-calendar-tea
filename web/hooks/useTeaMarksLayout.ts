"use client";

import { useState, useEffect, useRef } from "react";

export interface Layout {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export function useTeaMarksLayout(imageSrc: string = "/teaImageBg2.png") {
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);
  const [layout, setLayout] = useState<Layout>({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const calculateLayout = (aspect: number) => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const containerAspect = clientWidth / clientHeight;

    // object-cover math: compute rendered box size and crop offsets
    let width: number;
    let height: number;
    let offsetX = 0;
    let offsetY = 0;

    if (aspect > containerAspect) {
      // Image is wider relative to container: match height, crop left/right
      height = clientHeight;
      width = height * aspect;
      offsetX = (clientWidth - width) / 2;
    } else {
      // Image is taller relative to container: match width, crop top/bottom
      width = clientWidth;
      height = width / aspect;
      offsetY = (clientHeight - height) / 2;
    }

    setLayout({ width, height, offsetX, offsetY });
  };

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      setImageAspectRatio(aspectRatio);
      // Initial calculation uses current container dimensions with cover math
      calculateLayout(aspectRatio);
    };
    img.src = imageSrc;

    const handleResize = () => {
      if (imageAspectRatio) calculateLayout(imageAspectRatio);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imageAspectRatio, imageSrc]);

  // Recalculate on container size changes (beyond window resize)
  useEffect(() => {
    if (!containerRef.current || !imageAspectRatio) return;
    const observer = new ResizeObserver(() => {
      calculateLayout(imageAspectRatio);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [imageAspectRatio]);

  return {
    layout,
    containerRef,
    imageRef,
  };
}
