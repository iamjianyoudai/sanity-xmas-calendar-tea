import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import Image from 'next/image'
import type {TextModule} from '@/types/sanity'

const portableComponents: PortableTextComponents = {
  types: {
    image: ({value}: {value?: PortableTextBlock[]}) => {
      const v = value as
        | {url?: string; asset?: {url?: string}; alt?: string}
        | undefined
      const url = v?.url || v?.asset?.url
      if (!url) return null
      return (
        <div className="my-6">
          <div className="relative w-full h-[320px] md:h-[420px] rounded-md overflow-hidden shadow">
            <Image src={url} alt={v?.alt || ''} fill className="object-cover" />
          </div>
        </div>
      )
    },
  },
  block: {
    normal: ({children}) => (
      <p className="text-white text-lg leading-relaxed mb-4">{children}</p>
    ),
    h1: ({children}) => (
      <h1 className="text-4xl font-bold text-white mb-4">{children}</h1>
    ),
    h2: ({children}) => (
      <h2 className="text-3xl font-bold text-white mb-3">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="text-2xl font-bold text-white mb-2">{children}</h3>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc pl-5 mb-4 text-white/90">{children}</ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal pl-5 mb-4 text-white/90">{children}</ol>
    ),
  },
}

interface TextModuleProps {
  module: TextModule
}

export default function TextModule({module}: TextModuleProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-md shadow-lg p-6 md:p-8 mb-8 backdrop-blur">
      {module.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {module.title}
        </h2>
      )}
      {module.content && module.content.length > 0 && (
        <div className="prose prose-lg max-w-none prose-invert">
          <PortableText value={module.content} components={portableComponents} />
        </div>
      )}
    </div>
  )
}



