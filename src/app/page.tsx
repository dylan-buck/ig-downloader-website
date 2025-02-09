'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<{ videoUrl: string; width: number; height: number } | null>(null);

  const handleFetch = async () => {
    if (!url) return;
    
    setIsLoading(true);
    setError('');
    setVideoData(null);

    try {
      const response = await fetch(`/api/video?postUrl=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data.status === 'error') {
        throw new Error(data.message);
      }

      if (data.status === 'success' && data.data.videoUrl) {
        setVideoData({
          videoUrl: `/api/video?postUrl=${encodeURIComponent(url)}&stream=true`,
          width: data.data.width,
          height: data.data.height
        });
      } else {
        throw new Error('No video URL found in response');
      }
    } catch (err: any) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to fetch video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!videoData) return;
    const a = document.createElement('a');
    a.href = videoData.videoUrl;
    a.download = `ig-downloader-${Date.now()}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-10 w-96 h-96 bg-pink-300/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-300/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side Ad */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 hidden xl:block">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-client="YOUR-CLIENT-ID"
          data-ad-slot="YOUR-AD-SLOT"
        />
      </div>

      {/* Right Side Ad */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:block">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '160px', height: '600px' }}
          data-ad-client="YOUR-CLIENT-ID"
          data-ad-slot="YOUR-AD-SLOT"
        />
      </div>

      <div className="w-full px-4 md:px-6 relative pt-4 md:pt-8">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-1 animate-fade-in-down whitespace-normal md:whitespace-nowrap text-center">
            Instagram Video Downloader
          </h1>
          <p className="text-white/90 text-center mb-1 max-w-md text-base md:text-lg animate-fade-in-up hover:text-white transition-colors duration-300 cursor-default px-2">
            Paste the Instagram link and press Load. It's that simple.
            <br />
            Supporting Reels and Videos.
          </p>
          <p className="text-white font-bold text-base md:text-lg mb-2 animate-fade-in-up">
            NO SIGN UP and 100% FREE
          </p>
          
          <div className="w-full space-y-3 animate-fade-in">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#fd1d1d] to-[#833ab4] rounded-xl md:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste Instagram URL here..."
                className="relative w-full px-4 md:px-8 py-4 md:py-5 rounded-xl md:rounded-2xl bg-white/90 backdrop-blur-sm border-none focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-400 transition-all duration-300 group-hover:shadow-lg text-base md:text-lg"
              />
            </div>
            
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={handleFetch}
                disabled={!url || isLoading}
                className="relative flex-1 group disabled:cursor-not-allowed"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded-xl md:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-disabled:opacity-0"></div>
                <div className="relative px-4 md:px-8 py-4 md:py-5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 group-hover:shadow-lg group-disabled:opacity-50 text-base md:text-lg">
                  {isLoading ? 'Processing...' : 'Load'}
                </div>
              </button>

              {videoData && (
                <button
                  onClick={handleDownload}
                  className="relative flex-1 group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#fd1d1d] to-[#833ab4] rounded-xl md:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative px-4 md:px-8 py-4 md:py-5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 group-hover:shadow-lg text-base md:text-lg">
                    Download
                  </div>
                </button>
              )}
            </div>

            {error && (
              <p className="text-white/90 text-center text-sm bg-red-500/20 backdrop-blur-sm rounded-lg p-2 md:p-3">
                {error}
              </p>
            )}

            {/* Video Player */}
            {videoData && (
              <div className="relative w-full mt-3 animate-fade-in">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#fd1d1d] to-[#833ab4] rounded-xl md:rounded-2xl blur opacity-30"></div>
                <div className="relative bg-black/20 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden">
                  <video
                    controls
                    autoPlay
                    className="w-full h-auto"
                    style={{ maxHeight: '70vh' }}
                  >
                    <source src={videoData.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* SEO Text */}
          <article className="mt-6 max-w-2xl mx-auto px-4 md:px-6 py-4 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h2 className="text-lg md:text-xl text-white/90 font-light mb-3 md:mb-4">
              Download Instagram Videos Easily
            </h2>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4 md:mb-6">
              Our Instagram video downloader makes it simple to save your favorite Instagram content. Whether you're looking to download reels or videos, our tool provides a quick and efficient solution. Simply paste the Instagram URL and click load - no registration required!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 text-sm md:text-base">
              <div className="text-white/70">
                <span className="block text-white/90 font-medium mb-1">Content</span>
                • Instagram Reels
                <br />
                • Instagram Videos
              </div>
              <div className="text-white/70">
                <span className="block text-white/90 font-medium mb-1">Quality</span>
                • High Quality
                <br />
                • Fast Download
                <br />
                • Original Format
              </div>
              <div className="text-white/70 sm:col-auto col-span-2">
                <span className="block text-white/90 font-medium mb-1">Service</span>
                • 100% Free
                <br />
                • No Registration
                <br />
                • Easy to Use
              </div>
            </div>
          </article>
        </div>

        {/* Bottom Ad */}
        <div className="max-w-2xl mx-auto mt-4">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="YOUR-CLIENT-ID"
            data-ad-slot="YOUR-AD-SLOT"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      
      <footer className="w-full py-4 md:py-6 text-center text-white/80 text-xs md:text-sm backdrop-blur-sm bg-black/5 mt-auto">
        Enter any Instagram video or reel URL to download
      </footer>

      {/* Initialize Ads - only once */}
      <script dangerouslySetInnerHTML={{
        __html: `
          try {
            (adsbygoogle = window.adsbygoogle || []).push({});
          } catch (e) {
            console.error('Ad initialization error:', e);
          }
        `
      }} />
    </main>
  );
}
