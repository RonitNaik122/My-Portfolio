"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Award, Users, Calendar, Code2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    title: "GDA Co-Lead",
    period: "2024 - Present",
    description:
      "Led in a team of 15 members in organizing 8 events and initiatives, enhancing leadership and organizational skills.",
    icon: Users,
  },
  {
    title: "Cleared SIH Internal 2x",
    period: "2023 - 2024",
    description:
      "Successfully advanced through Internal Level 2x in the Smart India Hackathon, focusing on disaster management and Ship Routing in the Indian Ocean.",
    icon: Award,
  },
  {
    title: "Organized Beyond Pixel Hackathon",
    period: "Crescendo 2024",
    description:
      "Managed a 4-day game development hackathon, engaging participants and fostering technical skill development.",
    icon: Calendar,
  },
  {
    title: "Collaborated on Educational Game",
    period: "2023 - 2024",
    description:
      "Contributed to the development of an educational game using Unreal Engine, including level design and asset creation.",
    icon: Code2,
  },
  {
    title: "Junior Animator for GDA Council",
    period: "2023 - 2024",
    description: "Created marketing reels and game assets, promoting the council's events and initiatives effectively.",
    icon: Users,
  },
  {
    title: "Participated in Multiple Hackathons",
    period: "2023 - 2024",
    description:
      "Secured a Top 10 position out of 80 teams in the Need for Code 3.0 hackathon, focusing on the AI ML domain.",
    icon: Award,
  },
]

export default function Activities() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="activities" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[15%] right-[20%] w-[25%] h-[25%] rounded-full bg-yellow-500/5 blur-3xl" />
          <div className="absolute bottom-[15%] left-[15%] w-[20%] h-[20%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-[40%] left-[40%] w-[15%] h-[15%] rounded-full bg-green-500/5 blur-2xl" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ opacity, scale }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
            Co-Curricular Activities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond academics, I actively participate in various technical and leadership activities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/10 hover:border-primary/30 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm font-medium">{activity.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
