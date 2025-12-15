import Image from 'next/image'
import Link from 'next/link'
import {client} from '@/lib/sanity'
import {allPagesQuery} from '@/lib/queries'

interface PageListItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImageUrl?: string
}

async function getAllPages(): Promise<PageListItem[]> {
  try {
    const data = await client.fetch(allPagesQuery)
    return Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
}

export default async function PagesListPage() {
  const pages = await getAllPages()

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
            <h1 className="text-4xl md:text-5xl font-semibold">All Pages</h1>
            <p className="text-lg text-white/75">
              Browse pages created with the page builder
            </p>
          </div>

          {/* Pages Grid */}
          {pages.length === 0 ? (
            <div className="text-center py-12 text-white/70">
              <p>No pages found. Create pages in Sanity Studio.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <Link
                  key={page._id}
                  href={`/page/${page.slug.current}`}
                  className="group block rounded-md overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:border-white/30 transition-colors"
                >
                  {page.mainImageUrl ? (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={page.mainImageUrl}
                        alt={page.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="relative h-64 w-full bg-white/10 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-white/30"
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
                    </div>
                  )}
                  <div className="p-4 space-y-1">
                    <h3 className="text-lg font-semibold group-hover:text-white/90 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {page.slug.current}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


