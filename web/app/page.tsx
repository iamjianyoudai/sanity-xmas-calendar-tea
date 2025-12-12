"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import TeaMarks from "@/components/TeaMarks";
import TeaModal from "@/components/TeaModal";
import { client } from "@/lib/sanity";
import { homepageQuery, teaTypeBySlugQuery } from "@/lib/queries";
import { marks as marksData } from "@/components/marksData";
import { useTeaMarksLayout } from "@/hooks/useTeaMarksLayout";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { Tea } from "@/types/sanity";

interface TeaTypeData {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  flavorNotes?: string[];
  brewingInstructions?: {
    amount?: string;
    temperature?: string;
    steepTime?: string;
  };
  relatedTeas?: Array<{
    _id: string;
    name: string;
    slug?: string;
    imageUrl?: string;
    description?: string;
    flavorNotes?: string[];
  }>;
}

export default function Home() {
  const [homeContent, setHomeContent] = useState<{
    headerTitle?: string;
    subtitle?: string;
    teaTypes?: Array<{
      _id: string;
      name: string;
      slug: string;
    }>;
  }>({});
  const [clickedMarkId, setClickedMarkId] = useState<number | null>(null);
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [selectedTeaType, setSelectedTeaType] = useState<TeaTypeData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingTea, setIsLoadingTea] = useState(false);

  const marks = useMemo(() => marksData, []);
  const { layout, containerRef, imageRef } = useTeaMarksLayout();

  useEffect(() => {
    // Debug: list available tea type slugs to verify data presence
    client
      .withConfig({ useCdn: false })
      .fetch(`*[_type == "teaType"]{name,"slug": slug.current}`)
      .catch((err) => {
        console.error("Error listing tea types:", err);
      });

    // Fetch homepage content (title, subtitle, tea list)
    client
      .withConfig({ useCdn: false })
      .fetch(homepageQuery)
      .then((data) => {
        setHomeContent(data && typeof data === "object" ? data : {});
      })
      .catch((err) => {
        console.error("Error fetching homepage content:", err);
        setHomeContent({});
      });
  }, []);

  // Close card when clicking outside
  useClickOutside(clickedMarkId !== null, () => setClickedMarkId(null));

  const handleTeaClick = async (slug: string) => {
    setIsLoadingTea(true);
    setIsModalOpen(true);
    try {
      // When clicking from homepage, we're clicking a tea type (e.g., "Green Tea")
      // So we only need to fetch the teaType, not an individual tea
      const typeModal = await client
        .withConfig({ useCdn: false })
        .fetch(teaTypeBySlugQuery, { slug });

      if (!typeModal) {
        console.warn("Tea type not found for slug:", slug);
        setSelectedTea(null);
        setSelectedTeaType(null);
        return;
      }

      // Set only teaType data (not individual tea)
      setSelectedTea(null);
      setSelectedTeaType(typeModal);
    } catch (error) {
      console.error("Error fetching tea type data:", error);
      setSelectedTea(null);
      setSelectedTeaType(null);
    } finally {
      setIsLoadingTea(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTea(null);
    setSelectedTeaType(null);
  };

  const teaTypeItems = useMemo(
    () => (Array.isArray(homeContent.teaTypes) ? homeContent.teaTypes : []),
    [homeContent.teaTypes]
  );

  const headerTitle = homeContent.headerTitle || "";

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-[#1a1a1a]">
        {/* Image Container - IKEA's aspect-ratio-box technique */}
        <div className="relative w-full h-full flex items-center justify-center p-2 md:p-0 overflow-hidden">
          <div
            ref={containerRef}
            className="relative w-full h-full max-w-full max-h-full"
          >
            {/* Image container - absolutely positioned to fill the aspect ratio box */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                ref={imageRef}
                src="/teaImageBg2.png"
                alt="Traditional Chinese tea set"
                fill
                className="object-cover object-center"
                priority
                sizes="100vw"
              />

              <TeaMarks
                marks={marks}
                layout={layout}
                clickedMarkId={clickedMarkId}
                onToggle={(id) =>
                  setClickedMarkId(clickedMarkId === id ? null : id)
                }
              />
            </div>
          </div>
        </div>

        {/* Text Overlay - Top Left with tea list below */}
        <div className="absolute top-0 left-0 z-20">
          <div className="pt-6 pl-6 md:pt-10 md:pl-10 lg:pt-12 lg:pl-12">
            <div className="max-w-4xl space-y-3">
              <div className="ml-2 md:ml-3 lg:ml-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight pointer-events-none font-thin max-w-[14ch] whitespace-normal break-words">
                  {headerTitle}
                </h1>
                {/* <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light pointer-events-none mt-2 md:mt-3">
                  {subtitle}
                </p> */}
              </div>
              <div className="flex gap-3 md:gap-4 flex-wrap lg:flex-nowrap items-center mt-4 md:mt-6 lg:mt-8">
                {teaTypeItems.map((teaType, idx) => {
                  if (!teaType || !teaType.slug) return null;
                  return (
                    <button
                      type="button"
                      key={teaType._id || `tea-type-${idx}`}
                      onClick={() => handleTeaClick(teaType.slug)}
                      className="px-3 py-2 md:px-4 text-gray-100 hover:text-white/100 text-lg md:text-xl lg:text-2xl font-base transition-colors duration-200 hover:bg-white/30 rounded-md cursor-pointer whitespace-nowrap underline decoration-white/60 hover:no-underline underline-offset-4"
                    >
                      {teaType.name}
                    </button>
                  );
                })}
                <Link
                  href="/teas"
                  className="px-3 py-2 md:px-4 text-gray-100 hover:text-white/100 text-lg md:text-xl lg:text-2xl font-base transition-colors duration-200 hover:bg-white/20 rounded-md cursor-pointer whitespace-nowrap underline decoration-white/40 hover:no-underline underline-offset-4"
                >
                  Explore all teas
                </Link>
                <Link
                  href="/page/master-the-art-of-tea-brewing"
                  className="px-3 py-2 md:px-4 text-gray-100 hover:text-white/100 text-lg md:text-xl lg:text-2xl font-base transition-colors duration-200 hover:bg-white/20 rounded-md cursor-pointer whitespace-nowrap underline decoration-white/40 hover:no-underline underline-offset-4"
                >
                  Brewing guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tea Modal */}
      <TeaModal
        tea={selectedTea}
        teaTypeData={selectedTeaType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {isLoadingTea && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-transparent rounded-md p-8 shadow-xl">
            <div className="text-center">
              <div className="animate-spin rounded-md h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-700">Loading tea details...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
