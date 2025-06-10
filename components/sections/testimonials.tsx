"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, Plus, X, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  isUserSubmitted?: boolean;
  createdAt: string;
}

const testimonialSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company must be at least 2 characters." }),
  content: z.string().min(10, { message: "Testimonial must be at least 10 characters." }),
  rating: z.number().min(1).max(5),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

// Hardcoded testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    content: "Ismail delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise made the project a huge success. The dashboard he built has significantly improved our operational efficiency.",
    rating: 5,
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    content: "Working with Ismail was a game-changer for our startup. He transformed our ideas into a beautiful, functional web application that exceeded our expectations. His communication throughout the project was outstanding.",
    rating: 5,
    createdAt: "2024-02-08"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Design Lead",
    company: "Creative Agency",
    content: "Ismail's ability to translate design concepts into pixel-perfect code is remarkable. He collaborated seamlessly with our design team and delivered a responsive website that looks amazing on all devices.",
    rating: 5,
    createdAt: "2024-02-20"
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Founder",
    company: "FinTech Solutions",
    content: "The financial dashboard Ismail built for us is incredibly robust and user-friendly. His expertise in both frontend and backend development was evident throughout the project. Highly recommended!",
    rating: 5,
    createdAt: "2024-03-05"
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Marketing Director",
    company: "Digital Marketing Pro",
    content: "Ismail created a stunning portfolio website that perfectly showcases our work. The site is fast, SEO-optimized, and has helped us attract new clients. His professionalism is top-notch.",
    rating: 5,
    createdAt: "2024-03-18"
  },
  {
    id: "6",
    name: "James Wilson",
    role: "Operations Manager",
    company: "LogiFlow",
    content: "The mobile app Ismail developed for our logistics company has streamlined our operations significantly. His understanding of our business needs and technical implementation was impressive.",
    rating: 4,
    createdAt: "2024-04-02"
  }
];

// Function to shuffle array and get random items
const getRandomTestimonials = (testimonials: Testimonial[], count: number): Testimonial[] => {
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
    },
  });

  // Initialize testimonials from default data and localStorage
  useEffect(() => {
    // Load user testimonials from localStorage
    const savedTestimonials = localStorage.getItem('userTestimonials');
    const userTestimonials = savedTestimonials ? JSON.parse(savedTestimonials) : [];
    
    // Combine default and user testimonials
    const allTestimonials = [...defaultTestimonials, ...userTestimonials];
    setTestimonials(allTestimonials);
  }, []);

  // Update displayed testimonials when testimonials or showAll changes
  useEffect(() => {
    if (showAll) {
      setDisplayedTestimonials(testimonials);
    } else {
      setDisplayedTestimonials(getRandomTestimonials(testimonials, 4));
    }
  }, [testimonials, showAll]);

  // Save user testimonials to localStorage
  const saveUserTestimonials = (newTestimonials: Testimonial[]) => {
    const userTestimonials = newTestimonials.filter(t => t.isUserSubmitted);
    localStorage.setItem('userTestimonials', JSON.stringify(userTestimonials));
  };

  const onSubmit = (data: TestimonialFormValues) => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...data,
      rating: selectedRating,
      isUserSubmitted: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    const updatedTestimonials = [...testimonials, newTestimonial];
    setTestimonials(updatedTestimonials);
    saveUserTestimonials(updatedTestimonials);
    
    toast.success("Thank you for your testimonial! It has been added successfully.");
    form.reset();
    setSelectedRating(5);
    setIsDialogOpen(false);
  };

  const removeTestimonial = (id: string) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    setTestimonials(updatedTestimonials);
    saveUserTestimonials(updatedTestimonials);
    toast.success("Testimonial removed successfully.");
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const StarRating = ({ rating, onRatingChange, interactive = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 cursor-pointer transition-colors ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300 hover:text-yellow-400"
            }`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 md:py-24 bg-muted/50">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What People Say
          </h2>
          <Separator className="w-24 h-1 bg-primary mt-4 mb-8" />
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Feedback from clients, colleagues, and mentors I've had the pleasure to work with.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Project Manager" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company/Organization</FormLabel>
                        <FormControl>
                          <Input placeholder="Your company or organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Testimonial</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience working with Ismail..." 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel className="text-sm font-medium">Rating</FormLabel>
                    <div className="mt-2">
                      <StarRating 
                        rating={selectedRating} 
                        onRatingChange={setSelectedRating}
                        interactive={true}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1">
                      Submit Testimonial
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full relative group">
                {testimonial.isUserSubmitted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={() => removeTestimonial(testimonial.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={testimonial.rating} />
                        {testimonial.isUserSubmitted && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Community
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          {testimonial.image ? (
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-primary">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 space-y-4"
        >
          {testimonials.length > 4 && (
            <Button 
              variant="outline" 
              size="lg" 
              onClick={toggleShowAll}
              className="gap-2"
            >
              {showAll ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  View All Testimonials ({testimonials.length})
                </>
              )}
            </Button>
          )}
          
          <p className="text-muted-foreground">
            Want to work together?{" "}
            <a
              href="#contact"
              className="text-primary hover:underline font-medium"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}