'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the assessment tool components
const AssessmentTool = dynamic(() => import('@/components/assessment/AssessmentTool'), {
  ssr: false,
  loading: () => (
    <Card>
      <CardHeader>
        <CardTitle>Loading Assessment Tool...</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Please wait while we load the assessment tool...
        </p>
      </CardContent>
    </Card>
  ),
});

export default function NewAssessmentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/assessment')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Assessment Dashboard
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Progress
          </Button>
        </div>

        <AssessmentTool />
      </div>
    </div>
  );
} 