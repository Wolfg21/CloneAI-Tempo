import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AuthForm from "./auth/AuthForm";
import {
  ArrowRight,
  Instagram,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Navigation */}
      <nav className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Instagram className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">CoachAI Clone</h1>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Pricing</Button>
          <Button variant="ghost">About</Button>
          <Button variant="outline">Contact</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Your AI Coach Clone
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Replicate your coaching style, language patterns, and expertise with
            our advanced AI technology.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </div>
        <div className="flex-1">
          <Card className="w-full max-w-md mx-auto shadow-xl">
            <CardContent className="p-0">
              <AuthForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Settings className="h-10 w-10 text-primary" />}
            title="Setup Your AI Clone"
            description="Configure your AI's personality, language style, and coaching methodology through our intuitive wizard."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Train With Your Content"
            description="Upload your coaching materials, Instagram posts, and videos to train your AI to respond like you."
          />
          <FeatureCard
            icon={<MessageCircle className="h-10 w-10 text-primary" />}
            title="Engage With Clients"
            description="Let your clients interact with your AI clone while you focus on creating new content."
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Coaches Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="My AI clone has allowed me to scale my coaching business without sacrificing the personal touch my clients love."
              author="Sarah Johnson"
              role="Fitness Coach"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
            />
            <TestimonialCard
              quote="The accuracy of my AI clone is incredible. My clients can't tell the difference between my responses and the AI's."
              author="Michael Chen"
              role="Business Coach"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
            />
            <TestimonialCard
              quote="Setting up my AI clone was surprisingly easy. The wizard guided me through every step of the process."
              author="Jessica Williams"
              role="Life Coach"
              avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=jessica"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Clone Your Coaching Style?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join hundreds of Instagram coaches who have scaled their business with
          AI clones.
        </p>
        <Button size="lg" className="gap-2">
          Create Your AI Clone <ArrowRight className="h-4 w-4" />
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Instagram className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CoachAI Clone</span>
            </div>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                FAQ
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} CoachAI Clone. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
}: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <p className="italic mb-6">"{quote}"</p>
        <div className="flex items-center gap-3">
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
