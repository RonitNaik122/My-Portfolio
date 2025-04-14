"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/RonitNaik122" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/Ronit-Naik" },
  { name: "Email", icon: Mail, href: "mailto:ronitnaik122@gmail.com" },
]

export default function Footer() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Button hover animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  // Icon animation variants 
  const iconVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 5,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <footer ref={ref} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-5">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get
            back to you!
          </p>
        </motion.div>

        {/* Responsive social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
            >
              <Button
                variant="outline"
                size="icon"
                asChild
                className="group border-primary/20 hover:border-primary/50 backdrop-blur-sm bg-background/80 dark:bg-background/50 dark:hover:bg-background/70 transition-all duration-300 shadow-sm hover:shadow-md flex sm:hidden"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <motion.div variants={iconVariants}>
                    <link.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </motion.div>
                </a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="group border-primary/20 hover:border-primary/50 backdrop-blur-sm bg-background/80 dark:bg-background/50 dark:hover:bg-background/70 transition-all duration-300 shadow-sm hover:shadow-md hidden sm:flex"
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="flex items-center gap-2"
                >
                  <motion.div variants={iconVariants}>
                    <link.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </motion.div>
                  <span className="font-medium">{link.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Ronit Naik. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}