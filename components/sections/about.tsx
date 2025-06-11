"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getPersonalInfo } from "@/lib/config";

export function AboutSection() {
  const personal = getPersonalInfo();

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = personal.cv;
    link.download = personal.cv.split('/').pop() || 'CV.pdf';
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
                src={personal.profileImage} 
                alt={personal.name} 
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
              {personal.title} based in {personal.location}
            </h3>
            
            {personal.bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

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