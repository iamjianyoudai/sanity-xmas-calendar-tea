import type {BrewingInstructionsModule} from '@/types/sanity'

interface BrewingInstructionsModuleProps {
  module: BrewingInstructionsModule
}

export default function BrewingInstructionsModule({
  module,
}: BrewingInstructionsModuleProps) {
  const hasAnyData =
    module.amount || module.temperature || module.steepTime

  if (!hasAnyData) {
    return null
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-md shadow-lg p-6 md:p-8 mb-8 backdrop-blur">
      {module.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {module.title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {module.amount && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-md">
            <div className="text-4xl mb-3">⚖️</div>
            <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
              Amount
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              {module.amount}
            </p>
          </div>
        )}
        {module.temperature && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-md">
            <div className="text-4xl mb-3">🌡️</div>
            <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
              Temperature
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              {module.temperature}
            </p>
          </div>
        )}
        {module.steepTime && (
          <div className="text-center p-4 bg-white/5 border border-white/10 rounded-md">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="font-semibold text-white mb-2 text-base md:text-lg">
              Steep Time
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              {module.steepTime}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}



