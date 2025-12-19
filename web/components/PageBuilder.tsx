import type {PageBuilderModule} from '@/types/sanity'
import TextModule from './modules/TextModule'
import VideoModule from './modules/VideoModule'
import BrewingInstructionsModule from './modules/BrewingInstructionsModule'

interface PageBuilderProps {
  content?: PageBuilderModule[]
}

export default function PageBuilder({content}: PageBuilderProps) {
  if (!content || content.length === 0) {
    return (
      <div className="text-center py-12 text-white/70">
        <p>No content available</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {content.map((module) => {
        switch (module._type) {
          case 'textModule':
            return <TextModule key={module._key} module={module} />
          case 'videoModule':
            return <VideoModule key={module._key} module={module} />
          case 'brewingInstructionsModule':
            return (
              <BrewingInstructionsModule key={module._key} module={module} />
            )
          default:
            return null
        }
      })}
    </div>
  )
}



