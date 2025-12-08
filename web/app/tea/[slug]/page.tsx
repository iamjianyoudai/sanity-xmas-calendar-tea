import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { client } from "@/lib/sanity";
import { teaBySlugQuery } from "@/lib/queries";
// import { getTeaImage } from "@/lib/imageMap";
import type { Tea } from "@/types/sanity";

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
          <div className="relative w-full h-[320px] md:h-[420px] rounded-lg overflow-hidden shadow">
            <Image src={url} alt={v?.alt || ""} fill className="object-cover" />
          </div>
        </div>
      );
    },
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getTeaBySlug(slug: string): Promise<Tea | null> {
  try {
    const data = await client.fetch(teaBySlugQuery, { slug });
    return data;
  } catch (error) {
    console.error("Error fetching tea data:", error);
    return null;
  }
}

export default async function TeaPage({ params }: PageProps) {
  const { slug } = await params;
  const tea = await getTeaBySlug(slug);

  if (!tea) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              Tea Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The tea you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#131313] to-[#0b0b0b] text-white">
      <div className="container mx-auto px-4 py-16">
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

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-5xl font-bold text-white">{tea.name}</h1>
            </div>
            {tea.origin && (
              <p className="text-lg text-white/80">Origin: {tea.origin}</p>
            )}
          </div>

          {/* Image Section */}
          {tea.imageUrl ? (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={tea.imageUrl}
                alt={tea.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center shadow-lg">
              <div className="text-center text-gray-400">
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-lg">No image available</p>
              </div>
            </div>
          )}

          {/* Body Content Section */}
          {tea.body && tea.body.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 mb-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">
                About {tea.name}
              </h2>
              <div className="prose prose-lg max-w-none prose-invert">
                <PortableText
                  value={tea.body}
                  components={portableComponents}
                />
              </div>
            </div>
          )}

          {/* Flavor Notes Section */}
          {tea.flavorNotes && tea.flavorNotes.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 mb-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-4">
                Flavor Notes
              </h2>
              <div className="flex flex-wrap gap-3">
                {tea.flavorNotes.map((note, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white/10 text-white rounded-full text-base font-medium border border-white/15"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Brewing Instructions Section */}
          {tea.brewingInstructions && (
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 backdrop-blur">
              <h2 className="text-2xl font-bold text-white mb-6">
                Brewing Instructions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tea.brewingInstructions.amount && (
                  <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-4xl mb-3">⚖️</div>
                    <h3 className="font-semibold text-white mb-2">Amount</h3>
                    <p className="text-white/80">
                      {tea.brewingInstructions.amount}
                    </p>
                  </div>
                )}
                {tea.brewingInstructions.temperature && (
                  <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-4xl mb-3">🌡️</div>
                    <h3 className="font-semibold text-white mb-2">
                      Temperature
                    </h3>
                    <p className="text-white/80">
                      {tea.brewingInstructions.temperature}
                    </p>
                  </div>
                )}
                {tea.brewingInstructions.steepTime && (
                  <div className="text-center p-4 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-4xl mb-3">⏱️</div>
                    <h3 className="font-semibold text-white mb-2">
                      Steep Time
                    </h3>
                    <p className="text-white/80">
                      {tea.brewingInstructions.steepTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
