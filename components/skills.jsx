"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Layers, Shield, Server, Palette, Cpu, Gamepad2, Lightbulb } from "lucide-react"

const skills = [
  {
    category: "Web Development",
    icon: Code,
    color: "from-blue-500 to-cyan-400",
    darkColor: "from-blue-400 to-cyan-300",
    skills: ["React.js", "TypeScript", "Next.js", "Django", "Express"],
    description: "Building responsive and dynamic web applications with modern frameworks and technologies.",
  },
  {
    category: "3D Modeling & Animation",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    darkColor: "from-purple-400 to-pink-400",
    skills: ["Three.js", "Unreal Engine", "Game Asset Creation", "Animation"],
    description: "Creating immersive 3D experiences, game assets, and animations for various applications.",
  },
  {
    category: "Cybersecurity",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    darkColor: "from-red-400 to-orange-400",
    skills: ["Security Assessment", "Vulnerability Analysis", "Network Security"],
    description: "Implementing secure systems and performing comprehensive security assessments.",
  },
  {
    category: "UI/UX Design",
    icon: Palette,
    color: "from-green-500 to-emerald-400",
    darkColor: "from-green-400 to-emerald-300",
    skills: ["User Interface Design", "User Experience", "Prototyping", "Wireframing"],
    description: "Designing intuitive and aesthetically pleasing user interfaces with focus on user experience.",
  },
  {
    category: "AR/VR",
    icon: Gamepad2,
    color: "from-amber-500 to-yellow-400",
    darkColor: "from-amber-400 to-yellow-300",
    skills: ["WebXR", "AR Applications", "VR Development", "Immersive Experiences"],
    description: "Developing augmented and virtual reality applications for immersive user experiences.",
  },
  {
    category: "DevOps",
    icon: Server,
    color: "from-indigo-500 to-blue-500",
    darkColor: "from-indigo-400 to-blue-400",
    skills: ["CI/CD Pipelines", "Deployment Automation", "Container Orchestration"],
    description: "Streamlining development operations and implementing efficient deployment processes.",
  },
  {
    category: "Problem Solving",
    icon: Lightbulb,
    color: "from-yellow-500 to-amber-500",
    darkColor: "from-yellow-400 to-amber-400",
    skills: ["DSA", "Critical Thinking", "Algorithmic Solutions", "Fast Learning"],
    description: "Applying data structures and algorithms to solve complex problems efficiently.",
  },
  {
    category: "Leadership",
    icon: Cpu,
    color: "from-teal-500 to-green-500",
    darkColor: "from-teal-400 to-green-400",
    skills: ["Team Collaboration", "Time Management", "Adaptability", "Creative Thinking"],
    description: "Leading teams and projects with effective communication and organizational skills.",
  },
]

export default function Skills() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="skills" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Parallax background elements */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute bottom-[10%] left-[5%] w-[20%] h-[20%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-[50%] left-[30%] w-[15%] h-[15%] rounded-full bg-purple-500/5 blur-2xl" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ opacity, scale }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
            My Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse set of technical and soft skills that I've developed through education and projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-xl border border-primary/10 backdrop-blur-sm bg-background/80">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} dark:${skill.darkColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} dark:${skill.darkColor} flex items-center justify-center`}
                    >
                      <skill.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{skill.category}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {skill.skills.map((item, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${skill.color} dark:${skill.darkColor} bg-opacity-10 text-primary`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
