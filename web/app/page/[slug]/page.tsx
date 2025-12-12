// import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { pageBySlugQuery } from "@/lib/queries";
import PageBuilder from "@/components/PageBuilder";
import type { Page } from "@/types/sanity";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const data = await client.fetch(pageBySlugQuery, { slug });
    return data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export default async function PagePage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#131313] to-[#0b0b0b] text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Page Not Found
            </h1>
            <p className="text-white/70 mb-8">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors border border-white/20"
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {page.title}
            </h1>
          </div>

          {/* Main Image Section */}
          {/* {page.mainImageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-12 rounded-md overflow-hidden shadow-lg">
              <Image
                src={page.mainImageUrl}
                alt={page.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )} */}

          {/* Page Builder Content */}
          <PageBuilder content={page.content} />
        </div>
      </div>
    </div>
  );
}
