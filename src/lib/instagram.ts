interface InstagramResponse {
  url: string;
  width: number;
  height: number;
}

interface InstagramMediaData {
  graphql?: {
    shortcode_media?: {
      is_video: boolean;
      video_url?: string;
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export async function getPostUrl(url: string): Promise<InstagramResponse> {
  try {
    const postId = extractPostId(url);
    
    if (!postId) {
      throw new Error("Invalid Instagram URL");
    }

    const mediaData = await getMediaData(postId);
    return mediaData;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to process Instagram URL";
    throw new Error(errorMessage);
  }
}

async function getMediaData(postId: string): Promise<InstagramResponse> {
  try {
    const API_URL = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error("Failed to fetch media data");
    }

    const data: InstagramMediaData = await response.json();
    const mediaData = data.graphql?.shortcode_media;

    if (!mediaData) {
      throw new Error("No media found");
    }

    if (mediaData.is_video && mediaData.video_url) {
      return {
        url: mediaData.video_url,
        width: mediaData.dimensions.width,
        height: mediaData.dimensions.height,
      };
    } else {
      throw new Error("This post does not contain a video");
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch media data";
    throw new Error(errorMessage);
  }
}

function extractPostId(url: string): string | null {
  const patterns = [
    /instagram\.com\/p\/([^/?]+)/,
    /instagram\.com\/reel\/([^/?]+)/,
    /instagram\.com\/tv\/([^/?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
} 