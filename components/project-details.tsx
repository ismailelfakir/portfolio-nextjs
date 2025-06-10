"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Monitor } from "lucide-react";
import { DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";

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

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        <DialogDescription className="text-base opacity-90">
          {project.description}
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-6">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-auto rounded-lg object-cover aspect-video"
        />
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Project Overview</h3>
        <p className="text-muted-foreground">{project.longDescription}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Badge variant="secondary">{tag}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Key Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc pl-5">
          {project.features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="text-muted-foreground"
            >
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {project.links.demo && (
          <Button asChild className="flex items-center gap-2">
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Monitor className="h-4 w-4" />
              View Live Demo
            </a>
          </Button>
        )}
        {project.links.github && (
          <Button variant="outline" asChild className="flex items-center gap-2">
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View Source Code
            </a>
          </Button>
        )}
      </div>
    </>
  );
}