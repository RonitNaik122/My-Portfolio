"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import AnimatedBackground from "@/components/animated-background"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Activities from "@/components/activities"
import Footer from "@/components/footer"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="relative min-h-screen" ref={containerRef}>
        {/* Add the animated background component */}
        <AnimatedBackground />

        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>

        <motion.div style={{ opacity, scale }} className="relative h-screen">
          <Hero />
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <p className="mb-2 text-sm">Scroll Down</p>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

        <div className="relative z-10">
          <About />
          <Skills />
          <Projects />
          <Activities />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
