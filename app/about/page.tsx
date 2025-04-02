import React from 'react';
import { Shield, Users, Award, LightbulbIcon, TrendingUp, Lock, Zap } from 'lucide-react';
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
                    Transforming Security Into Your Competitive Edge
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    At Foxx Cyber, we believe security isn&apos;t just about defense—it&apos;s about building a foundation for innovation, 
                    trust, and sustainable growth. We help organizations build security cultures that protect assets while enabling business.
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

          {/* Our Security Philosophy */}
          <section className="py-16 bg-white/80 dark:bg-slate-800/80">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-50">Our Security Philosophy</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center">
                  We believe meaningful security is a strategic asset that powers your business forward, not just a compliance checkbox or technical barrier.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                      <LightbulbIcon className="w-6 h-6 mr-2" />
                      Security as a Business Enabler
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      In today&apos;s digital marketplace, strong security builds customer trust, opens doors to new markets, and protects your reputation. We help you transform security from a cost center to a powerful differentiator that drives growth and innovation.
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                      <Users className="w-6 h-6 mr-2" />
                      Security Culture Over Tools
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      While technology is important, we know that human behavior is the cornerstone of effective security. We help build organizational cultures where security awareness becomes second nature, empowering every employee to be part of your security posture.
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-2" />
                      Balanced Risk Management
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We understand that business requires calculated risks. Our approach balances robust protection with operational flexibility, ensuring security enhances rather than hinders your business objectives. We help you take smart risks, safely.
                    </p>
                  </div>
                  <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                      <Lock className="w-6 h-6 mr-2" />
                      Resilience by Design
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      In a world where breaches are inevitable, we focus on building resilient systems that can withstand, recover, and adapt to security incidents. Our approach ensures your business remains operational and protected even when faced with evolving threats.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    
          {/* Core Values */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-6 dark:text-gray-50">Our Core Values</h2>
              <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                These principles guide everything we do, from how we approach security challenges to how we build relationships with our clients.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Shield className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Expert Protection</h3>
                    <p className="text-gray-600 dark:text-gray-300">We deliver top-tier cybersecurity solutions backed by industry-leading expertise and continuous learning.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Client Partnership</h3>
                    <p className="text-gray-600 dark:text-gray-300">We build long-term partnerships, tailoring our solutions to your unique security needs and business goals.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Award className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Certified Excellence</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our team holds advanced industry certifications including CISSP, CISM, and Security+, ensuring best-in-class expertise.</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <Zap className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Adaptive Innovation</h3>
                    <p className="text-gray-600 dark:text-gray-300">We constantly evolve our approaches to stay ahead of emerging threats and changing business landscapes.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
    
          {/* Professional Journey */}
          <section className="py-16 bg-white/80 dark:bg-slate-800/80">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-50">Our Professional Journey</h2>
                <div className="space-y-8">
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Foundation in IT Security</h3>
                    <p className="text-gray-600 dark:text-gray-300">Starting with a strong foundation in IT and Security+ certification, 
                    our team brings fundamental security expertise to every project. We&apos;ve built our practice on solid technical understanding of the challenges organizations face.</p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Advanced Certifications</h3>
                    <p className="text-gray-600 dark:text-gray-300">Achieving CISM certification through ISACA demonstrates our 
                    commitment to mastering information security management. We&apos;ve expanded our expertise beyond technical solutions to include governance, risk management, and compliance frameworks that drive business value.</p>
                  </div>
                  <div className="relative pl-8 border-l-2 border-primary/20 dark:border-primary/40">
                    <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1 dark:bg-primary/80"></div>
                    <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Strategic Business Integration</h3>
                    <p className="text-gray-600 dark:text-gray-300">Today, we focus on integrating security seamlessly into business strategies, helping organizations transform security from a necessary expense into a competitive advantage. Our approach combines technical expertise with business acumen to deliver security solutions that enable growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Security Culture Matters */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 dark:text-gray-50">Why Security Culture Matters</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                  In today&apos;s digital landscape, security is more than just technology—it&apos;s a mindset that permeates every aspect of your organization.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Customer Trust</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Today&apos;s customers choose businesses they can trust with their data. A visible security culture demonstrates your commitment to protecting their information, creating a powerful differentiator in crowded markets.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Operational Resilience</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Organizations with strong security cultures recover faster from incidents and adapt more readily to new threats, ensuring business continuity even in challenging circumstances.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 dark:bg-slate-800/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-3 text-primary dark:text-primary/90">Regulatory Advantage</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      As compliance requirements grow more complex, organizations with established security cultures can adapt more efficiently, turning regulatory challenges into opportunities for improvement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }