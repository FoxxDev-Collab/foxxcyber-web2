'use client';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowRight, AlertTriangle, CheckCircle, BarChart, Lock, FileText, TrendingUp, Download, Upload, X } from 'lucide-react'
import BasicAssessment from './basic_assessment'
import UploadResults from './upload_results'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

// Import the AssessmentJson type to match with advanced.tsx
interface ControlData {
  status: 'Implemented' | 'Partially Implemented' | 'Planned' | 'Not Implemented' | 'Not Applicable';
  notes: string;
  score: number;
}

interface FamilyControls {
  [controlId: string]: ControlData;
}

interface AssessmentControls {
  [familyId: string]: FamilyControls;
}

interface Assessment {
  id: string;
  name: string;
  organization: string;
  assessor: string;
  scope: string;
  date: string;
  status: string;
  completion: number;
  score: number;
  controls: AssessmentControls;
  completionDate?: string;
}

interface AssessmentJson {
  assessment: Assessment;
}

export default function RiskAssessmentPage() {
  const [basicModalOpen, setBasicModalOpen] = React.useState(false)
  const [advancedModalOpen, setAdvancedModalOpen] = React.useState(false)
  const [uploadedResults, setUploadedResults] = React.useState<AssessmentJson | null>(null)

  const renderAssessmentSelector = () => (
    <div className="container mx-auto px-4">
      {/* Value proposition section before assessment selection */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Identify Hidden Risks</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Discover security vulnerabilities you might not be aware of with our expert-designed assessment tools
          </p>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Benchmark Your Security</h3>
          <p className="text-gray-600 dark:text-gray-300">
            See how your security measures compare to industry standards and best practices
          </p>
        </div>
        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">Get Actionable Insights</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Receive prioritized recommendations that can be implemented immediately to improve your security posture
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-8 dark:text-gray-50">Choose Your Assessment Type</h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary"></div>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>Basic Assessment</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">For non-technical professionals</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A quick evaluation of your essential security practices. Perfect for small businesses
              and organizations just starting their security journey.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                5-minute assessment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Essential security checklist
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Instant recommendations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Instant results in the browser
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Get an instant feeling of your security posture
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full group"
              onClick={() => setBasicModalOpen(true)}
            >
              Start Basic Assessment
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur transform hover:scale-105 transition-all cursor-pointer relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-indigo-500"></div>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle>Advanced Assessment</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">For technical professionals</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A comprehensive evaluation aligned with NIST RMF framework. This is ideal for organizations truly seeking to improve their security posture.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                NIST RMF framework compliance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Comprehensive control assessment
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Exportable JSON results
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary/70 flex-shrink-0" />
                Upload results for detailed insights
              </li>
            </ul>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-semibold text-sm mb-3">How It Works:</h4>
              <ol className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold">1.</span>
                  <span>
                    <span className="font-medium">Download the HTML file</span> - This guarantees data privacy (feel free to inspect the file)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold">2.</span>
                  <span>
                    <span className="font-medium">Open the file</span> - It will launch in your browser locally
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold">3.</span>
                  <span>
                    <span className="font-medium">Complete the assessment</span> - Answer all control questions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold">4.</span>
                  <span>
                    <span className="font-medium">Export the JSON file</span> - Save results to your device
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 font-bold">5.</span>
                  <span>
                    <span className="font-medium">Upload results</span> - Return here to view detailed analysis
                  </span>
                </li>
              </ol>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                We do not store your results. All data remains private unless uploaded.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <a
              href="/foxxcyber-risk-assessment-tool.html"
              download
              className="w-full"
            >
              <Button className="w-full group">
                Download Assessment Tool
                <Download className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Button onClick={() => setAdvancedModalOpen(true)} variant="outline" className="w-full group">
              Upload Assessment Results
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Free Cybersecurity Risk Assessment
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Evaluate your security posture in minutes and receive a personalized action plan to protect your business from today&apos;s cyber threats
            </p>
          </div>

          {renderAssessmentSelector()}
          
          {/* Basic Assessment Modal */}
          <Dialog open={basicModalOpen} onOpenChange={setBasicModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Basic Security Assessment</DialogTitle>
                <DialogDescription>
                  Complete this assessment to evaluate your security posture
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <BasicAssessment />
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>

          {/* Advanced Assessment Modal */}
          <Dialog open={advancedModalOpen} onOpenChange={setAdvancedModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Advanced Security Assessment</DialogTitle>
                <DialogDescription>
                  Upload your assessment results for detailed analysis
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <UploadResults 
                  uploadedResults={uploadedResults} 
                  setUploadedResults={setUploadedResults} 
                />
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900/50 dark:to-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-3xl font-semibold mb-4 dark:text-gray-50">Expert Security Implementation</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Need help implementing these recommendations? Our security experts can:
                </p>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Develop a customized security roadmap based on your assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Implement critical security controls and best practices
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary/70 flex-shrink-0" />
                    Provide ongoing security monitoring and support
                  </li>
                </ul>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Get a Detailed Security Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Schedule a consultation with our security team for a thorough review of your assessment results and personalized recommendations.
                </p>
                <Button asChild size="lg" className="group">
                  <Link href="/contact" className="flex items-center">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - New */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12 dark:text-gray-50">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">How accurate is this assessment?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our assessment is designed by cybersecurity experts based on industry frameworks and best practices. While it provides valuable insights into your security posture, a comprehensive security program may require additional in-depth analysis tailored to your specific environment.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">Is my assessment data secure?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your security is our priority. All assessment data is processed securely and not stored on our servers after your session ends, simply refresh the page to be sure. You can also choose to share your results with our team for a more detailed analysis.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">What should I do after completing the advanced assessment?</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We recommend reviewing your results and focusing on implementing the highest priority recommendations first. If you need assistance, our security experts can help you develop and execute a comprehensive security improvement plan based on your assessment results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
