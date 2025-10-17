import createNextIntlPlugin from 'next-intl/plugin';
import { withContentlayer } from 'next-contentlayer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ['@lucide/react', 'framer-motion']
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.supabase.com' }
    ],
    formats: ['image/avif', 'image/webp']
  },
  eslint: {
    dirs: ['src']
  },
  typescript: {
    ignoreBuildErrors: false
  },
  transpilePackages: ['@supabase/supabase-js']
};

export default withContentlayer(withNextIntl(nextConfig));
