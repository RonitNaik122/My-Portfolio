"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useSpring, useTransform, useScroll } from "framer-motion"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const { theme } = useTheme()
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const [mounted, setMounted] = useState(false)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const animationRef = useRef()

  const { scrollYProgress } = useScroll()

  // Smoothed scroll speed with spring physics
  const smoothScrollSpeed = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Transform scroll speed to visual properties
  const particleScale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.8, 1, 1.2])
  const particleOpacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.7, 0.5, 0.7])
  const particleBlur = useTransform(smoothScrollSpeed, [-20, 0, 20], [10, 15, 10])
  const bgRotation = useTransform(smoothScrollSpeed, [-20, 0, 20], [-5, 0, 5])

  // Pre-define transforms for small particles at the component level
  // We'll create 6 sets of transforms that will be reused by our particles
  const smallParticle1Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.7, 1, 1.3])
  const smallParticle1Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.8, 0.5, 0.8])
  const smallParticle1X = useTransform(smoothScrollSpeed, [-20, 0, 20], [20, 0, -20])
  const smallParticle1Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-20, 0, 20])

  const smallParticle2Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.65, 1, 1.35])
  const smallParticle2Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.85, 0.5, 0.85])
  const smallParticle2X = useTransform(smoothScrollSpeed, [-20, 0, 20], [25, 0, -25])
  const smallParticle2Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-25, 0, 25])

  const smallParticle3Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.75, 1, 1.25])
  const smallParticle3Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.75, 0.5, 0.75])
  const smallParticle3X = useTransform(smoothScrollSpeed, [-20, 0, 20], [15, 0, -15])
  const smallParticle3Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-15, 0, 15])

  const smallParticle4Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.8, 1, 1.2])
  const smallParticle4Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.7, 0.5, 0.7])
  const smallParticle4X = useTransform(smoothScrollSpeed, [-20, 0, 20], [30, 0, -30])
  const smallParticle4Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-30, 0, 30])

  const smallParticle5Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.6, 1, 1.4])
  const smallParticle5Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.9, 0.5, 0.9])
  const smallParticle5X = useTransform(smoothScrollSpeed, [-20, 0, 20], [18, 0, -18])
  const smallParticle5Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-18, 0, 18])

  const smallParticle6Scale = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.7, 1, 1.3])
  const smallParticle6Opacity = useTransform(smoothScrollSpeed, [-20, 0, 20], [0.8, 0.5, 0.8])
  const smallParticle6X = useTransform(smoothScrollSpeed, [-20, 0, 20], [22, 0, -22])
  const smallParticle6Y = useTransform(smoothScrollSpeed, [-20, 0, 20], [-22, 0, 22])

  // Group all transforms for easier access
  const smallParticleTransforms = [
    { scale: smallParticle1Scale, opacity: smallParticle1Opacity, x: smallParticle1X, y: smallParticle1Y },
    { scale: smallParticle2Scale, opacity: smallParticle2Opacity, x: smallParticle2X, y: smallParticle2Y },
    { scale: smallParticle3Scale, opacity: smallParticle3Opacity, x: smallParticle3X, y: smallParticle3Y },
    { scale: smallParticle4Scale, opacity: smallParticle4Opacity, x: smallParticle4X, y: smallParticle4Y },
    { scale: smallParticle5Scale, opacity: smallParticle5Opacity, x: smallParticle5X, y: smallParticle5Y },
    { scale: smallParticle6Scale, opacity: smallParticle6Opacity, x: smallParticle6X, y: smallParticle6Y },
  ]

  // Calculate scroll speed
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const currentTime = Date.now()
      const currentScrollY = window.scrollY
      const timeDelta = currentTime - lastScrollTime.current

      if (timeDelta > 50) {
        // Throttle calculations
        // Calculate pixels per second
        const scrollDelta = currentScrollY - lastScrollY.current
        const speed = (scrollDelta / timeDelta) * 1000

        // Update scroll speed state (clamped)
        setScrollSpeed(Math.min(Math.max(speed, -20), 20))

        // Update refs for next calculation
        lastScrollY.current = currentScrollY
        lastScrollTime.current = currentTime
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update spring animation with current scroll speed
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const updateSpring = () => {
      smoothScrollSpeed.set(scrollSpeed)
      animationRef.current = requestAnimationFrame(updateSpring)
    }

    animationRef.current = requestAnimationFrame(updateSpring)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [scrollSpeed, smoothScrollSpeed])

  if (!mounted) return null

  const isDark = theme === "dark"

  // Create small particles with fixed properties
  const smallParticles = [
    { size: 15, xPos: 20, yPos: 15 },
    { size: 18, xPos: 70, yPos: 25 },
    { size: 12, xPos: 40, yPos: 60 },
    { size: 20, xPos: 85, yPos: 75 },
    { size: 14, xPos: 30, yPos: 85 },
    { size: 16, xPos: 60, yPos: 45 },
  ]

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Main background gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isDark ? "bg-gradient-to-b from-[#0a0f30] to-[#000000]" : "bg-gradient-to-b from-slate-100 to-white"
        }`}
      />

      {/* Animated particles */}
      <motion.div
        className="absolute inset-0"
        style={{
          rotate: bgRotation,
        }}
      >
        {/* Large central particle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "60vw",
            height: "60vw",
            backgroundColor: isDark ? "rgba(30, 64, 175, 0.03)" : "rgba(59, 130, 246, 0.03)",
            scale: particleScale,
            opacity: particleOpacity,
            filter: `blur(${particleBlur}px)`,
          }}
        />

        {/* Top-left particle */}
        <motion.div
          className="absolute -top-[10%] -left-[10%] rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            backgroundColor: isDark ? "rgba(139, 92, 246, 0.03)" : "rgba(99, 102, 241, 0.03)",
            scale: particleScale,
            opacity: particleOpacity,
            filter: `blur(${particleBlur}px)`,
          }}
        />

        {/* Bottom-right particle */}
        <motion.div
          className="absolute -bottom-[20%] -right-[10%] rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            backgroundColor: isDark ? "rgba(79, 70, 229, 0.03)" : "rgba(147, 197, 253, 0.03)",
            scale: particleScale,
            opacity: particleOpacity,
            filter: `blur(${particleBlur}px)`,
          }}
        />

        {/* Small particles that move more dramatically with scroll */}
        {smallParticles.map((particle, index) => {
          const { size, xPos, yPos } = particle
          const { scale, opacity, x, y } = smallParticleTransforms[index]

          // Generate random color values for each particle
          const r = 100 + Math.floor(Math.random() * 155)
          const g = 70 + Math.floor(Math.random() * 100)
          const b = 200 + Math.floor(Math.random() * 55)

          const lightR = 200 + Math.floor(Math.random() * 55)
          const lightG = 200 + Math.floor(Math.random() * 55)
          const lightB = 250

          return (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: `${size}vw`,
                height: `${size}vw`,
                left: `${xPos}%`,
                top: `${yPos}%`,
                backgroundColor: isDark
                  ? `rgba(${r}, ${g}, ${b}, 0.02)`
                  : `rgba(${lightR}, ${lightG}, ${lightB}, 0.02)`,
                scale: scale,
                opacity: opacity,
                filter: "blur(15px)",
                x: x,
                y: y,
              }}
            />
          )
        })}
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className={`absolute inset-0 opacity-[0.03] transition-opacity duration-1000 ${
          isDark ? "opacity-[0.04]" : "opacity-[0.02]"
        }`}
        style={{
          backgroundImage: `linear-gradient(to right, ${isDark ? "#fff" : "#000"} 1px, transparent 1px), 
                           linear-gradient(to bottom, ${isDark ? "#fff" : "#000"} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
