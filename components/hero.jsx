"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ease-in-out">
        {/* Loading placeholder */}
      </section>
    );
  }

  const isDark = theme === "dark";

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden transition-colors duration-500 ease-in-out">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b transition-colors duration-500 ease-in-out ${
          isDark ? "from-[#0a0f30] to-[#000000]" : "from-slate-100 to-white"
        }`}
      />

      {/* Parallax Orbs (Scroll-based) */}
      <motion.div
        className="absolute -top-32 left-10 w-96 h-96 rounded-full opacity-30 blur-3xl transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: isDark ? "#1a1a6f" : "#e0e7ff",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      <motion.div
        className="absolute top-40 right-10 w-96 h-96 rounded-full opacity-20 blur-2xl transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: isDark ? "#3c3ca1" : "#c7d2fe",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      <motion.div
        className="absolute bottom-0 w-full h-72 rounded-t-[100px] opacity-30 blur-[120px] transition-colors duration-500 ease-in-out"
        style={{
          backgroundColor: isDark ? "#191970" : "#dbeafe",
          transform: `translateY(${scrollY * -0.2}px)`,
        }}
        transition={{ type: "spring", damping: 15 }}
      />

      {/* Main Content */}
      <motion.div
        className="z-10 text-center transition-colors duration-500 ease-in-out"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Line Above */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "240px" }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </motion.div>

        {/* Name with smooth color & shadow */}
        <motion.h1
          className={`text-5xl md:text-6xl font-bold mb-4 relative transition-colors duration-500 ease-in-out ${
            isDark ? "text-white" : "text-slate-900"
          }`}
          initial={{ letterSpacing: "0.2em" }}
          animate={{
            letterSpacing: "0.1em",
            textShadow: isDark
              ? "0 0 15px rgba(176, 170, 255, 0.3)"
              : "0 0 15px rgba(59, 130, 246, 0.2)",
          }}
          transition={{
            letterSpacing: { delay: 0.3, duration: 1.5 },
            textShadow: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          RONIT NAIK
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          className="text-xl md:text-2xl gradient-text font-semibold mb-6 transition-colors duration-500 ease-in-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Computer Science Student
        </motion.h2>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="transition-colors duration-500 ease-in-out"
        >
          <p className="text-sm md:text-base text-slate-600 dark:text-gray-300 transition-colors duration-500 ease-in-out">
            ronitnaik122@gmail.com &nbsp; • &nbsp; +91 9920228221
          </p>
          <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 mt-1 transition-colors duration-500 ease-in-out">
            Mumbai, India
          </p>
        </motion.div>

        {/* Line Below */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "160px" }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
