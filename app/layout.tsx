import Footer from './components/Footer'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata = {
  title: 'Prabesh Shrestha',
  description: 'My portfolio showcasing web development skills and projects.',
  author: 'Prabesh Shrestha',
  keywords: 'web development, portfolio, React, Next.js, frontend, full-stack developer, software engineer',
  openGraph: {
    title: 'Prabesh Shrestha Portfolio',
description: 'Portfolio of Prabesh Shrestha — Frontend Developer (React, Tailwind CSS) & Graphics Designer creating clean, modern web experiences.',
url: 'https://www.prabeshshrestha.com.np',
image: 'https://www.prabeshshrestha.com/og-image.jpg',
site_name: 'Prabesh Shrestha Portfolio',
type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'Prabesh Shrestha Portfolio',
  description: 'Frontend Developer & Graphics Designer crafting clean, modern web experiences with React and Tailwind CSS.',
  image: 'https://www.prabeshshrestha.com/og-image.jpg',
},
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Analytics />
        {children}
        <Footer />
      </body>
    </html>
  )
}
