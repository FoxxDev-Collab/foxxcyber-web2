import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Shield, Clock, CheckCircle, ArrowRight, Lock, FileCheck, Users } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';

// Custom Hero SVG Background with dark mode support
const HeroBackground = () => (
  <svg className="absolute top-0 right-0 w-1/2 h-auto text-primary/5 dark:text-white/5" viewBox="0 0 800 600">
    {/* Shield Base */}
    <path 
      d="M400 50 L700 150 L700 400 Q400 600 100 400 L100 150 Z" 
      className="fill-current opacity-20"
    />
    
    {/* Circuit Board Pattern */}
    <g className="stroke-current" fill="none" strokeWidth="2">
      <path d="M300 200 H500 M400 200 V400" opacity="0.3" />
      <path d="M250 300 H550 M400 300 V350" opacity="0.3" />
      <path d="M200 400 H600" opacity="0.3" strokeDasharray="8 4" />
    </g>
    
    {/* Connection Points */}
    <g className="fill-current">
      <circle cx="400" cy="200" r="6" opacity="0.5" />
      <circle cx="400" cy="300" r="6" opacity="0.5" />
      <circle cx="400" cy="400" r="6" opacity="0.5" />
      <circle cx="300" cy="300" r="6" opacity="0.5" />
      <circle cx="500" cy="300" r="6" opacity="0.5" />
    </g>
  </svg>
);

// Custom Foxx Cyber Logo Component
const FoxxCyberLogo = () => (
  <div className="relative w-full max-w-md h-auto mb-8">
    <Image 
      src="/images/logo_light.png" // Adjust path based on where you place it
      alt="Foxx Cyber" 
      width={400} 
      height={120}
      priority
      className="dark:hidden" // Only show in light mode
    />
    <Image 
      src="/images/logo_dark.png" // White version for dark mode
      alt="Foxx Cyber" 
      width={400} 
      height={120}
      priority
      className="hidden dark:block" // Only show in dark mode
    />
  </div>
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      <HeroBackground />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {/* Added Logo */}
              <FoxxCyberLogo />
              
              <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/60">
                Build Your Business on Bedrock Security Foundations
              </h1>
              <p className="text-xl text-muted-foreground">
                Foxx Cyber provides proactive Bedrock Security solutions, establishing the firm 
                foundation essential for your business to operate securely and thrive.
                Let us help you build with confidence.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="group" asChild>
                  <Link href="/contact" className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            
            {/* Stats/Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <CardContent className="p-6">
                  <Lock className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Security First</h3>
                  <p className="text-muted-foreground">Advanced protection for your critical assets</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <CardContent className="p-6">
                  <FileCheck className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Compliance</h3>
                  <p className="text-muted-foreground">Meet industry standards and regulations</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <CardContent className="p-6">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">Certified security professionals</p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">Round-the-clock security monitoring</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-slate-900/50 dark:to-slate-800/50">
        <div className="container px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Foxx Cyber?
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Navigate complex compliance requirements with our experienced team of security professionals.
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Accelerated Timeline</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Fast-track your ATO process with our proven methodologies and templates.
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transform hover:scale-105 transition-all">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Ongoing Support</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                Maintain compliance with continuous monitoring and support from our team.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Security Foundation?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact Foxx Cyber today to learn how our Bedrock Security approach 
              can establish a firm, reliable foundation to protect and grow your organization.
            </p>
            <Button size="lg" className="group" asChild>
              <Link href="/contact" className="flex items-center justify-center">
                Explore Bedrock Security Solutions
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}