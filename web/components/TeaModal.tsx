"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { useState } from "react";
import type { Tea } from "@/types/sanity";

interface RelatedTea {
  _id: string;
  name: string;
  slug?: string | { current?: string };
  description?: string;
  imageUrl?: string;
  flavorNotes?: string[];
}

interface TeaTypeData {
  name?: string;
  slug?: string | { current?: string };
  description?: string;
  imageUrl?: string;
  flavorNotes?: string[];
  brewingInstructions?: {
    amount?: string;
    temperature?: string;
    steepTime?: string;
  };
  relatedTeas?: RelatedTea[];
}

interface TeaModalProps {
  tea: Tea | null;
  teaTypeData?: TeaTypeData | null;
  isOpen: boolean;
  onClose: () => void;
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value?: PortableTextBlock[] }) => {
      const v = value as
        | { url?: string; asset?: { url?: string }; alt?: string }
        | undefined;
      const url = v?.url || v?.asset?.url;
      if (!url) return null;
      return (
        <div className="my-6">
          <div className="relative w-full h-[320px] md:h-[420px] rounded-md overflow-hidden shadow">
            <Image src={url} alt={v?.alt || ""} fill className="object-cover" />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-white text-lg leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-green-800 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-green-800 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-green-800 mb-2">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 text-gray-700">{children}</ol>
    ),
  },
};

export default function TeaModal({
  tea,
  teaTypeData,
  isOpen,
  onClose,
}: TeaModalProps) {
  const [heroLoaded, setHeroLoaded] = useState(
    !(teaTypeData?.imageUrl || tea?.imageUrl)
  );

  if (!isOpen || (!tea && !teaTypeData)) return null;

  const display = {
    name: teaTypeData?.name || tea?.name || "",
    slug: tea?.slug?.current || teaTypeData?.slug,
    description: teaTypeData?.description,
    imageUrl: teaTypeData?.imageUrl || tea?.imageUrl,
    body: tea?.body,
    flavorNotes: teaTypeData?.flavorNotes || tea?.flavorNotes,
    brewingInstructions:
      teaTypeData?.brewingInstructions || tea?.brewingInstructions,
    // Ensure relatedTeas is always an array (handle null/undefined from Sanity)
    relatedTeas: Array.isArray(teaTypeData?.relatedTeas)
      ? teaTypeData.relatedTeas
      : [],
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[60vw] lg:w-[55vw] xl:w-[50vw] max-w-[960px] bg-black/40 backdrop-blur-md text-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right border-l border-white/15">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-md shadow-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-100">
                {display.name}
              </h1>
            </div>
          </div>

          {/* Image */}
          {display.imageUrl && (
            <div className="relative h-72 md:h-96 w-full mb-6 rounded-md overflow-hidden shadow-lg bg-white/5">
              <Image
                src={display.imageUrl}
                alt={display.name}
                fill
                className="object-cover"
                priority
                onLoadingComplete={() => setHeroLoaded(true)}
              />
              {!heroLoaded && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
            </div>
          )}

          {/* Body Content (Portable Text) */}
          {display.body && display.body.length > 0 && (
            <div className="mb-6">
              <PortableText
                value={display.body}
                components={portableComponents}
              />
            </div>
          )}

          {/* Description (Fallback) */}
          {(!display.body || display.body.length === 0) &&
            display.description && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                  About {display.name}
                </h2>
                <p className="text-gray-200/90 text-lg leading-relaxed whitespace-pre-line">
                  {display.description}
                </p>
              </div>
            )}
          {/* Related Teas by Category */}
          {display.relatedTeas &&
          Array.isArray(display.relatedTeas) &&
          display.relatedTeas.length > 0 ? (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                More from {display.name || "this category"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {display.relatedTeas.map((t, idx) => {
                  const rSlug =
                    typeof t.slug === "string" ? t.slug : t.slug?.current;
                  const itemKey = `${t._id || "rel"}-${
                    rSlug || "noslug"
                  }-${idx}`;
                  const cardInner = (
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/10 border border-white/15 hover:border-white/30 transition-colors group">
                      {t.imageUrl ? (
                        <Image
                          src={t.imageUrl}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/50 backdrop-blur-sm text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                        {t.name}
                      </div>
                    </div>
                  );
                  return rSlug ? (
                    <Link
                      key={itemKey}
                      href={`/tea/${rSlug}`}
                      className="block focus:outline-none focus:ring-2 focus:ring-white/40 rounded-xl"
                      aria-label={`View ${t.name}`}
                    >
                      {cardInner}
                    </Link>
                  ) : (
                    <div key={itemKey}>{cardInner}</div>
                  );
                })}
              </div>
            </div>
          ) : (
            // Debug: Show message if relatedTeas is missing or empty
            process.env.NODE_ENV === "development" && (
              <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-md">
                <p className="text-yellow-200 text-sm">
                  Debug: No related teas found.
                  {teaTypeData
                    ? ` TeaType has ${
                        teaTypeData.relatedTeas?.length || 0
                      } related teas.`
                    : " No teaTypeData."}
                </p>
              </div>
            )
          )}
          {/* Flavor Notes */}
          {display.flavorNotes && display.flavorNotes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Flavor Notes
              </h2>
              <div className="flex flex-wrap gap-3">
                {display.flavorNotes.map((note, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 text-gray-100 rounded-md text-base font-medium border border-white/20"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Brewing Instructions */}
          {display.brewingInstructions && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                Brewing Instructions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {display.brewingInstructions.amount && (
                  <div className="text-center p-3 bg-white/10 rounded-md border border-white/15">
                    <div className="text-3xl mb-2">⚖️</div>
                    <h3 className="font-semibold text-gray-100 mb-1 text-base">
                      Amount
                    </h3>
                    <p className="text-gray-300/85 text-sm">
                      {display.brewingInstructions.amount}
                    </p>
                  </div>
                )}
                {display.brewingInstructions.temperature && (
                  <div className="text-center p-3 bg-white/10 rounded-md border border-white/15">
                    <div className="text-3xl mb-2">🌡️</div>
                    <h3 className="font-semibold text-gray-100 mb-1 text-base">
                      Temperature
                    </h3>
                    <p className="text-gray-300/85 text-sm">
                      {display.brewingInstructions.temperature}
                    </p>
                  </div>
                )}
                {display.brewingInstructions.steepTime && (
                  <div className="text-center p-3 bg-white/10 rounded-md border border-white/15">
                    <div className="text-3xl mb-2">⏱️</div>
                    <h3 className="font-semibold text-gray-100 mb-1 text-base">
                      Steep Time
                    </h3>
                    <p className="text-gray-300/85 text-sm">
                      {display.brewingInstructions.steepTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
