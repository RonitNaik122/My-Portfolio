"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code, Layers, Shield, Server, ExternalLink, Github, ChevronUp, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

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
    title: "E-learning Platform",
    description:
      "Comprehensive online learning platform with interactive courses, quizzes, and progress tracking.",
    category: "fullstack",
    tags: ["React.js", "MongoDB", "Express", "Socket.io", "AWS"],
    year: "2024",
    link: "https://github.com/elearning-platform",
  },
  {
    id: 5,
    title: "Smart Home Dashboard",
    description:
      "Dashboard for monitoring and controlling IoT devices in a smart home environment.",
    category: "fullstack",
    tags: ["Vue.js", "Node.js", "MQTT", "IoT", "WebSockets"],
    year: "2024",
    link: "https://github.com/smarthome-dashboard",
  },
  {
    id: 6,
    title: "3D Game Assets",
    description: "Collection of 3D models and animations created for various game development projects.",
    category: "3d",
    tags: ["Blender", "Unreal Engine", "3D Modeling", "Animation"],
    year: "2023",
    link: "#",
  },
  {
    id: 7,
    title: "AR Product Viewer",
    description: "Augmented reality application for visualizing products in real-world environments.",
    category: "3d",
    tags: ["WebXR", "Three.js", "AR", "React"],
    year: "2024",
    link: "#",
  },
  {
    id: 8,
    title: "Character Modeling",
    description: "3D character models designed for animation and game development.",
    category: "3d",
    tags: ["Maya", "ZBrush", "Substance Painter", "Rigging"],
    year: "2024",
    link: "#",
  },
  {
    id: 9,
    title: "Virtual Exhibition Space",
    description: "Interactive 3D gallery for displaying digital art in a virtual environment.",
    category: "3d",
    tags: ["Unity", "WebGL", "3D Modeling", "Interactive Design"],
    year: "2025",
    link: "#",
  },
  {
    id: 10,
    title: "Security Audit Tool",
    description: "Automated security assessment tool for web applications and network infrastructure.",
    category: "cyber",
    tags: ["Python", "Security", "Vulnerability Analysis"],
    year: "2023",
    link: "#",
  },
  {
    id: 11,
    title: "Secure Authentication System",
    description: "Implementation of OAuth/JWT authentication with enhanced security features.",
    category: "cyber",
    tags: ["JWT", "OAuth", "Security", "Node.js"],
    year: "2024",
    link: "#",
  },
  {
    id: 12,
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
  const [currentPage, setCurrentPage] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(0) // -1 for up, 1 for down
  
  const sectionRef = useRef(null)
  
  const PROJECTS_PER_PAGE = 2

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const currentCategory = clickedCategory || activeCategory
  const filteredProjects = currentCategory ? projects.filter((project) => project.category === currentCategory) : []
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  
  // Get current visible projects
  const currentProjects = filteredProjects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  )

  // Calculate displayed projects so far
  const projectsViewedSoFar = Math.min((currentPage + 1) * PROJECTS_PER_PAGE, filteredProjects.length)
  const projectCountDisplay = `${projectsViewedSoFar} of ${filteredProjects.length}`

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(0)
  }, [currentCategory])

  // Animation variants for project cards
  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300, // Slide in from right or left
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300, // Exit to left or right
      opacity: 0
    })
  }

  // Navigation handlers
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setScrollDirection(-1)
      setCurrentPage(prev => prev - 1)
    }
  }
  
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setScrollDirection(1)
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              {/* Separator between categories and projects */}
              <Separator className="my-8" />
              
              {/* Navigation and project counter */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {categories.find(c => c.id === currentCategory)?.name} Projects
                </h3>
                
                {filteredProjects.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {projectCountDisplay}
                    </span>
                    
                    {/* Navigation controls */}
                    {filteredProjects.length > PROJECTS_PER_PAGE && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          className="h-8 w-8"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleNextPage}
                          disabled={currentPage >= totalPages - 1}
                          className="h-8 w-8"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Projects container */}
              <div className="relative min-h-[300px]">                
                {/* Projects display */}
                <AnimatePresence mode="wait" custom={scrollDirection} initial={false}>
                  <motion.div 
                    key={currentPage}
                    custom={scrollDirection}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={cardVariants}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                  >
                    {currentProjects.map((project) => (
                      <div key={project.id}>
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
                              {project.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">
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
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Mobile scroll indicators */}
              <div className="flex justify-center mt-6 md:hidden">
                {currentPage > 0 && (
                  <div className="flex flex-col items-center animate-bounce mr-8">
                    <Button variant="ghost" size="sm" onClick={handlePrevPage}>
                      <ChevronUp className="h-5 w-5" />
                      <span className="ml-1">Previous</span>
                    </Button>
                  </div>
                )}
                
                {currentPage < totalPages - 1 && (
                  <div className="flex flex-col items-center animate-bounce">
                    <Button variant="ghost" size="sm" onClick={handleNextPage}>
                      <span className="mr-1">Next</span>
                      <ChevronDown className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}