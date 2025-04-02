'use client';

import { Clipboard, ShieldCheck, FileCheck } from 'lucide-react';
import AssessmentForm from '@/components/assessment/AssessmentForm';

export default function AssessmentPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">NIST Risk Management Framework Assessment</h1>
          <p className="text-xl text-muted-foreground">
            Evaluate your organization&apos;s security posture against NIST 800-53 controls.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clipboard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Control Assessment</h3>
              <p className="text-sm text-muted-foreground">Evaluate controls across security families</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Risk Management</h3>
              <p className="text-sm text-muted-foreground">Identify and address security gaps</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Compliance Tracking</h3>
              <p className="text-sm text-muted-foreground">Document your compliance progress</p>
            </div>
          </div>
        </div>
        
        <AssessmentForm />
      </div>
    </div>
  );
} 