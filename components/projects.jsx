"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code, Layers, Shield, Server, ExternalLink, Github } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    id: "3d",
    name: "3D Modeling",
    icon: Layers,
    color: "from-purple-500 to-pink-500",
    darkColor: "from-purple-400 to-pink-400",
  },
  {
    id: "fullstack",
    name: "Full Stack",
    icon: Code,
    color: "from-blue-500 to-cyan-400",
    darkColor: "from-blue-400 to-cyan-300",
  },
  {
    id: "cyber",
    name: "Cybersecurity",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    darkColor: "from-red-400 to-orange-400",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: Server,
    color: "from-indigo-500 to-blue-500",
    darkColor: "from-indigo-400 to-blue-400",
  },
]

const projects = [
  {
    id: 1,
    title: "GutFood",
    description:
      "A web application for assessing food safety, identifying ingredients, and providing health risk information via chatbot.",
    category: "fullstack",
    tags: ["React.js", "Django", "Machine Learning"],
    year: "2024",
    link: "https://github.com/gutfood",
  },
  {
    id: 2,
    title: "Commerce Genesis",
    description:
      "An AI/ML-powered e-commerce platform with dynamic pricing, personalized recommendations, AR-based product visualization, and an AI chatbot.",
    category: "fullstack",
    tags: ["TypeScript", "Next.js", "WebXR", "Django", "Flask", "SqlLite", "Stripe"],
    year: "2025",
    link: "https://github.com/commerce-genesis",
  },
  {
    id: 3,
    title: "Alumni Connect",
    description:
      "A platform to connect alumni with students, enabling discussions, event updates, and secure donations with real-time chat.",
    category: "fullstack",
    tags: ["React.js", "Django", "Express", "Three.js", "Android Studio"],
    year: "2023",
    link: "https://github.com/AlumniConnect",
  },
  {
    id: 4,
    title: "3D Game Assets",
    description: "Collection of 3D models and animations created for various game development projects.",
    category: "3d",
    tags: ["Blender", "Unreal Engine", "3D Modeling", "Animation"],
    year: "2023",
    link: "#",
  },
  {
    id: 5,
    title: "AR Product Viewer",
    description: "Augmented reality application for visualizing products in real-world environments.",
    category: "3d",
    tags: ["WebXR", "Three.js", "AR", "React"],
    year: "2024",
    link: "#",
  },
  {
    id: 6,
    title: "Security Audit Tool",
    description: "Automated security assessment tool for web applications and network infrastructure.",
    category: "cyber",
    tags: ["Python", "Security", "Vulnerability Analysis"],
    year: "2023",
    link: "#",
  },
  {
    id: 7,
    title: "Secure Authentication System",
    description: "Implementation of OAuth/JWT authentication with enhanced security features.",
    category: "cyber",
    tags: ["JWT", "OAuth", "Security", "Node.js"],
    year: "2024",
    link: "#",
  },
  {
    id: 8,
    title: "CI/CD Pipeline",
    description: "Automated deployment pipeline for continuous integration and delivery.",
    category: "devops",
    tags: ["GitHub Actions", "Docker", "Automation"],
    year: "2023",
    link: "#",
  },
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [clickedCategory, setClickedCategory] = useState(null)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const currentCategory = clickedCategory || activeCategory
  const filteredProjects = currentCategory ? projects.filter((project) => project.category === currentCategory) : []

  return (
    <section id="projects" ref={ref} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[30%] left-[10%] w-[25%] h-[25%] rounded-full bg-green-500/5 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute top-[10%] right-[30%] w-[20%] h-[20%] rounded-full bg-purple-500/5 blur-2xl" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ opacity, scale }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-mute-foreground max-w-2xl mx-auto">
            Explore my work across different fields. Hover or click a category to see related projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              onHoverStart={() => {
                if (!clickedCategory) setActiveCategory(category.id)
              }}
              onClick={() => {
                setClickedCategory(category.id)
                setActiveCategory(category.id)
              }}
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
            >
              <div
                className={`relative h-full overflow-hidden rounded-xl border backdrop-blur-sm bg-background/80 ${
                  currentCategory === category.id ? "border-primary" : "border-primary/10"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} dark:${category.darkColor} opacity-0 ${
                    currentCategory === category.id ? "opacity-10" : ""
                  } transition-opacity duration-500`}
                />

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} dark:${category.darkColor} flex items-center justify-center`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {currentCategory === category.id
                      ? `Showing ${filteredProjects.length} projects`
                      : "Hover to see projects"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {currentCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full backdrop-blur-sm bg-background/80 border-primary/10 hover:border-primary/30 transition-all">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{project.title}</CardTitle>
                          <Badge variant="outline">{project.year}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4">{project.description}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" asChild className="group">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4 group-hover:text-primary transition-colors" />
                            <span>View Project</span>
                            <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
