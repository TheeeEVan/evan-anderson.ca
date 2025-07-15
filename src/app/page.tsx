/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
"use client"
import { Suspense, useEffect, useState } from "react"
import { Typewriter } from "react-simple-typewriter"
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import TransitionLink from "../components/TransitionLink"
import { useSearchParams } from "next/navigation"

// Helper to interpolate between two colors
function lerpColor(a: string, b: string, t: number) {
  // a, b: hex colors, t: 0-1
  const ah = a.replace('#', '')
  const bh = b.replace('#', '')
  const ar = parseInt(ah.substring(0, 2), 16)
  const ag = parseInt(ah.substring(2, 4), 16)
  const ab = parseInt(ah.substring(4, 6), 16)
  const br = parseInt(bh.substring(0, 2), 16)
  const bg = parseInt(bh.substring(2, 4), 16)
  const bb = parseInt(bh.substring(4, 6), 16)
  const rr = Math.round(ar + (br - ar) * t)
  const rg = Math.round(ag + (bg - ag) * t)
  const rb = Math.round(ab + (bb - ab) * t)
  return `#${rr.toString(16).padStart(2, '0')}${rg.toString(16).padStart(2, '0')}${rb.toString(16).padStart(2, '0')}`
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}

function HomeContent() {
  const searchParams = useSearchParams()
  const SKIP_ANIM = searchParams.get("skip") === "true"

  // Use state for isMobile to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])
  
  const [animationRunning, setAnimationRunning] = useState<boolean>(true)
  const [exitTrasnition, setExitTransition] = useState<boolean>(false)
  const [sunriseProgress, setSunriseProgress] = useState<number>(0) // 0 (night) to 1 (day)
  const [showTypewriter, setShowTypewriter] = useState(true)
  const [sunriseStarted, setSunriseStarted] = useState(false)
  
  // Much shorter durations for mobile
  const TYPEWRITER_DURATION = isMobile ? 1200 : 28000 // ms
  const SUNRISE_DURATION = isMobile ? 1000 : 7000 // ms
  
  const pages = ["About Me", "Tools", "Projects", "Resume", "Contact"]
  
  useEffect(() => {
    if (SKIP_ANIM) {
      setAnimationRunning(false)
      setSunriseProgress(1)
      setShowTypewriter(false)
      setSunriseStarted(true)
      return
    }
    setSunriseProgress(0)
    setAnimationRunning(true)
    setShowTypewriter(true)
    setSunriseStarted(false)
    // Typewriter phase
    const typewriterTimer = setTimeout(() => {
      setShowTypewriter(false)
      setSunriseStarted(true)
      // Start sunrise
      const start = Date.now()
      let frame: number
      function animate() {
        const elapsed = Date.now() - start
        const t = Math.min(elapsed / SUNRISE_DURATION, 1)
        setSunriseProgress(t)
        if (t < 1) {
          frame = requestAnimationFrame(animate)
        } else {
          setAnimationRunning(false)
        }
      }
      frame = requestAnimationFrame(animate)
    }, TYPEWRITER_DURATION)
    return () => clearTimeout(typewriterTimer)
  }, [SKIP_ANIM, isMobile])
  
  // Define sunrise gradient stops
  const nightTop = "#000000" // pure black
  const nightBottom = "#000000" // pure black
  const sunriseTop = "#ffb347" // orange
  const sunriseBottom = "#ffcc80" // light orange
  const dayTop = "#87ceeb" // sky blue
  const dayBottom = "#fff8dc" // light yellow
  
  // Interpolate between night -> sunrise -> day
  let topColor = nightTop, bottomColor = nightBottom
  if (sunriseStarted) {
    if (sunriseProgress < 0.5) {
      // Night to sunrise
      const t = sunriseProgress * 2
      topColor = lerpColor(nightTop, sunriseTop, t)
      bottomColor = lerpColor(nightBottom, sunriseBottom, t)
    } else {
      // Sunrise to day
      const t = (sunriseProgress - 0.5) * 2
      topColor = lerpColor(sunriseTop, dayTop, t)
      bottomColor = lerpColor(sunriseBottom, dayBottom, t)
    }
  }
  const gradientBg = `linear-gradient(to bottom, ${topColor}, ${bottomColor})`

  if (isMobile) {
    return <MobileHomeContent skip={SKIP_ANIM} />
  }

  
  return (
    <div
    className={`relative w-screen h-screen pt-20 transition-opacity duration-1000 ease-in ${SKIP_ANIM ? "animate-fade-in" : ""} ${exitTrasnition ? "opacity-0" : "opacity-100"} overflow-hidden`}
    style={{ background: sunriseStarted ? gradientBg : nightTop }}
    >
      {/* Main content */}
      <div className={`transition-opacity ${SKIP_ANIM ? "duration-1000" : "duration-5000"} ${animationRunning ? "opacity-0" : "opacity-100"}`} style={{ zIndex: 1, position: "relative" }}>
        <div className="w-full flex justify-around">
          <div>
            <div className="text-black text-8xl font-bold z-10">Evan Anderson</div>
            <div className="text-gray-700 text-2xl font-semibold">Computer Engineering Student and Web Developer</div>
            <div className="flex gap-6 mt-6">
              <a href="https://github.com/TheeeEVan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub size={32} className="text-black hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/evan-e-anderson/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={32} className="text-black hover:text-evan-blue transition-colors" />
              </a>
                <a href="https://www.instagram.com/evan_anderson06/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram size={32} className="text-black hover:text-pink-500 transition-colors" />
                </a>
              <a href="mailto:e.e.anderson@shaw.ca" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <FaEnvelope size={32} className="text-black hover:text-white transition-colors" />
              </a>
            </div>
            <div className="w-full h-full mt-24 flex flex-col gap-10 ">
              {
                pages.map((page, index) => {
                  return (
                    <TransitionLink
                    href={`/${page.toLowerCase().replace(" ", "-")}`}
                    className="w-fit font-bold text-4xl relative cursor-pointer group"
                    transitionFunction={() => {
                      setExitTransition(true)
                    }}
                    key={index}
                    >
                      {page}
                      <span
                        className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"
                      />
                    </TransitionLink>
                  )
                })
              }
            </div>
          </div>
          <img src="/me.jpg" className="rounded-full max-h-72" />
        </div>
      </div>
      {/* TYPEWRITER */}
      {showTypewriter && (
        <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center`}>
          <div className="text-white text-6xl font-bold text-center">
            <Typewriter words={["Hi there.", "Nice to meet you.", "My name is Evan.", "I like building apps.", "You can't see anything?", "Maybe it's a little dark...", "Let me turn the lights up.", ""]} typeSpeed={50} deleteSpeed={30} delaySpeed={2000} />
          </div>
        </div>
      )}
    </div>
  )
}

// Mobile-only home page: typewriter, then fade in main content, no sunrise
function MobileHomeContent(props: { skip?: boolean }) {
  const [showTypewriter, setShowTypewriter] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const TYPEWRITER_DURATION = 28000 // ms
  const pages = ["About Me", "Tools", "Projects", "Resume", "Contact"]

  useEffect(() => {
    if (props.skip) {
      setShowTypewriter(false)
      setShowContent(true)
      return
    }

    const timer = setTimeout(() => {
      setShowTypewriter(false)
      setShowContent(true)
    }, TYPEWRITER_DURATION)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`w-screen h-screen transition-colors flex flex-col items-center justify-center  ${showTypewriter ? "bg-black" : "bg-gradient-to-b from-[#87ceeb] to-[#fff8dc]"}`}>
      {showTypewriter && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black">
          <div className="text-white text-4xl font-bold text-center px-4">
            <Typewriter words={["Hi there.", "Nice to meet you.", "My name is Evan.", "I like building apps.", "You can't see anything?", "Maybe it's a little dark...", "Let me turn the lights up.", ""]} typeSpeed={50} deleteSpeed={30} delaySpeed={2000} />
          </div>
        </div>
      )}
      <div className={`transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"} w-full flex flex-col items-center z-10`} style={{ minHeight: '100vh' }}>
        <div className="text-black text-4xl font-bold mt-12">Evan Anderson</div>
        <div className="text-gray-700 text-lg font-semibold mb-6">Computer Engineering Student and Web Developer</div>
        <img src="/me.jpg" className="rounded-full max-h-40 mb-4" />
        <div className="flex gap-6 mb-8">
          <a href="https://github.com/TheeeEVan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={28} className="text-black hover:text-evan-green transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/evan-e-anderson/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={28} className="text-black hover:text-evan-blue transition-colors" />
          </a>
          <a href="mailto:e.e.anderson@shaw.ca" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <FaEnvelope size={28} className="text-black hover:text-evan-red transition-colors" />
          </a>
        </div>
        <div className="flex flex-col gap-6 w-full items-center">
          {pages.map((page, index) => (
            <a
              href={`/${page.toLowerCase().replace(" ", "-")}`}
              className="w-fit font-bold text-2xl relative cursor-pointer group text-black"
              key={index}
            >
              {page}
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
