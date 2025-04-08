import { Users, TrendingUp, Zap } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Foxx Cyber Logo Component for About Page

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
          {/* Hero Section */}
          <section className="relative py-20 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="flex flex-col text-left md:w-1/2">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                    Foxx Cyber: Building Your Bedrock Security Foundation
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    At Foxx Cyber, we believe security isn't just about defense—it's about establishing a <span className="font-semibold text-primary dark:text-primary/80">firm foundation</span> for innovation, trust, and sustainable growth. Our Bedrock Security approach helps organizations build security cultures that protect assets while empowering business progress.
                  </p>
                </div>
                
                {/* Custom Globe SVG */}
                <div className="md:w-1/2 flex justify-center">
                  <svg className="w-full max-w-lg h-auto" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Circle */}
                    <circle cx="400" cy="300" r="250" className="fill-primary/10 dark:fill-primary/20"/>
                    
                    {/* Grid Lines */}
                    <g className="stroke-primary/30 dark:stroke-primary/40" strokeWidth="1">
                      {/* Latitude Lines */}
                      <path d="M150 300 Q400 200 650 300" fill="none"/>
                      <path d="M150 250 Q400 150 650 250" fill="none"/>
                      <path d="M150 350 Q400 250 650 350" fill="none"/>
                      <path d="M150 200 Q400 100 650 200" fill="none"/>
                      <path d="M150 400 Q400 300 650 400" fill="none"/>
                      
                      {/* Longitude Lines */}
                      <path d="M400 50 Q400 300 400 550" fill="none"/>
                      <path d="M300 50 Q300 300 300 550" fill="none"/>
                      <path d="M500 50 Q500 300 500 550" fill="none"/>
                      <path d="M200 100 Q200 300 200 500" fill="none"/>
                      <path d="M600 100 Q600 300 600 500" fill="none"/>
                    </g>
                    
                    {/* Connection Points */}
                    <g className="fill-primary dark:fill-primary/80">
                      <circle cx="350" cy="250" r="4"/>
                      <circle cx="450" cy="350" r="4"/>
                      <circle cx="250" cy="350" r="4"/>
                      <circle cx="550" cy="250" r="4"/>
                      <circle cx="400" cy="200" r="4"/>
                    </g>
                    
                    {/* Connection Lines */}
                    <g className="stroke-primary dark:stroke-primary/80" strokeWidth="2">
                      <line x1="350" y1="250" x2="450" y2="350"/>
                      <line x1="450" y1="350" x2="250" y2="350"/>
                      <line x1="250" y1="350" x2="550" y2="250"/>
                      <line x1="550" y1="250" x2="400" y2="200"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Our Bedrock Philosophy */}
          <section className="py-16 bg-white/80 dark:bg-slate-800/80">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-50">Our Bedrock Security Philosophy</h2>
                <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">
                  Just as a building needs a solid foundation, your business requires robust security. Our Bedrock Security philosophy is built on three core pillars, ensuring your digital assets rest on solid ground.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6">
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">People First</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Empowering your team with security awareness and clear processes creates the strongest defense.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6">
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                          <TrendingUp className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Business Aligned</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Security should enable, not hinder. We align security controls with your operational needs and strategic goals.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6">
                    <CardContent>
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                          <Zap className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Adaptive Security</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        The threat landscape evolves constantly. We implement security that adapts with your business and emerging risks.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Our Journey Section */ }
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">The Foxx Cyber Journey: From Expertise to Foundation</h2>
                <div className="space-y-8">
                  {/* Point 1: Foundation */}
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Deep Technical Roots</h3>
                    <p className="text-gray-600 dark:text-gray-300">Foxx Cyber began with a passion for the technical intricacies of cybersecurity. Our early focus was on mastering the tools and techniques needed to defend complex digital environments, earning certifications like CISSP.</p>
                  </div>
                  {/* Point 2: Growth */}
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Strategic Security Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">We recognized that true security requires more than technology. Achieving CISM certification marked our evolution towards strategic information security management, encompassing governance, risk, and compliance.</p>
                  </div>
                  {/* Point 3: Bedrock */}
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Establishing Bedrock Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">Today, Foxx Cyber integrates deep technical expertise with strategic business acumen through our Bedrock Security framework. We focus on building a <span className="font-semibold text-primary dark:text-primary/80">firm security foundation</span> that allows businesses to innovate and grow confidently, transforming security into a true competitive advantage.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Security Culture Matters */ }
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 dark:text-gray-50">Why a Firm Foundation Matters</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                  In today&apos;s digital landscape, security is the bedrock upon which trust, resilience, and growth are built. It&apos;s more than technology—it&apos;s a foundational element of your organization.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Customer Trust</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A visible commitment to security builds confidence. Customers choose businesses that demonstrably protect their data, creating a powerful market differentiator.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Operational Resilience</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Organizations built on a firm security foundation recover faster from incidents and adapt more readily to new threats, ensuring continuity.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Regulatory & Growth Advantage</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      A solid security posture simplifies compliance and unlocks growth opportunities, turning regulatory challenges into strategic improvements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }