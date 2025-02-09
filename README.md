# Instagram Video Downloader

A modern, fast, and user-friendly Instagram video and reel downloader built with Next.js.

## Features

- Download Instagram videos and reels
- Rate limiting with Upstash Redis
- Modern UI with Tailwind CSS
- Mobile responsive
- SEO optimized

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Upstash Redis for rate limiting

## Deployment on Netlify

1. Fork or clone this repository
2. Create a new site on Netlify
3. Connect your GitHub repository
4. Configure environment variables in Netlify:
   - `USE_UPSTASH`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
   - `NEXT_PUBLIC_ADSENSE_CLIENT` (if using ads)
   - `NEXT_PUBLIC_ADSENSE_SLOT` (if using ads)

5. Deploy!

## Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

- `USE_UPSTASH`: Enable/disable rate limiting
- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST token
- `NEXT_PUBLIC_ADSENSE_CLIENT`: Google AdSense client ID (optional)
- `NEXT_PUBLIC_ADSENSE_SLOT`: Google AdSense slot ID (optional)

## Rate Limiting

The app uses Upstash Redis for rate limiting. Configure the limits in `src/lib/ratelimit.ts`.

## License

MIT
