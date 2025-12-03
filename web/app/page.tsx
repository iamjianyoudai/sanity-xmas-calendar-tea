import Image from "next/image";
import { client } from "@/lib/sanity";
import { homepageQuery } from "@/lib/queries";
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
                <div
                  key={tea._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {tea.imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={tea.imageUrl}
                        alt={tea.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
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
                </div>
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
