"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "@/lib/sanity";
import { teaCategoriesQuery, teasByCategoryQuery } from "@/lib/queries";

type ListTea = {
  _id: string;
  name: string;
  slug?: string;
  imageUrl?: string;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
};

export default function AllTeasPage() {
  const [teas, setTeas] = useState<ListTea[]>([]);
  const [cachedTeas, setCachedTeas] = useState<Record<string, ListTea[]>>({});
  const [categories, setCategories] = useState<
    { slug: string; name: string }[]
  >([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .withConfig({ useCdn: true })
      .fetch(teaCategoriesQuery)
      .then((categoryResults: Array<{ slug?: string; name?: string }>) => {
        const categoryList = Array.isArray(categoryResults)
          ? categoryResults
              .filter((category) => category?.slug)
              .map((category) => ({
                slug: category.slug as string,
                name: category.name || (category.slug as string),
              }))
          : [];
        setCategories(categoryList);
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    const cached = cachedTeas[selectedSlug];
    if (cached) {
      return;
    }
    client
      .withConfig({ useCdn: true })
      .fetch(teasByCategoryQuery, { slug: selectedSlug })
      .then((data: ListTea[]) => {
        const next = Array.isArray(data) ? data : [];
        setTeas(next);
        setCachedTeas((prev) => ({ ...prev, [selectedSlug]: next }));
      })
      .finally(() => setLoading(false));
  }, [selectedSlug, cachedTeas]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#131313] to-[#0b0b0b] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-semibold">Explore Teas</h1>
            <p className="text-lg text-white/75">
              Discover new favorites by Tea type.
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative w-full h-72 md:h-96 rounded-md overflow-hidden shadow-lg border border-white/10">
            <Image
              src="/makingTea.webp"
              alt="Tea plants"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                const cached = cachedTeas["all"];
                if (cached) {
                  setSelectedSlug("all");
                  setTeas(cached);
                  setLoading(false);
                  return;
                }
                setLoading(true);
                setSelectedSlug("all");
              }}
              className={`px-3 py-1.5 rounded-md text-sm md:text-base border transition-colors cursor-pointer ${
                selectedSlug === "all"
                  ? "bg-gray-800 text-white border-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              All Teas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  const cached = cachedTeas[cat.slug];
                  if (cached) {
                    setSelectedSlug(cat.slug);
                    setTeas(cached);
                    setLoading(false);
                    return;
                  }
                  setLoading(true);
                  setSelectedSlug(cat.slug);
                }}
                className={`px-3 py-1.5 rounded-md text-sm md:text-base border transition-colors cursor-pointer ${
                  selectedSlug === cat.slug
                    ? "bg-white text-black border-white"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="h-56 rounded-xl border border-white/10 bg-white/5 animate-pulse"
                />
              ))
            ) : teas.length === 0 ? (
              <div className="col-span-full text-center text-white/70">
                No teas found for this category.
              </div>
            ) : (
              teas.map((tea) => (
                <Link
                  key={tea._id}
                  href={tea.slug ? `/tea/${tea.slug}` : "#"}
                  className="group block rounded-md overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:border-white/30 transition-colors"
                >
                  <div className="relative h-80 w-full overflow-hidden">
                    {tea.imageUrl ? (
                      <Image
                        src={tea.imageUrl}
                        alt={tea.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-white/10" />
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold">{tea.name}</h3>
                    {tea.category?.name && (
                      <p className="text-sm text-white/70">
                        {tea.category.name}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
