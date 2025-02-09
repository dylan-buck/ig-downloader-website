import { NextResponse } from "next/server";
import { getPostUrl } from "@/lib/instagram";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postUrl = searchParams.get("postUrl");
    const stream = searchParams.get("stream") === "true";

    if (!postUrl) {
      return NextResponse.json(
        {
          status: "error",
          message: "Missing postUrl parameter",
        },
        { status: 400 }
      );
    }

    const data = await getPostUrl(postUrl);

    // If stream is true, proxy the video instead of returning the URL
    if (stream) {
      const videoResponse = await fetch(data.url);
      const headers = new Headers(videoResponse.headers);
      
      // Override content disposition to allow inline viewing
      headers.set('Content-Disposition', 'inline');
      
      return new NextResponse(videoResponse.body, {
        status: 200,
        headers
      });
    }

    return NextResponse.json({
      status: "success",
      data: {
        filename: `ig-downloader-${Date.now()}.mp4`,
        width: data.width,
        height: data.height,
        videoUrl: data.url,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch video";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
} 