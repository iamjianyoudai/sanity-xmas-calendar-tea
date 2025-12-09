"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { client } from "@/lib/sanity";
import { allTeasQuery } from "@/lib/queries";

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
  const [selectedSlug, setSelectedSlug] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .withConfig({ useCdn: true })
      .fetch(allTeasQuery)
      .then((data: ListTea[]) => setTeas(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const list = teas
      .map((t) => t.category)
      .filter((c): c is NonNullable<ListTea["category"]> => !!c && !!c.slug);
    const unique = new Map<string, { slug: string; name: string }>();
    list.forEach((c) => {
      const slug = c.slug!;
      if (!unique.has(slug)) unique.set(slug, { slug, name: c.name || slug });
    });
    return Array.from(unique.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [teas]);

  const filteredTeas = useMemo(() => {
    if (selectedSlug === "all") return teas;
    return teas.filter((t) => t.category?.slug === selectedSlug);
  }, [teas, selectedSlug]);

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
            <h1 className="text-4xl md:text-5xl font-semibold">All Teas</h1>
            <p className="text-lg text-white/75">
              Browse every tea across all categories. Use the tags below to
              filter.
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
              onClick={() => setSelectedSlug("all")}
              className={`px-3 py-1.5 rounded-md text-sm md:text-base border transition-colors cursor-pointer ${
                selectedSlug === "all"
                  ? "bg-gray-800 text-white border-white"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              Show all teas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedSlug(cat.slug)}
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
            ) : filteredTeas.length === 0 ? (
              <div className="col-span-full text-center text-white/70">
                No teas found for this category.
              </div>
            ) : (
              filteredTeas.map((tea) => (
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
