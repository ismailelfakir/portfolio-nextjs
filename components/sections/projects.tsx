"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { ProjectDetails } from "@/components/project-details";

// Project data interface
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "web" | "mobile" | "design" | "other";
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
  features: string[];
}

// Hardcoded project data
const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "A responsive admin dashboard for managing e-commerce operations with real-time analytics and inventory management.",
    longDescription: "A comprehensive e-commerce dashboard built with React and TypeScript, featuring real-time analytics, inventory management, order processing, and customer management. The dashboard includes interactive charts, data visualization, and a responsive design that works seamlessly across all devices.",
    category: "web",
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    links: {
      demo: "https://example.com/demo",
      github: "https://github.com/johndoe/ecommerce-dashboard"
    },
    features: [
      "Real-time sales analytics",
      "Inventory management system",
      "Order processing workflow",
      "Customer management",
      "Responsive design",
      "Dark/light mode support"
    ]
  },
  {
    id: "2",
    title: "Health & Fitness App",
    description: "A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.",
    longDescription: "A comprehensive health and fitness mobile application that helps users track their workouts, monitor nutrition intake, and analyze health metrics. The app features personalized workout recommendations, meal planning, progress tracking, and social features to connect with other fitness enthusiasts.",
    category: "mobile",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["React Native", "Node.js", "MongoDB", "Express"],
    links: {
      demo: "https://example.com/fitness-app",
      github: "https://github.com/johndoe/fitness-app"
    },
    features: [
      "Workout tracking and planning",
      "Nutrition monitoring",
      "Progress analytics",
      "Social features",
      "Personalized recommendations",
      "Offline mode support"
    ]
  },
  {
    id: "3",
    title: "Financial Portfolio Tracker",
    description: "A web application for tracking investment portfolios with real-time market data and performance analytics.",
    longDescription: "A sophisticated financial portfolio tracking application that provides real-time market data, performance analytics, and investment insights. Users can track multiple portfolios, analyze asset allocation, monitor market trends, and receive personalized investment recommendations based on their risk profile.",
    category: "web",
    image: "https://images.pexels.com/photos/187041/pexels-photo-187041.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Next.js", "Python", "PostgreSQL", "D3.js"],
    links: {
      demo: "https://example.com/portfolio-tracker",
      github: "https://github.com/johndoe/portfolio-tracker"
    },
    features: [
      "Real-time market data",
      "Portfolio performance analytics",
      "Asset allocation visualization",
      "Risk assessment tools",
      "Investment recommendations",
      "Multi-currency support"
    ]
  },
  {
    id: "4",
    title: "Travel Photography Site",
    description: "A stunning portfolio website showcasing travel photography with an immersive gallery experience.",
    longDescription: "An elegant travel photography portfolio website featuring an immersive gallery experience, interactive maps showing photo locations, and a blog section for travel stories. The site includes advanced image optimization, lazy loading, and a responsive design that showcases photography in the best possible light.",
    category: "design",
    image: "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Vue.js", "Nuxt.js", "SCSS", "Strapi"],
    links: {
      demo: "https://example.com/travel-photography",
      github: "https://github.com/johndoe/travel-photography"
    },
    features: [
      "Immersive photo gallery",
      "Interactive location maps",
      "Travel blog integration",
      "Image optimization",
      "Responsive design",
      "SEO optimization"
    ]
  }
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section id="projects" className="py-20 md:py-24 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Projects</h2>
          <Separator className="w-24 h-1 bg-primary mt-4 mb-8" />
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            A selection of my recent work, showcasing my skills in web development, 
            mobile applications, and digital transformation.
          </p>
        </motion.div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline">+{project.tags.length - 3}</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={() => setSelectedProject(project)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                          {selectedProject && <ProjectDetails project={selectedProject} />}
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between">
                      {project.links.github && (
                        <Button variant="ghost\" size="sm\" asChild>
                          <a 
                            href={project.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.links.demo && (
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={project.links.demo} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button asChild size="lg">
            <a href="https://github.com/ismailelfakir" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}