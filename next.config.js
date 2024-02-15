/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '0iyjucr8bv6c0ziv.public.blob.vercel-storage.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      }
    ],
    // domains: ["0iyjucr8bv6c0ziv.public.blob.vercel-storage.com"],
  },
};

export default config;
