export interface ParsedVideo {
  platform: "youtube" | "vimeo" | "custom" | "unknown";
  videoId: string | null;
  embedUrl: string | null;
  isValid: boolean;
}

export function parseVideoUrl(url: string | null | undefined): ParsedVideo {
  if (!url || typeof url !== "string") {
    return {
      platform: "unknown",
      videoId: null,
      embedUrl: null,
      isValid: false,
    };
  }

  const trimmed = url.trim();

  // 1. YouTube Patterns
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = trimmed.match(youtubeRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      platform: "youtube",
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      isValid: true,
    };
  }

  // 2. Vimeo Patterns
  // - https://vimeo.com/VIDEO_ID
  // - https://player.vimeo.com/video/VIDEO_ID
  const vimeoRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = trimmed.match(vimeoRegex);

  if (vimeoMatch && vimeoMatch[1]) {
    const videoId = vimeoMatch[1];
    return {
      platform: "vimeo",
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      isValid: true,
    };
  }

  // Fallback if URL is already an embed iframe src
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return {
      platform: "custom",
      videoId: null,
      embedUrl: trimmed,
      isValid: true,
    };
  }

  return {
    platform: "unknown",
    videoId: null,
    embedUrl: null,
    isValid: false,
  };
}
