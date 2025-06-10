"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AboutSection() {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV-ISMAIL-ELFAKIR-en.pdf';
    link.download = 'CV-ISMAIL-ELFAKIR-en.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 md:py-24 bg-muted/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <Separator className="w-24 h-1 bg-primary mt-4 mb-8" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto md:mr-auto md:ml-0 rounded-lg overflow-hidden">
              <img 
                src="/image.png" 
                alt="Ismail El Fakir" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">
              Full Stack Developer based in Casablanca
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm a passionate Full Stack Developer with experience in creating modern web applications. I specialize in React, Next.js, Node.js, and TypeScript, with a strong focus on creating responsive, accessible, and performant digital solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My journey in web development began during my studies where I discovered my passion for combining creative problem-solving with technical implementation. Since then, I've worked on various projects to deliver exceptional digital experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm particularly interested in digital transformation and skills engineering, always looking for ways to innovate and improve educational processes through technology.
            </p>

            <div className="pt-4">
              <Button size="lg" className="gap-2" onClick={handleDownloadCV}>
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}