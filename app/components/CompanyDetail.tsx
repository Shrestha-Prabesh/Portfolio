import { ArrowLeft, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import CircularGallery from './CircularGallery'

interface CompanyWork {
  id: string
  image?: string
  category: string
}

interface Company {
  name: string
  description: string
  works: CompanyWork[]
}

interface CompanyDetailProps {
  company: Company
  onClose: () => void
  isVisible: boolean
  isClosing: boolean
}

export default function CompanyDetail({
  company,
  onClose,
  isVisible,
  isClosing,
}: CompanyDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Reset preview when component mounts or company changes
  useEffect(() => {
    setPreviewImage(null)
  }, [company])

  // Additional reset when component becomes visible
  useEffect(() => {
    if (isVisible && !isClosing) {
      setPreviewImage(null)
    }
  }, [isVisible, isClosing])

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

  const handleImageClick = (image: string) => {
    // Only allow image clicks when the component is fully visible and not closing
    if (!isVisible || isClosing) return
    
    setPreviewImage(image)
  }

  const handleClosePreview = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setPreviewImage(null)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking on the backdrop itself, not on child elements
    if (e.target === e.currentTarget) {
      handleClosePreview(e)
    }
  }

  const galleryItems = company.works.map((work) => ({
    image: work.image || "/placeholder.svg?height=600&width=800",
    text: "", // No text since we removed titles
  }))

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 overflow-y-auto bg-white text-black ${isVisible && !isClosing ? 'pointer-events-auto' : 'pointer-events-none'}`}
      style={{ opacity: 0, transform: 'translateY(50px)' }}
    >
      <div className="min-h-screen pt-20">
        <button
          onClick={handleCloseClick}
          className="fixed top-8 left-8 flex items-center gap-2 text-gray-600 hover:text-black transition-colors z-10"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        <div className="mb-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-black">{company.name}</h1>
            <p className="text-xl text-gray-700 max-w-2xl ">{company.description}</p>
          </div>
        </div>

        <div className="bg-white">
          <div style={{ height: "532px", position: "relative", marginBottom: 0 }}>
            <CircularGallery 
              items={galleryItems} 
              bend={3} 
              textColor="#000000" 
              borderRadius={0.05} 
              scrollEase={0.02} 
              font="bold 30px system-ui, -apple-system, sans-serif"
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>

      {/* Full-screen image preview modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black bg-opacity-90 flex items-center justify-center cursor-pointer"
          onClick={handleBackdropClick}
        >
          <button
            onClick={(e) => handleClosePreview(e)}
            className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-[61] cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
          
                      <div 
            className="max-w-[95vw] max-h-[95vh] flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={previewImage}
              alt="Design work"
              width={1200}
              height={900}
              className="max-w-full max-h-[85vh] object-contain cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
