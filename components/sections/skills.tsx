"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  level: number;
  category: string;
}

// Hardcoded skills data
const skills: Skill[] = [
  // Frontend
  { name: "React", level: 95, category: "frontend" },
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "JavaScript", level: 95, category: "frontend" },
  { name: "HTML5", level: 98, category: "frontend" },
  { name: "CSS3", level: 92, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },

  // Backend
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Express.js", level: 80, category: "backend" },
  { name: "Python", level: 78, category: "backend" },
  { name: "Java", level: 70, category: "backend" },
  { name: "PHP", level: 65, category: "backend" },
  { name: "REST APIs", level: 88, category: "backend" },
  { name: "GraphQL", level: 72, category: "backend" },

  // Tools & Software
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 75, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Figma", level: 80, category: "tools" },
  { name: "Adobe XD", level: 70, category: "tools" },
  { name: "Postman", level: 85, category: "tools" },

  // Database & DevOps
  { name: "MongoDB", level: 80, category: "database" },
  { name: "PostgreSQL", level: 75, category: "database" },
  { name: "MySQL", level: 78, category: "database" },
  { name: "Firebase", level: 82, category: "database" },
  { name: "AWS", level: 65, category: "database" },
  { name: "Vercel", level: 88, category: "database" }
];

const categories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools & Software" },
  { id: "database", label: "Database & DevOps" }
];

export function SkillsSection() {
  // Group skills by category
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category.id] = skills.filter(skill => skill.category === category.id);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills & Expertise</h2>
          <Separator className="w-24 h-1 bg-primary mt-4 mb-8" />
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            I've worked with a variety of technologies in web development.
            Here's an overview of my technical skills and proficiency levels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend and Backend with progress bars */}
          {categories.slice(0, 2).map((category, index) => {
            const categorySkills = skillsByCategory[category.id];
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{category.label}</h3>
                    <div className="space-y-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.3 + skillIndex * 0.1 }}
                              viewport={{ once: true }}
                              className={cn(
                                "h-full rounded-full",
                                skill.level >= 90 ? "bg-chart-1" :
                                skill.level >= 80 ? "bg-chart-2" :
                                skill.level >= 70 ? "bg-chart-3" : "bg-chart-4"
                              )}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Tools & Software and Database sections */}
          {categories.slice(2).map((category, index) => {
            const categorySkills = skillsByCategory[category.id];
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{category.label}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categorySkills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.5 + skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="bg-muted p-3 rounded-md text-center text-sm"
                          title={`${skill.level}% proficiency`}
                        >
                          {skill.name}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}