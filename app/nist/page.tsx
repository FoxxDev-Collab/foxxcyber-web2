import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowRight, CheckCircle, BarChart, Clock, Building, Lock, FileText, Server, Users } from 'lucide-react'
import Link from "next/link"

export default function NISTRMFPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
<section className="relative py-20 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex flex-col text-left md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          NIST RMF: Beyond Government, For Every Business
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Discover why Foxx Cyber advocates the NIST Risk Management Framework as the gold standard for 
          security in all industries, and how it can transform your business security posture.
        </p>
      </div>
      
      {/* NIST Framework Illustration */}
      <div className="md:w-1/2 flex justify-center">
        <svg className="w-full max-w-lg h-auto" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          {/* Circular Framework */}
          <circle cx="200" cy="200" r="150" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="dark:stroke-blue-400" />
          
          {/* Framework Steps */}
          <g>
            {/* Step circles */}
            <circle cx="200" cy="50" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <circle cx="335" cy="125" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <circle cx="335" cy="275" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <circle cx="200" cy="350" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <circle cx="65" cy="275" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            <circle cx="65" cy="125" r="40" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/30 dark:stroke-blue-400" />
            
            {/* Center shield */}
            <path d="M175 150 L225 150 L225 200 C225 240 200 250 200 250 C200 250 175 240 175 200 Z" 
                  fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-900/40 dark:stroke-blue-400" />
          </g>
          
          {/* Text with proper dark mode support */}
          <g className="text-gray-900 dark:text-gray-100">
            <text x="200" y="50" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">PREPARE</text>
            <text x="335" y="125" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">CATEGORIZE</text>
            <text x="335" y="275" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">IMPLEMENT</text>
            <text x="200" y="350" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">ASSESS</text>
            <text x="65" y="275" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">AUTHORIZE</text>
            <text x="65" y="125" textAnchor="middle" fontWeight="bold" fontSize="14" className="fill-current">MONITOR</text>
            <text x="200" y="200" textAnchor="middle" fontWeight="bold" fontSize="16" className="fill-current">RISK</text>
          </g>
        </svg>
      </div>
    </div>
  </div>
</section>

      {/* What is NIST RMF Section */}
      <section className="py-16 bg-white/80 dark:bg-slate-800/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">Why Foxx Cyber Loves NIST RMF</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At Foxx Cyber, we&apos;re passionate about the NIST Risk Management Framework (RMF) because it provides a 
              comprehensive, flexible, and structured approach to managing security and privacy risks for organizations 
              of all sizes and industries.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              While originally developed for federal agencies, we&apos;ve witnessed firsthand how the principles and 
              methodologies of NIST RMF can transform the security posture of businesses across all sectors – from 
              healthcare and finance to manufacturing and retail.
            </p>
            <div className="flex items-start gap-4 mb-6">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Not just compliance, but true security:</span> NIST RMF goes beyond checking boxes. It establishes a foundation 
                for truly understanding and addressing security risks that matter to your specific business.
              </p>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Adaptable to your needs:</span> Unlike many one-size-fits-all approaches, NIST RMF provides a flexible 
                framework that can be tailored to organizations of any size, complexity, or industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RMF for All Industries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-gray-50">NIST RMF: Benefits for Every Industry</h2>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            The NIST Risk Management Framework delivers tangible benefits for organizations across all sectors, not just government agencies.
          </p>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-6 h-6 text-primary" />
                  <span>Technology</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Tech companies handling sensitive data benefit from NIST RMF&apos;s structured approach to identifying and mitigating risks in complex IT environments.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Protects intellectual property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Secures development environments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Builds customer trust</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  <span>Finance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Financial institutions leverage NIST RMF to protect sensitive financial data, meet regulatory requirements, and maintain customer trust.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Complements financial regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Protects against financial fraud</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Secures client financial information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-primary" />
                  <span>Healthcare</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Healthcare organizations use NIST RMF to protect patient data, ensure medical device security, and maintain HIPAA compliance.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Protects sensitive patient records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Secures medical devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">Supports HIPAA compliance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Six Steps of NIST RMF */}
      <section className="py-16 bg-white/80 dark:bg-slate-800/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">The Six Steps of NIST RMF</h2>
          <div className="grid gap-y-8 gap-x-6 md:grid-cols-2 max-w-5xl mx-auto">
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Categorize</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Identify your information systems and determine the potential impact of loss. We help businesses understand what they&apos;re protecting and why it matters.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Clear visibility into critical assets and their business value
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Select</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Choose the right security controls based on your business needs and risk tolerance. We help tailor these controls to your specific environment and industry.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized security investment focused on what matters most
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Implement</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Put security controls into action with a clear implementation plan. We provide practical guidance and technical expertise to ensure controls are effectively deployed.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Transformed security from documentation to real protection
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">4</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Assess</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Evaluate whether controls are working as intended. We help businesses measure effectiveness and identify gaps in their security posture.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Validated security that executives can trust and verify
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">5</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Authorize</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Make informed risk-based decisions about your systems. We help business leaders understand security findings and make appropriate risk decisions.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Accountable decision-making with clear documentation
                </p>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 shadow-sm flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary">6</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-gray-100">Monitor</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                Continuously track changes to your systems and threats. We establish ongoing monitoring processes that keep your security current as threats evolve.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Business Benefit:</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Proactive detection of issues before they become breaches
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business-Focused Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">Business-Focused Benefits</h2>
          <div className="grid gap-8 md:grid-cols-4 max-w-6xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <BarChart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">ROI-Driven Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Focus security investments where they deliver the most business value, avoiding wasteful spending on unnecessary controls.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Reduced Breach Risk</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Systematic approach to identifying and addressing vulnerabilities reduces the likelihood and impact of security incidents.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Streamlined Compliance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Mapped to multiple regulatory frameworks, making it easier to meet requirements for HIPAA, PCI DSS, SOC 2, and others.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Business Continuity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Improved resilience against disruptions, helping ensure your critical business operations stay running.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold dark:text-gray-50">Ready to Transform Your Security with NIST RMF?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Let Foxx Cyber help you implement a business-focused security program using the NIST Risk Management Framework.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <Link href="/contact" className="flex items-center justify-center">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/risk_assessment" className="flex items-center justify-center">
                  Take Our Risk Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}