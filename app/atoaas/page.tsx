import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Shield, FileCheck, Cloud, Server, Network, CheckCircle, ArrowRight, UserCheck, BadgeCheck, LockIcon } from 'lucide-react';


export default function ATOaaSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col text-left md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                ATO as a Service
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Prove to your customers that you&apos;re actively protecting their data with our ATO as a Service. 
                Whether you need to meet NIST requirements, protect sensitive information, or prepare for government 
                opportunities, our comprehensive process delivers the security verification your business needs.
              </p>
            </div>
            
            {/* Custom Shield SVG - keeping the existing one as it works well */}
            <div className="md:w-1/2 flex justify-center">
              <svg className="w-full max-w-lg h-auto" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <path d="M200 50 L350 100 L350 200 Q350 300 200 350 Q50 300 50 200 L50 100 Z" 
                  className="fill-primary/10 dark:fill-primary/20"/>
                <g className="stroke-primary/30 dark:stroke-primary/40" strokeWidth="2" fill="none">
                  <path d="M100 150 L300 150" />
                  <path d="M150 200 L250 200" />
                  <path d="M120 250 L280 250" />
                  <path d="M200 150 L200 250" />
                  <path d="M150 150 L150 200" />
                  <path d="M250 150 L250 200" />
                </g>
                <g className="fill-primary dark:fill-primary/80">
                  <circle cx="150" cy="150" r="4" />
                  <circle cx="200" cy="150" r="4" />
                  <circle cx="250" cy="150" r="4" />
                  <circle cx="150" cy="200" r="4" />
                  <circle cx="200" cy="200" r="4" />
                  <circle cx="250" cy="200" r="4" />
                  <circle cx="200" cy="250" r="4" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* What is ATO & Why You Need It - NEW SECTION */}
      <section className="py-16 bg-white/80 dark:bg-slate-800/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-50">Why Your Business Needs ATO</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 inline-flex mb-4">
                  <BadgeCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Demonstrate Security Maturity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our ATO process provides independent verification of your security controls, giving your customers and 
                  partners confidence that you&apos;re serious about protecting their data. Think of it as a security badge 
                  that proves your commitment to cybersecurity excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 inline-flex mb-4">
                  <LockIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Protect Sensitive Data</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Implement robust safeguards for PII/PHI using NIST Risk Management Framework. Our approach ensures 
                  that personal and sensitive data gets the highest level of protection, reducing breach risks and 
                  helping you meet regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 inline-flex mb-4">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Unlock Government Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Businesses seeking government contracts need to demonstrate compliance with standards like NIST, 
                  FedRAMP, and others. Our ATO process prepares your systems for these requirements, opening doors 
                  to lucrative government market opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What is ATO & System Security */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-semibold">Complete Security Assessment</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our ATO process provides a thorough evaluation of your entire system - from infrastructure 
                  to application code and third-party integrations. This comprehensive approach ensures no 
                  security gaps are overlooked and gives you documented evidence of your security controls.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl font-semibold">Tailored Compliance Mapping</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We map your security controls to the standards that matter most for your business - whether 
                  it&apos;s NIST frameworks for protecting PII/PHI, or preparing for FedRAMP and other government 
                  compliance requirements. This creates a clear path to demonstrable compliance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Types & Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">System-Specific ATO Packages</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {/* Cloud Systems */}
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Cloud className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Cloud Systems</CardTitle>
                    <p className="text-sm text-gray-500">4-6 Month Timeline</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold">$75,000+</p>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Cloud-native applications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    SaaS platforms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Cloud security architecture review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    CSP compliance mapping
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Container security assessment
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* On-Premises Systems */}
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Server className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>On-Premises</CardTitle>
                    <p className="text-sm text-gray-500">6-8 Month Timeline</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold">$100,000+</p>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Data center systems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Legacy applications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Physical security assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Network security review
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    System hardening
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Hybrid Systems */}
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Network className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Hybrid Systems</CardTitle>
                    <p className="text-sm text-gray-500">8-12 Month Timeline</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="mb-6">
                  <p className="text-3xl font-bold">$150,000+</p>
                </div>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Mixed infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Complex integrations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Boundary analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Multi-environment controls
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70" />
                    Cross-platform security
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NIST Compliance - NEW SECTION */}
      <section className="py-16 bg-white/80 dark:bg-slate-800/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center dark:text-gray-50">Protect Sensitive Data with NIST RMF</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Comprehensive PII/PHI Protection
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our NIST Risk Management Framework implementation provides robust protection for personally identifiable 
                  information (PII) and protected health information (PHI). We help you implement the appropriate controls 
                  to safeguard your most sensitive data.
                </p>
              </div>
              
              <div className="bg-white/50 dark:bg-slate-800/30 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-primary dark:text-primary/90 flex items-center">
                  <BadgeCheck className="w-6 h-6 mr-2" />
                  Compliance Verification
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide documentation and evidence that you can share with customers, partners, and auditors to 
                  demonstrate your compliance with NIST standards. This verification serves as proof of your security 
                  commitment.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">Ready for Government Contracts?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our ATO process can be tailored to meet FedRAMP requirements, positioning your business for 
                government contract opportunities. Let us help you navigate the complex world of federal 
                compliance.
              </p>
              <Button asChild size="lg" className="group">
                <Link href="/contact" className="flex items-center">
                  Learn About FedRAMP Readiness
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Our ATO Process</h2>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto relative">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-transform">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold">System Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete system inventory and architecture review, security categorization, and control selection based on 
                  system type and compliance requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-transform">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold">Implementation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Security control implementation, documentation development including SSP, and creation of all required 
                  artifacts and evidence that can be shared with stakeholders for verification.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-transform">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold">Authorization & Evidence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Assessment coordination, formal documentation, and transition to continuous monitoring after authorization. 
                  You&apos;ll receive comprehensive evidence to demonstrate your security posture to customers.
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
            <h2 className="text-3xl font-semibold dark:text-gray-50">Prove Your Security Commitment</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Contact us today to discuss how our ATO process can help you demonstrate your security efforts, 
              protect sensitive data, and open new business opportunities.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/contact" className="flex items-center">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12 dark:text-gray-50">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">How does an ATO help businesses that don&apos;t work with government?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  An ATO provides independent validation of your security controls, which builds customer trust and demonstrates 
                  your commitment to data protection. It serves as evidence during security questionnaires, sales processes, 
                  and partner negotiations, giving you a competitive edge in the marketplace.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">How do you protect sensitive PII/PHI data using the NIST framework?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We implement the NIST Risk Management Framework controls specifically designed for PII/PHI protection, 
                  including data classification, access control, encryption, audit logging, and incident response procedures. 
                  This comprehensive approach ensures your sensitive data receives appropriate safeguards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">What can we share with our customers after completing the ATO process?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  After completing our ATO process, you&apos;ll receive formal documentation that confirms your compliance with relevant 
                  security frameworks. This includes a System Security Plan (SSP) summary, control implementation status, 
                  and a formal letter of attestation that you can share with customers as evidence of your security commitment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold">What determines the final pricing for an ATO package?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Pricing is based on system complexity factors including number of interfaces/integrations, data sensitivity 
                  levels, user base size, technical architecture complexity, and specific compliance requirements. We provide 
                  detailed pricing after initial system assessment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}