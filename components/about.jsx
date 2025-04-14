"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { GraduationCap, Building, Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const education = [
  {
    degree: "B.E in Computer Science",
    institution: "Fr. Conceicao Rodrigues College of Engineering, Mumbai",
    period: "Aug 2022 - Present",
    location: "Mumbai, India",
    details: "CGPA: 8.75 (Till Semester IV)",
    icon: Building,
  },
  {
    degree: "HSC",
    institution: "Sardar Vallabhai Patel Vidyalaya, Mumbai",
    period: "2020 - 2022",
    location: "Mumbai, India",
    details: "Percentage: 71",
    icon: GraduationCap,
  },
  {
    degree: "SSC",
    institution: "Queen Marys High School, Mumbai",
    period: "2008 - 2020",
    location: "Mumbai, India",
    details: "Percentage: 83",
    icon: GraduationCap,
  },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="about" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ opacity, scale }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate Computer Science student with diverse skills in web development, 3D modeling,
            cybersecurity, and UI/UX design.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">Education</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/10 hover:border-primary/30 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{item.degree}</CardTitle>
                      </div>
                      <CardDescription className="text-base font-medium">{item.institution}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.period}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{item.location}</div>
                      <div className="text-sm font-medium">{item.details}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
