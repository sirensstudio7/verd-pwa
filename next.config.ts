import type { NextConfig } from 'next'
import withPWAInit from '@ducanh2912/next-pwa'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: process.env.NODE_ENV === 'production',
  workboxOptions: {
    skipWaiting: true,
  },
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(path.dirname(fileURLToPath(import.meta.url))),
}

export default withPWA(nextConfig)
