import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Verdana Protocol · Post-Sort Operator',
  description: 'Post-Sort Operator for waste facility workflows',
  applicationName: 'Verdana Protocol',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Verdana',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icons/icon-192.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4332',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
