import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectDetailProps {
  title: string
  description: string
  link?: string
  onClose: () => void
  isVisible: boolean
  isClosing: boolean
}

export default function ProjectDetail({
  title,
  description,
  link,
  onClose,
  isVisible,
  isClosing,
}: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (isVisible && !isClosing) {
      tl.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      })
    } else if (isClosing) {
      tl.to(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
      })
    }
  }, [isVisible, isClosing])

  const handleCloseClick = () => {
    onClose()
  }

  useEffect(() => {
    if (link) {
      const token = 'JKX8536-PXP4T11-MH668JE-SW95AVF' // your token
      const url = encodeURIComponent(link) // Encode the URL
      const screenshotApiUrl = `https://api.screenshotapi.net/capture?token=${token}&url=${url}&full=true`

      // Fetch the screenshot and set the URL in state
      fetch(screenshotApiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch screenshot: ${response.status} ${response.statusText}`)
          }
          return response.blob()
        })
        .then((blob) => {
          const screenshot = URL.createObjectURL(blob)
          setScreenshotUrl(screenshot)
        })
        .catch((error) => {
          console.error('Error fetching screenshot:', error)
          // Optionally, set a fallback image or message
          setScreenshotUrl(null)
        })
    }
  }, [link]) // Trigger only when 'link' changes

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-y-auto bg-white text-black ${isVisible && !isClosing ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0, transform: 'translateY(50px)' }}
    >
      <div className="min-h-screen px-4 md:px-8 lg:px-16 py-20">
        <button
          onClick={handleCloseClick}
          className="fixed top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        <div className="max-w-[1400px] mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">{title}</h1>
            {link ? (
              <Link href={link} className="flex underline mb-4" target="_blank">
                Visit Now <ArrowRight />
              </Link>
            ) : (
              <p className="mb-4">This project is not currently hosted</p>
            )}
            <p className="text-xl text-gray-700 max-w-2xl">{description}</p>
          </div>
          {screenshotUrl ? (
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src={screenshotUrl}
                alt="Website Screenshot"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p>No preview available</p>
          )}
        </div>
      </div>
    </div>
  )
}
