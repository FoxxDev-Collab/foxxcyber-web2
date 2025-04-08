import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Shield, Clock, Users, ArrowRight, Lock, FileCheck, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"


// Enhanced Hero Background with Shield
const HeroBackground = () => (
  <svg className="absolute top-0 right-0 w-1/3 h-auto text-primary/5 dark:text-primary/10" viewBox="0 0 400 600">
    <path d="M75 10 L340 10 L340 180 C340 280 200 350 200 350 C200 350 60 280 60 180 L60 10 Z" 
          className="fill-current"
          strokeWidth="2"/>
    <g className="stroke-primary/10 dark:stroke-primary/20" strokeWidth="1">
      <path d="M100 100 H300 M200 100 V250" fill="none" />
      <path d="M150 150 H250 M200 150 V200" fill="none" />
      <path d="M120 200 H280" fill="none" />
      <circle cx="200" cy="100" r="4" className="fill-primary/20 dark:fill-primary/30" />
      <circle cx="200" cy="150" r="4" className="fill-primary/20 dark:fill-primary/30" />
      <circle cx="200" cy="200" r="4" className="fill-primary/20 dark:fill-primary/30" />
    </g>
  </svg>
);

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 min-h-screen">
      <HeroBackground />
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <svg className="w-full h-full opacity-10" viewBox="0 0 800 200">
              <path d="M0 100 C200 50 600 150 800 100" 
                    className="stroke-primary dark:stroke-primary/30" 
                    strokeWidth="2" 
                    strokeDasharray="8 4"
                    fill="none"/>
              <path d="M0 120 C200 70 600 170 800 120" 
                    className="stroke-primary dark:stroke-primary/30" 
                    strokeWidth="2"
                    strokeDasharray="8 4" 
                    fill="none"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/60">
            Security That Drives Business Value
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our services transform security from a necessary expense into a strategic asset that empowers your organization
          </p>
        </div>

        {/* Why Security Matters Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">Security as Your Competitive Edge</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
              <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Build Customer Trust</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Today&apos;s customers choose businesses they can trust. Strong security creates confidence in your brand and services.
              </p>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
              <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Accelerate Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Meet compliance requirements faster, enter new markets more easily, and scale with confidence.
              </p>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
              <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Enable Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Security by design allows your team to move faster while maintaining protection for your critical assets.
              </p>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
              <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Build Resilience</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Develop systems and processes that withstand challenges and recover quickly from disruptions.
              </p>
            </div>
          </div>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Security Officer as a Service */}
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Security Officer as a Service</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Strategic Security Leadership</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Our Security Officer as a Service (SOaaS) builds security programs that align with your business objectives.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Executive-level security leadership</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Strategic security roadmaps</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Business-aligned security programs</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group" asChild>
                <Link href="/soaas" className="flex items-center justify-center">
                  Learn More About SOaaS
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* ATO Service */}
          <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">ATO as a Service</CardTitle>
                  <p className="text-sm text-gray-500 dark:text-gray-400">System Authorization & Compliance</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Prove to your customers that you are actively protecting their data with our ATO as a Service offering.
                We help you achieve and maintain compliance with industry standards and regulations, such as NIST.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Accelerated compliance timeline</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Comprehensive documentation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-600 dark:text-gray-300">Market expansion opportunities</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full group" asChild>
                <Link href="/services/atoaas" className="flex items-center justify-center">
                  Learn More About ATO
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Our Approach Section */}
        <section className="py-12 mb-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 dark:text-gray-50">Our Security Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">People First</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize building a security culture that empowers your team, rather than just implementing tools or technology.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Business Aligned</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our services are designed to support your business objectives, balancing security needs with operational realities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Adaptive Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We implement security that evolves with your business and the threat landscape, not static compliance checklists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-lg">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl font-semibold dark:text-gray-50">Ready to Transform Your Security Approach?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Schedule a consultation with our team to discuss how we can help you build security that drives business value.
              </p>
              <Button size="lg" className="group" asChild>
                <Link href="/contact" className="flex items-center">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}