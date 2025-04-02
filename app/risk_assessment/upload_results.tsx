'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Upload } from 'lucide-react'

// Define proper interfaces for the assessment data structure
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

interface UploadResultsProps {
  uploadedResults: AssessmentJson | null;
  setUploadedResults: React.Dispatch<React.SetStateAction<AssessmentJson | null>>;
}

interface FamilyScores {
  [familyId: string]: number;
}

type StatusCounts = {
  'Implemented': number;
  'Partially Implemented': number;
  'Planned': number;
  'Not Implemented': number;
  'Not Applicable': number;
}

export default function UploadResults({ uploadedResults, setUploadedResults }: UploadResultsProps) {
  const [fileError, setFileError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    if (file.type !== 'application/json') {
      setFileError('Please upload a JSON file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string) as AssessmentJson;
        if (!json.assessment) {
          setFileError('Invalid assessment file format');
          return;
        }
        setUploadedResults(json);
      } catch {
        setFileError('Error parsing JSON file');
      }
    };
    reader.readAsText(file);
  };

  const renderUploadSection = () => (
    <div className="space-y-6">
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <Upload className="h-12 w-12 text-primary/70 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Upload Assessment Results</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Upload the JSON file exported from the NIST RMF Assessment Tool
        </p>
        <input 
          type="file" 
          accept=".json" 
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
        />
        {fileError && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-md flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>{fileError}</span>
          </div>
        )}
      </div>
    </div>
  );

  const getScoreClass = (score: number) => {
    if (score < 20) return 'bg-red-500';
    if (score < 40) return 'bg-orange-500';
    if (score < 60) return 'bg-yellow-500';
    if (score < 80) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'text-green-500';
      case 'Partially Implemented': return 'text-yellow-500';
      case 'Planned': return 'text-blue-500';
      case 'Not Implemented': return 'text-red-500';
      case 'Not Applicable': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const renderResults = () => {
    if (!uploadedResults) return null;
    
    const assessment = uploadedResults.assessment;
    const controlFamilies = Object.keys(assessment.controls).sort();
    
    // Get counts of different statuses
    const statusCounts: StatusCounts = {
      'Implemented': 0,
      'Partially Implemented': 0,
      'Planned': 0,
      'Not Implemented': 0,
      'Not Applicable': 0
    };
    
    // Get total controls by family
    const familyScores: FamilyScores = {};
    
    controlFamilies.forEach(family => {
      let familyTotal = 0;
      let familyImplemented = 0;
      
      Object.keys(assessment.controls[family]).forEach(control => {
        const status = assessment.controls[family][control].status;
        statusCounts[status]++;
        
        if (status !== 'Not Applicable') {
          familyTotal++;
          
          if (status === 'Implemented') {
            familyImplemented += 100;
          } else if (status === 'Partially Implemented') {
            familyImplemented += 50;
          } else if (status === 'Planned') {
            familyImplemented += 25;
          }
        }
      });
      
      familyScores[family] = familyTotal > 0 ? Math.round(familyImplemented / familyTotal) : 0;
    });
    
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">NIST RMF Assessment Results</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {assessment.organization} - Completed on {assessment.date}
          </p>
          <div className="text-5xl font-bold text-primary mb-2">
            {assessment.score}%
          </div>
          <p className="text-gray-500">Overall Security Score</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-5">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{statusCounts['Implemented']}</div>
            <p className="text-sm">Implemented</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{statusCounts['Partially Implemented']}</div>
            <p className="text-sm">Partially Implemented</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{statusCounts['Planned']}</div>
            <p className="text-sm">Planned</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{statusCounts['Not Implemented']}</div>
            <p className="text-sm">Not Implemented</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-500">{statusCounts['Not Applicable']}</div>
            <p className="text-sm">Not Applicable</p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold">Control Family Scores</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {controlFamilies.map(family => (
            <div key={family} className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{family}</h4>
                <span className={`px-2 py-1 rounded text-white text-sm ${getScoreClass(familyScores[family])}`}>
                  {familyScores[family]}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded overflow-hidden">
                <div 
                  className={`h-full ${getScoreClass(familyScores[family])}`} 
                  style={{ width: `${familyScores[family]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-8">Control Details</h3>
        <div className="space-y-6">
          {controlFamilies.map(family => (
            <div key={family} className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-4">{family} Controls</h4>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {Object.keys(assessment.controls[family]).map(controlId => {
                  const control = assessment.controls[family][controlId];
                  return (
                    <div key={controlId} className="py-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{controlId}</span>
                        <span className={`${getStatusColor(control.status)}`}>
                          {control.status}
                        </span>
                      </div>
                      {control.notes && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {control.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Based on your assessment results, we recommend focusing on improving controls in the following areas:
          </p>
          <ul className="mt-2 space-y-1">
            {Object.entries(familyScores)
              .sort(([,a], [,b]) => a - b)
              .slice(0, 3)
              .map(([family, score]) => (
                <li key={family} className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>
                    <span className="font-medium">{family}</span> - Current Score: {score}%
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
        
        <Button 
          onClick={() => setUploadedResults(null)} 
          variant="outline"
          className="mt-4"
        >
          Upload Another Assessment
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur">
      <CardHeader className="card-header">
        <CardTitle className="text-2xl font-bold text-center">
          Advanced Security Assessment
        </CardTitle>
        <p className="text-center text-gray-600 dark:text-gray-300">
          {!uploadedResults ? 
            "Upload your NIST RMF assessment results for detailed analysis" : 
            "Review your comprehensive security assessment"}
        </p>
      </CardHeader>
      <CardContent className="card-content">
        {!uploadedResults ? renderUploadSection() : renderResults()}
      </CardContent>
    </Card>
  )
}