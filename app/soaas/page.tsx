import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, ArrowRight, FileCheck, TrendingUp, DollarSign, Award } from 'lucide-react'

export default function SOaaSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section - Value-Focused */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col text-left md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
                Executive-Level Security Leadership at a Fraction of the Cost
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Our Security Officer as a Service (SOaaS) delivers C-suite security expertise, strategic leadership, and measurable risk reduction without the overhead of a full-time executive hire.
              </p>
              <div className="flex gap-4 mt-8">
                <Button size="lg" className="group" asChild>
                  <Link href="/contact" className="flex items-center">
                    Schedule a ROI Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Security Leadership Illustration */}
            <div className="md:w-1/2 flex justify-center">
              <svg className="w-full max-w-lg h-auto" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                {/* Organization Circle */}
                <circle cx="200" cy="200" r="160" className="fill-primary/5 dark:fill-primary/10" />
                
                {/* Leadership Web Lines */}
                <g className="stroke-primary/30 dark:stroke-primary/40" fill="none" strokeWidth="2">
                  <path d="M200 100 L200 300" />
                  <path d="M100 200 L300 200" />
                  <path d="M130 130 L270 270" />
                  <path d="M130 270 L270 130" />
                </g>
                
                {/* Connection Points */}
                <g className="fill-primary dark:fill-primary/80">
                  <circle cx="200" cy="100" r="8" />
                  <circle cx="300" cy="200" r="8" />
                  <circle cx="200" cy="300" r="8" />
                  <circle cx="100" cy="200" r="8" />
                  <circle cx="200" cy="200" r="12" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Why Replace Your CISO - NEW SECTION */}
      <section className="py-16 bg-white/80 dark:bg-slate-800/80">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 dark:text-gray-50">The Strategic Business Case</h2>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Why forward-thinking CEOs are replacing traditional CISO roles with our Security Officer as a Service
          </p>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Cost Reduction</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Achieve 60-75% cost savings compared to hiring a full-time security executive while maintaining enterprise-grade expertise
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Expert Leadership</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access to seasoned security professionals with diverse industry experience and specialized certifications
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-gray-100">Business Alignment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Security strategies centered on enabling business goals rather than creating roadblocks
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
              <CardContent className="pt-6">
                <div className="p-3 rounded-xl inline-block bg-primary/10 dark:bg-primary/20 mb-4">
                  <FileCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Scalable Service</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Easily adjust security resources up or down based on your business cycle and requirements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Calculator CTA - NEW SECTION */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h2 className="text-2xl font-bold mb-4 dark:text-gray-50">Calculate Your Security ROI</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Book a consultation with our team to receive a personalized analysis showing how our Security Officer as a Service can:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Reduce your security leadership costs by 60-75%
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Improve your risk management effectiveness
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Provide measurable security improvements within 90 days
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <Button size="lg" className="group" asChild>
                  <Link href="/contact" className="flex items-center">
                    Schedule ROI Analysis
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold dark:text-gray-50">Ready for Executive Security Leadership?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Contact us today to discuss how our Security Officer as a Service can provide enterprise-grade security leadership at a fraction of the cost
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
  )
}
