import { ArrowLeft } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import CircularGallery from './CircularGallery'

interface CompanyWork {
  id: string
  title: string
  description: string
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

  const galleryItems = company.works.map((work) => ({
    image: work.image || "/placeholder.svg?height=600&width=800",
    text: work.title,
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}
