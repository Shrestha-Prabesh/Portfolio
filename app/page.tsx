"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Code2, Database, Cpu, Code } from "lucide-react"
import RippleTransition from "./components/RippleTransition"
import ProjectDetail from "./components/ProjectDetail"
import CompanyDetail from "./components/CompanyDetail"
import InitializationScreen from "./components/InitializationScreen"
import ContactForm from "./components/ContactForm"
gsap.registerPlugin(ScrollTrigger)

interface ProjectClickPosition {
  x: number
  y: number
}

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

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<{
    title: string
    description: string
    year: string
    link?: string
    images?: string[]
  } | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [clickPosition, setClickPosition] = useState<ProjectClickPosition>({ x: 0, y: 0 })
  const [isClosing, setIsClosing] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false)
  const particleContainerRef = useRef<HTMLDivElement>(null)

  const companies: Company[] = [
    {
      name: "AirCharge",
      description: "Created social media content for Instagram and Facebook using Canva and Adobe Illustrator",
      works: [
        {
          id: "ac1",
          image: "/img1.png",
          category: "Social Media",
        },
        {
          id: "ac2",
          image: "/img2.png",
          category: "Advertising",
        },
        {
          id: "ac3",
          image: "/img3.png",
          category: "Product Design",
        },
        {
          id: "ac4",
         image: "/img5.png",
          category: "Branding",
        },
        {
          id: "ac5",
         image: "/img6.png",
          category: "Branding",
        },
        {
          id: "ac6",
         image: "/img7.png",
          category: "Branding",
        },
        {
          id: "ac7",
         image: "/img8.png",
          category: "Branding",
        },
        {
          id: "ac8",
         image: "/ac8.png",
          category: "Branding",
        },
         {
          id: "ac9",
         image: "/img9.png",
          category: "Branding",
        },
         {
          id: "ac10",
         image: "/img10.png",
          category: "Branding",
        },
         {
          id: "ac11",
         image: "/img11.png",
          category: "Branding",
        },
      ],
    },
    {
      name: "Avani Nepal",
      description: "Created product magazines, social media posts and brochures using Canva and Adobe Illustrator",
      works: [
        {
          id: "an1",
          image: "/a1.png",
          category: "Print Design",
        },
        {
          id: "an2",
          image: "/a2.png",
          category: "Social Media",
        },
        {
          id: "an3",
          image: "/a3.png",
          category: "Print Design",
        },
        {
          id: "an4",
          image: "/a4.png",
          category: "Digital Marketing",
        },
      ],
    },
    {
      name: "The Bright College",
      description:
        "Designed booklets, brochures, and social media posts using Canva and Adobe Illustrator to support the college's marketing efforts",
      works: [
        {
          id: "tbc1",
          image: "/b1.png",
          category: "Educational Design",
        },
        {
          id: "tbc2",
          image: "/b2.png",
          category: "Event Design",
        },
        {
          id: "tbc3",
          image: "/b3.png",
          category: "Social Media",
        },
        {
          id: "tbc4",
          image: "/b4.png",
          category: "Educational Design",
        },
        {
          id: "tbc5",
          image: "/b5.png",
          category: "Educational Design",
        },
        {
          id: "tbc6",
          image: "/b6.png",
          category: "Educational Design",
        },
         {
          id: "tbc8",
          image: "/b8.png",
          category: "Educational Design",
        },
      ],
    },
  ]

  const toggleSpoiler = () => {
    setIsSpoilerOpen(!isSpoilerOpen)
  }

  const handleCompanyClick = (
    e: React.MouseEvent,
    company: Company
  ) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = rect.right
    const y = rect.top + rect.height / 2
    
    setClickPosition({ x, y })
    setIsTransitioning(true)
    setSelectedCompany(company)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 200)
  }

  const handleCloseCompany = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedCompany(null)
      setIsClosing(false)
    }, 1000)
  }

  useEffect(() => {
    if (!isInitializing) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      }).from(
        subheadingRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 1,
        },
        "-=0.8",
      )

      gsap.to(".floating-shape", {
        y: "20px",
        rotation: 5,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        stagger: {
          each: 0.2,
          from: "random",
        },
      })

      sectionRefs.current.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }
  }, [isInitializing])

  const handleProjectClick = (
    e: React.MouseEvent,
    project: {
      title: string
      description: string
      year: string
      link?: string
      images?: string[]
      x: number
      y: number
    },
  ) => {
    setClickPosition({ x: project.x, y: project.y })
    setIsTransitioning(true)

    setSelectedProject(project)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 200)
  }

  const handleCloseProject = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedProject(null)
      setIsClosing(false)
    }, 1000)
  }

  const handleInitializationComplete = () => {
    setIsInitializing(false)
  }

  if (isInitializing) {
    return <InitializationScreen onComplete={handleInitializationComplete} />
  }

  return (
    <main className="bg-black min-h-screen text-white" ref={containerRef}>
      <div ref={particleContainerRef} className="fixed inset-0 pointer-events-none z-50" />

      <section className="min-h-screen flex items-center relative overflow-hidden px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-shape absolute top-[20%] right-[10%] w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="floating-shape absolute top-[40%] left-[15%] w-48 h-48 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="floating-shape absolute bottom-[20%] right-[20%] w-56 h-56 bg-purple-700/10 rounded-full blur-3xl"></div>
          <svg className="absolute top-0 right-0 w-1/2 h-full opacity-20" viewBox="0 0 200 200">
            <path
              fill="rgb(168 85 247 / 0.2)"
              d="M37.5,-64.1C48.3,-56.9,56.6,-45.8,65.1,-33.5C73.5,-21.2,82.1,-7.7,81.9,5.8C81.7,19.3,72.8,32.8,62.4,43.2C52,53.6,40.1,60.9,27.2,65.3C14.3,69.7,0.4,71.1,-14.8,69.7C-30,68.3,-46.5,64,-57.8,53.9C-69.1,43.8,-75.2,27.9,-77.7,11.3C-80.2,-5.3,-79.1,-22.7,-71.6,-36.3C-64.1,-49.9,-50.2,-59.8,-36.3,-65.5C-22.4,-71.2,-8.5,-72.8,2.7,-77.1C13.8,-81.3,27.7,-88.3,37.5,-64.1Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="w-full max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <h1 ref={headingRef} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
              <span className="block">I craft</span>
              <span className="block text-stroke text-transparent">Digital Experiences</span>
              <span className="block">& Visual Stories</span>
            </h1>
            <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-400 max-w-2xl">
              Frontend Developer & Graphic Designer creating seamless digital experiences through code and creative
              design
            </p>
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[0] = el
        }}
        className="min-h-screen px-4 md:px-8 lg:px-16"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Skill-Set</h2>
          <div className="h-1 w-24 bg-purple-500 mb-16"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              icon={<Code2 className="w-8 h-8 text-purple-500" />}
              title="Frontend Development"
              description="Developing responsive and high-performance user interfaces with React, Next.js, and modern web standards."
            />
            <SkillCard
              icon={<Database className="w-8 h-8 text-purple-500" />}
              title="Graphic & UI/UX Design"
              description="Designing visually appealing and user-friendly interfaces with tools like Adobe Photoshop, Illustrator, Figma, and Canva."
            />
            <SkillCard
              icon={<Cpu className="w-8 h-8 text-purple-500" />}
              title="Responsive Design"
              description="Creating mobile-friendly layouts with Flexbox, CSS Grid, and Tailwind CSS to ensure compatibility across devices."
            />
            <SkillCard
              icon={<Code className="w-8 h-8 text-purple-500" />}
              title="Collaborative Design"
              description="Working with design tools like Figma to create and implement modern, developer-friendly UI components."
            />
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[1] = el
        }}
        className="min-h-screen flex items-center px-4 md:px-8 lg:px-16"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16">My Works</h2>
          <div className="grid gap-8">
            <WorkItem
              title="Shreya Auto"
              description="Developed as my university final year project. A comprehensive platform for vehicle reconditioning, including buying, selling, renting, and lost & found features, with Google login and Khalti payment integration."
              year="2025"
              link="https://shreya.sthaprabesh.com.np/"
              onClick={handleProjectClick}
            />
            <WorkItem
              title="Hiss & Hunt"
              description="An interactive snake game built using JavaScript, featuring smooth animations and dynamic scoring"
              year="2024"
              onClick={handleProjectClick}
              link="https://hissandhuntbyprabesh.netlify.app"
            />
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[2] = el
        }}
        className="min-h-screen flex items-center px-4 md:px-8 lg:px-16"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16">My Designs</h2>
          <div className="grid gap-8">
            {companies.map((company) => (
              <CompanyItem
                key={company.name}
                title={company.name}
                description={company.description}
                company={company}
                onClick={handleCompanyClick}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionRefs.current[3] = el
        }}
        className="min-h-screen flex items-center px-4 md:px-8 lg:px-16 py-20"
      >
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16">About</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-6 text-xl text-gray-400">
                <p>
                  I design with the eye of an artist and develop with the mind of an engineer, so the web gets the best
                  of both worlds.{" "}
                  <span
                    onClick={toggleSpoiler}
                    className={`cursor-pointer inline-block px-2 py-1 rounded-md ${
                      isSpoilerOpen ? "bg-transparent text-white" : "bg-gray-600 text-transparent"
                    }`}
                    style={{
                      width: isSpoilerOpen ? "auto" : "120px",
                      height: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {isSpoilerOpen ? "it never does" : ""}
                  </span>
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <RippleTransition
        isActive={isTransitioning || isClosing || !!selectedProject || !!selectedCompany}
        isClosing={isClosing}
        x={clickPosition.x}
        y={clickPosition.y}
      />

      {selectedProject && (
        <ProjectDetail
          {...selectedProject}
          onClose={handleCloseProject}
          isVisible={!isTransitioning && !isClosing}
          isClosing={isClosing}
        />
      )}

      {selectedCompany && (
        <CompanyDetail
          company={selectedCompany}
          onClose={handleCloseCompany}
          isVisible={!isTransitioning && !isClosing}
          isClosing={isClosing}
        />
      )}
    </main>
  )
}

function SkillCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-500/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function WorkItem({
  title,
  description,
  year,
  onClick,
  link,
  images,
}: {
  title: string
  description: string
  year: string
  link?: string
  images?: string[]
  onClick: (
    e: React.MouseEvent,
    project: {
      title: string
      description: string
      year: string
      link?: string
      images?: string[]
      x: number
      y: number
    },
  ) => void
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = rect.right
    const y = rect.top + rect.height / 2
    onClick(e, { title, description, link, images, year, x, y })
  }

  return (
    <div className="group border-t border-gray-800 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">{year}</span>
          <button
            onClick={handleClick}
            className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

function CompanyItem({
  title,
  description,
  company,
  onClick,
}: {
  title: string
  description: string
  company: Company
  onClick: (e: React.MouseEvent, company: Company) => void
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick(e, company)
  }

  return (
    <div className="company-item group border-t border-gray-800 py-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        <button
          data-company={title}
          onClick={handleClick}
          className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-all duration-300 group-hover:scale-110 transform relative overflow-hidden"
        >
          <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
        </button>
      </div>
    </div>
  )
}
