"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Tea {
  id: string;
  name: string;
  color: string; // CSS color for the tea liquid
  description: string;
  category: string;
}

export default function TeaMaker() {
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [teaLevel, setTeaLevel] = useState(0); // 0-100 for cup fill level
  const [isBrewing, setIsBrewing] = useState(false);

  const teas: Tea[] = [
    {
      id: "oolong",
      name: "Oolong Tea",
      color: "#d4a574", // Golden-orange
      description: "Partially oxidized, complex flavor",
      category: "Oolong",
    },
    {
      id: "green",
      name: "Green Tea",
      color: "#c8e6c9", // Light yellow-green
      description: "Light and fresh, not oxidized",
      category: "Green",
    },
    {
      id: "black",
      name: "Black Tea",
      color: "#8d6e63", // Dark reddish-brown
      description: "Fully oxidized, robust flavor",
      category: "Black",
    },
    {
      id: "white",
      name: "White Tea",
      color: "#fff9c4", // Pale yellow
      description: "Delicate and subtle",
      category: "White",
    },
    {
      id: "pu-erh",
      name: "Pu-erh Tea",
      color: "#5d4037", // Very dark brown
      description: "Fermented, earthy and rich",
      category: "Pu-erh",
    },
  ];

  const handleSelectTea = (tea: Tea) => {
    setSelectedTea(tea);
    setTeaLevel(0);
    setIsBrewing(false);
  };

  const handleBrew = () => {
    if (!selectedTea) return;

    setIsBrewing(true);
    setTeaLevel(0);

    // Animate tea filling the cup
    let currentLevel = 0;
    const interval = setInterval(() => {
      currentLevel += 2;
      setTeaLevel(currentLevel);

      if (currentLevel >= 100) {
        clearInterval(interval);
        setIsBrewing(false);
      }
    }, 50);
  };

  const handleReset = () => {
    setSelectedTea(null);
    setTeaLevel(0);
    setIsBrewing(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1a1a1a" }}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors"
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
          <h1 className="text-5xl font-bold text-white mb-4">
            Interactive Tea Maker
          </h1>
          <p className="text-xl text-gray-300">
            Select tea leaves and watch your tea brew
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Tea Selection */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Select Your Tea Leaves
              </h2>
              <div className="space-y-4">
                {teas.map((tea) => (
                  <button
                    key={tea.id}
                    onClick={() => handleSelectTea(tea)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedTea?.id === tea.id
                        ? "border-green-500 bg-green-500/20"
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">
                          {tea.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {tea.description}
                        </p>
                      </div>
                      <div
                        className="w-12 h-12 rounded-full border-2 border-gray-600"
                        style={{ backgroundColor: tea.color }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              {selectedTea && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-white mb-2">
                    <span className="font-semibold">Selected:</span>{" "}
                    {selectedTea.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {selectedTea.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Tea Cup Display */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-white mb-6">
                Your Tea Cup
              </h2>

              {/* Tea Cup */}
              <div className="relative w-64 h-80 mb-8">
                {/* Cup outline */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-48 h-64 border-4 border-gray-600 rounded-b-full relative overflow-hidden">
                    {/* Tea liquid - fills from bottom */}
                    {selectedTea && (
                      <div
                        className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out"
                        style={{
                          height: `${teaLevel}%`,
                          backgroundColor: selectedTea.color,
                          opacity: 0.8,
                        }}
                      >
                        {/* Tea surface effect */}
                        <div
                          className="absolute top-0 left-0 right-0 h-2"
                          style={{
                            backgroundColor: selectedTea.color,
                            opacity: 0.6,
                            boxShadow: `0 -4px 8px ${selectedTea.color}40`,
                          }}
                        />
                      </div>
                    )}

                    {/* Steam effect when brewing */}
                    {isBrewing && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <div className="flex gap-2">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-1 h-8 bg-white/30 rounded-full animate-pulse"
                              style={{
                                animationDelay: `${i * 0.2}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cup handle */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4">
                  <div className="w-12 h-20 border-4 border-gray-600 rounded-l-full" />
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4">
                <button
                  onClick={handleBrew}
                  disabled={!selectedTea || isBrewing}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTea && !isBrewing
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isBrewing ? "Brewing..." : "Brew Tea"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-all"
                >
                  Reset
                </button>
              </div>

              {/* Status */}
              {!selectedTea && (
                <p className="mt-6 text-gray-400 text-center">
                  Select a tea to begin
                </p>
              )}
              {selectedTea && teaLevel === 0 && !isBrewing && (
                <p className="mt-6 text-gray-400 text-center">
                  Click "Brew Tea" to start
                </p>
              )}
              {teaLevel >= 100 && (
                <p className="mt-6 text-green-400 text-center font-semibold">
                  Your {selectedTea?.name} is ready! 🍵
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full View Tea Image Modal - Shows when tea is finished */}
      {teaLevel >= 100 && selectedTea && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={handleReset}
        >
          <div className="relative w-full h-full flex items-center justify-center p-8">
            {/* Close button */}
            <button
              onClick={handleReset}
              className="absolute top-8 right-8 z-10 text-white hover:text-gray-300 transition-colors bg-gray-800/50 hover:bg-gray-800 rounded-full p-3 border border-gray-700"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
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

            {/* Tea Image - Full View */}
            <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center">
              <Image
                src="/ooloong.png"
                alt={`Finished ${selectedTea.name}`}
                fill
                className="object-contain"
                priority
                quality={95}
              />
            </div>

            {/* Success message overlay */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600/90 to-green-700/90 text-white px-8 py-4 rounded-full shadow-2xl border-2 border-green-400">
              <p className="text-xl font-bold flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <span>Your {selectedTea.name} is Ready!</span>
                <span className="text-2xl">🍵</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
