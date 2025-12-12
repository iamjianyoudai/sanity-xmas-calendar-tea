import type { VideoModule } from "@/types/sanity";

interface VideoModuleProps {
  module: VideoModule;
}

function getYouTubeEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;

  // Handle YouTube Shorts URLs (e.g., https://www.youtube.com/shorts/VIDEO_ID)
  const shortsRegex = /(?:youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
  const shortsMatch = url.match(shortsRegex);
  if (shortsMatch) {
    const videoId = shortsMatch[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle regular YouTube URLs
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(youtubeRegex);
  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Handle Vimeo URLs
  const vimeoRegex = /(?:vimeo\.com\/)(?:.*\/)?(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }

  return null;
}

export default function VideoModule({ module }: VideoModuleProps) {
  const embedUrl = getYouTubeEmbedUrl(module.videoUrl);

  if (!embedUrl) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-md shadow-lg p-6 md:p-8 mb-8 backdrop-blur">
        {module.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {module.title}
          </h2>
        )}
        <div className="text-center py-8 text-white/70">
          <p>Invalid video URL</p>
          {module.videoUrl && (
            <p className="text-sm mt-2 text-white/50">{module.videoUrl}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-md shadow-lg p-6 md:p-8 mb-8 backdrop-blur">
      {module.title && (
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {module.title}
        </h2>
      )}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-md"
          src={`${embedUrl}${module.autoplay ? "?autoplay=1&mute=1" : ""}`}
          title={module.title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {module.caption && (
        <p className="text-white/70 text-sm md:text-base mt-4 text-center">
          {module.caption}
        </p>
      )}
    </div>
  );
}
