import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { homepageQuery } from "@/lib/queries";
import { getTeaImage } from "@/lib/imageMap";
import type { Homepage } from "@/types/sanity";

async function getHomepageData(): Promise<Homepage | null> {
  try {
    const data = await client.fetch(homepageQuery);
    return data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}

export default async function Home() {
  const homepage = await getHomepageData();

  if (!homepage) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-2">
        <h2 className="text-3xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          {homepage.title && (
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              {homepage.title}
            </h1>
          )}
          {homepage.introduction && (
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {homepage.introduction}
            </p>
          )}
        </div>

        {/* Featured Teas Section */}
        {homepage.featuredTeas && homepage.featuredTeas.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
              Featured Teas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {homepage.featuredTeas.map((tea) => (
                <Link
                  key={tea._id}
                  href={`/tea/${tea.slug.current}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-green-800">
                        {tea.name}
                      </h3>
                      {tea.category && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {tea.category}
                        </span>
                      )}
                    </div>
                    {tea.description && (
                      <p className="text-gray-600 mb-4">{tea.description}</p>
                    )}
                    {/* Image placeholder below description */}
                    {(() => {
                      const localImage = getTeaImage(
                        tea.name,
                        tea.slug?.current
                      );
                      const imageSrc = tea.imageUrl || localImage;

                      return imageSrc ? (
                        <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={imageSrc}
                            alt={tea.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <svg
                              className="w-16 h-16 mx-auto mb-2"
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
                            <p className="text-sm">No image available</p>
                          </div>
                        </div>
                      );
                    })()}
                    {tea.origin && (
                      <p className="text-sm text-gray-500 mb-4">
                        Origin: {tea.origin}
                      </p>
                    )}
                    {tea.flavorNotes && tea.flavorNotes.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Flavor Notes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tea.flavorNotes.map((note, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {tea.brewingInstructions && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Brewing Instructions:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {tea.brewingInstructions.amount && (
                            <li>Amount: {tea.brewingInstructions.amount}</li>
                          )}
                          {tea.brewingInstructions.temperature && (
                            <li>
                              Temperature: {tea.brewingInstructions.temperature}
                            </li>
                          )}
                          {tea.brewingInstructions.steepTime && (
                            <li>
                              Steep Time: {tea.brewingInstructions.steepTime}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Fallback if no featured teas */}
        {(!homepage.featuredTeas || homepage.featuredTeas.length === 0) && (
          <div className="text-center mt-16">
            <p className="text-gray-500">No featured teas available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
