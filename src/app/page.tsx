'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleDownload = async () => {
    if (!url) return;
    
    const apiUrl = `https://api.bhawanigarg.com/social/instagram/?url=${encodeURIComponent(url)}`;
    window.location.href = apiUrl;
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Instagram Video Downloader
        </h1>
        
        <div className="w-full max-w-xl space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Instagram URL here..."
              className="w-full px-4 py-3 rounded-lg bg-white/90 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
            />
          </div>
          
          <button
            onClick={handleDownload}
            disabled={!url}
            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg font-semibold transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download
          </button>
        </div>
      </div>
      
      <footer className="w-full py-4 text-center text-white/80 text-sm">
        Enter any Instagram video, reel, or post URL to download
      </footer>
    </main>
  );
}
