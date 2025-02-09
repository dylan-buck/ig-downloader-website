interface InstagramResponse {
  url: string;
  width: number;
  height: number;
}

export async function getPostUrl(url: string): Promise<InstagramResponse> {
  try {
    const API_URL = "https://www.instagram.com/api/v1/oembed";
    const response = await fetch(`${API_URL}?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch Instagram post data");
    }

    const data = await response.json();
    const postId = extractPostId(url);
    
    if (!postId) {
      throw new Error("Invalid Instagram URL");
    }

    const mediaData = await getMediaData(postId);
    return mediaData;
  } catch (error: any) {
    throw new Error(error.message || "Failed to process Instagram URL");
  }
}

async function getMediaData(postId: string): Promise<InstagramResponse> {
  try {
    const API_URL = `https://www.instagram.com/p/${postId}/?__a=1&__d=dis`;
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error("Failed to fetch media data");
    }

    const data = await response.json();
    const mediaData = data.graphql?.shortcode_media;

    if (!mediaData) {
      throw new Error("No media found");
    }

    if (mediaData.is_video) {
      return {
        url: mediaData.video_url,
        width: mediaData.dimensions.width,
        height: mediaData.dimensions.height,
      };
    } else {
      throw new Error("This post does not contain a video");
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch media data");
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