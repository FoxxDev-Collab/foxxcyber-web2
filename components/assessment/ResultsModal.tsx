import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import DonutChart from './charts/DonutChart';
import { AlertTriangle, ShieldAlert, Shield, Info, Check, Clock } from 'lucide-react';

interface ResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentData: {
    id: string;
    name: string;
    organization: string;
    assessor: string;
    scope: string;
    date: string;
    status: string;
    controls: Record<string, {
      id: string;
      status: string;
      notes: string;
      evidence: string;
    }>;
  } | null;
  progress: {
    total: number;
    completed: number;
    percentage: number;
  };
}

// Risk level definitions
const riskLevels = [
  { min: 80, max: 100, level: 'Low', color: '#10b981', icon: Shield, description: 'Your organization has implemented most security controls effectively, presenting a low security risk. Continue maintaining your security posture and focus on the remaining controls.' },
  { min: 50, max: 79, level: 'Moderate', color: '#f59e0b', icon: Info, description: 'Your organization has implemented many security controls but still has gaps that present moderate risk. Prioritize addressing the partially implemented and planned controls.' },
  { min: 30, max: 49, level: 'High', color: '#f97316', icon: AlertTriangle, description: 'Significant security gaps exist in your implementation, presenting high risk to your organization. Immediate attention is required for critical control families.' },
  { min: 0, max: 29, level: 'Critical', color: '#ef4444', icon: ShieldAlert, description: 'Your organization has critical security deficiencies that require immediate remediation. Develop and execute an emergency security improvement plan.' }
];

// Risk impact by control family
const familyRiskImpact = {
  'AC': { criticalityLevel: 'High', description: 'Access Control deficiencies can lead to unauthorized access to systems and data.' },
  'AU': { criticalityLevel: 'High', description: 'Audit and Accountability gaps can prevent detection of security incidents and hinder forensic analysis.' },
  'AT': { criticalityLevel: 'Medium', description: 'Awareness and Training deficiencies increase susceptibility to social engineering attacks.' },
  'CM': { criticalityLevel: 'High', description: 'Configuration Management weaknesses can lead to security misconfigurations and vulnerabilities.' },
  'CP': { criticalityLevel: 'Medium', description: 'Contingency Planning gaps can impact business continuity during disruptions.' },
  'IA': { criticalityLevel: 'Critical', description: 'Identification and Authentication weaknesses can enable unauthorized system access.' },
  'IR': { criticalityLevel: 'High', description: 'Incident Response deficiencies can increase the impact of security incidents.' },
  'MA': { criticalityLevel: 'Medium', description: 'Maintenance gaps can introduce vulnerabilities through improper system upkeep.' },
  'MP': { criticalityLevel: 'Medium', description: 'Media Protection weaknesses can lead to data leakage through physical media.' },
  'PE': { criticalityLevel: 'Medium', description: 'Physical and Environmental Protection gaps can enable unauthorized physical access.' },
  'PL': { criticalityLevel: 'Medium', description: 'Planning deficiencies can lead to inconsistent security implementation.' },
  'PS': { criticalityLevel: 'Medium', description: 'Personnel Security gaps can result in insider threats.' },
  'RA': { criticalityLevel: 'High', description: 'Risk Assessment weaknesses can lead to unidentified security vulnerabilities.' },
  'CA': { criticalityLevel: 'Medium', description: 'Security Assessment gaps can result in undetected security weaknesses.' },
  'SC': { criticalityLevel: 'Critical', description: 'System and Communications Protection weaknesses can enable network-based attacks.' },
  'SI': { criticalityLevel: 'Critical', description: 'System and Information Integrity deficiencies can allow malware and other attacks to persist.' },
  'SA': { criticalityLevel: 'High', description: 'System and Services Acquisition gaps can introduce supply chain risks.' }
};

// Priority ratings for status types
const priorityRatings = {
  'Not Implemented': { priority: 'High', icon: AlertTriangle, color: '#ef4444', description: 'Controls that are not implemented represent significant gaps in your security posture.' },
  'Partially Implemented': { priority: 'Medium', icon: Info, color: '#f59e0b', description: 'Partially implemented controls should be completed to ensure full protection.' },
  'Planned': { priority: 'Medium-Low', icon: Clock, color: '#3b82f6', description: 'Planned controls should have implementation timelines established.' },
  'Implemented': { priority: 'Maintain', icon: Check, color: '#10b981', description: 'Implemented controls should be regularly reviewed for effectiveness.' }
};

const ResultsModal: React.FC<ResultsModalProps> = ({
  open,
  onOpenChange,
  assessmentData,
  progress
}) => {
  if (!assessmentData) return null;

  const handleExport = () => {
    // Create a downloadable JSON file
    const jsonData = JSON.stringify(assessmentData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nist-rmf-assessment-${assessmentData.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const statusCounts = Object.values(assessmentData.controls).reduce(
    (counts: Record<string, number>, control) => {
      const status = control.status || 'Not Implemented';
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },
    {}
  );

  // Calculate percentages for each status
  const calculatePercentage = (count: number) => {
    const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
    return total > 0 ? Math.round((count / total) * 100) : 0;
  };

  // Get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Implemented': return 'text-green-600';
      case 'Partially Implemented': return 'text-amber-500';
      case 'Planned': return 'text-blue-500';
      case 'Not Implemented': return 'text-red-500';
      case 'Not Applicable': return 'text-gray-500';
      default: return 'text-gray-700';
    }
  };

  // Get color for donut chart
  const getChartColor = (percentage: number) => {
    const riskLevel = riskLevels.find(level => percentage >= level.min && percentage <= level.max);
    return riskLevel ? riskLevel.color : '#ef4444';
  };

  // Get current risk level based on implementation percentage
  const getCurrentRiskLevel = () => {
    return riskLevels.find(level => progress.percentage >= level.min && progress.percentage <= level.max) || riskLevels[3];
  };

  // Group controls by family
  const controlsByFamily: Record<string, { id: string; status: string }[]> = {};
  Object.values(assessmentData.controls).forEach(control => {
    const family = control.id.split('-')[0];
    if (!controlsByFamily[family]) {
      controlsByFamily[family] = [];
    }
    controlsByFamily[family].push(control);
  });

  // Calculate implementation rate for each family
  const familyImplementationRates = Object.entries(controlsByFamily).map(([family, controls]) => {
    const total = controls.length;
    const implemented = controls.filter(c => c.status === 'Implemented').length;
    const partiallyImplemented = controls.filter(c => c.status === 'Partially Implemented').length;
    const notApplicable = controls.filter(c => c.status === 'Not Applicable').length;
    
    const implementationRate = total - notApplicable > 0 
      ? Math.round(((implemented + (partiallyImplemented * 0.5)) / (total - notApplicable)) * 100)
      : 0;
    
    return {
      family,
      implementationRate,
      total,
      implemented,
      partiallyImplemented,
      notImplemented: controls.filter(c => c.status === 'Not Implemented').length,
      planned: controls.filter(c => c.status === 'Planned').length,
      notApplicable,
      criticality: familyRiskImpact[family as keyof typeof familyRiskImpact]?.criticalityLevel || 'Medium',
      description: familyRiskImpact[family as keyof typeof familyRiskImpact]?.description || ''
    };
  }).sort((a, b) => {
    // Sort by criticality first, then by implementation rate (ascending, since lower is higher risk)
    const criticalityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    const aOrder = criticalityOrder[a.criticality as keyof typeof criticalityOrder] || 2;
    const bOrder = criticalityOrder[b.criticality as keyof typeof criticalityOrder] || 2;
    
    if (aOrder === bOrder) {
      return a.implementationRate - b.implementationRate;
    }
    return aOrder - bOrder;
  });

  const currentRiskLevel = getCurrentRiskLevel();
  const RiskIcon = currentRiskLevel.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Assessment Results & Risk Analysis</DialogTitle>
          <DialogDescription>
            Security assessment results and risk analysis for {assessmentData.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assessment Info */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Assessment Name</h3>
                  <p className="text-base font-semibold">{assessmentData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Organization</h3>
                  <p className="text-base">{assessmentData.organization}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Assessor</h3>
                  <p className="text-base">{assessmentData.assessor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Date</h3>
                  <p className="text-base">{new Date(assessmentData.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Scope</h3>
                <p className="text-sm bg-muted p-3 rounded">{assessmentData.scope}</p>
              </div>
            </div>

            {/* Risk Level Assessment */}
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <RiskIcon size={24} color={currentRiskLevel.color} />
                <h3 className="text-lg font-bold">
                  <span style={{ color: currentRiskLevel.color }}>{currentRiskLevel.level}</span> Risk Level
                </h3>
              </div>
              
              <div className="flex justify-center mb-4">
                <DonutChart 
                  value={progress.percentage} 
                  size={140}
                  primaryColor={currentRiskLevel.color}
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold">{progress.percentage}%</div>
                    <div className="text-xs text-gray-500">Implementation</div>
                  </div>
                </DonutChart>
              </div>
              
              <p className="text-sm mb-4">{currentRiskLevel.description}</p>
              
              <div className="text-xs text-gray-500">
                <p className="mb-1">Control Implementation:</p>
                <p className="mb-1">{progress.completed} of {progress.total} controls implemented</p>
              </div>
            </div>
          </div>

          {/* Control Status Summary */}
          <div>
            <h3 className="text-md font-semibold mb-4">Control Status Summary & Remediation Priorities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(statusCounts)
                .filter(([status]) => status !== 'Not Applicable')
                .sort(([statusA], [statusB]) => {
                  const priorityOrder = { 'Not Implemented': 0, 'Partially Implemented': 1, 'Planned': 2, 'Implemented': 3 };
                  return priorityOrder[statusA as keyof typeof priorityOrder] - priorityOrder[statusB as keyof typeof priorityOrder];
                })
                .map(([status, count]) => {
                  const priorityInfo = priorityRatings[status as keyof typeof priorityRatings];
                  const PriorityIcon = priorityInfo?.icon;
                  
                  return (
                    <div key={status} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        {PriorityIcon && <PriorityIcon size={18} color={priorityInfo.color} />}
                        <h4 className="font-medium">{status}</h4>
                      </div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`text-2xl font-bold ${getStatusColor(status)}`}>{count}</span>
                        <span className="text-sm text-gray-500">{calculatePercentage(count)}% of controls</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs font-medium" style={{ color: priorityInfo?.color }}>
                          {priorityInfo?.priority} Priority
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{priorityInfo?.description}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Risk by Control Family */}
          <div>
            <h3 className="text-md font-semibold mb-4">Risk Assessment by Control Family</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {familyImplementationRates.map(family => {
                const criticalityColors = {
                  'Critical': 'text-red-600 bg-red-50',
                  'High': 'text-orange-600 bg-orange-50',
                  'Medium': 'text-amber-600 bg-amber-50',
                  'Low': 'text-green-600 bg-green-50'
                };
                
                const criticalityColor = criticalityColors[family.criticality as keyof typeof criticalityColors] || criticalityColors.Medium;
                
                return (
                  <div key={family.family} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{family.family}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${criticalityColor}`}>
                            {family.criticality} Risk
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{family.description}</p>
                      </div>
                      <div className="flex items-center">
                        <DonutChart 
                          value={family.implementationRate} 
                          size={50}
                          strokeWidth={6}
                          primaryColor={getChartColor(family.implementationRate)}
                        >
                          <span className="text-xs font-bold">{family.implementationRate}%</span>
                        </DonutChart>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      <div className="text-center p-1 bg-green-50 rounded">
                        <div className="text-xs font-medium text-green-600">{family.implemented}</div>
                        <div className="text-xs text-gray-500">Implemented</div>
                      </div>
                      <div className="text-center p-1 bg-amber-50 rounded">
                        <div className="text-xs font-medium text-amber-600">{family.partiallyImplemented}</div>
                        <div className="text-xs text-gray-500">Partial</div>
                      </div>
                      <div className="text-center p-1 bg-blue-50 rounded">
                        <div className="text-xs font-medium text-blue-600">{family.planned}</div>
                        <div className="text-xs text-gray-500">Planned</div>
                      </div>
                      <div className="text-center p-1 bg-red-50 rounded">
                        <div className="text-xs font-medium text-red-600">{family.notImplemented}</div>
                        <div className="text-xs text-gray-500">Not Impl.</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Risk Remediation Recommendations */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-md font-semibold mb-4">Risk Remediation Recommendations</h3>
            <ul className="space-y-3">
              {progress.percentage < 30 && (
                <li className="flex gap-2">
                  <AlertTriangle size={18} className="shrink-0 text-red-500 mt-0.5" />
                  <p className="text-sm">Develop an immediate remediation plan focusing on Critical and High risk control families.</p>
                </li>
              )}
              {familyImplementationRates
                .filter(f => f.criticality === 'Critical' && f.implementationRate < 50)
                .slice(0, 3)
                .map(family => (
                  <li key={family.family} className="flex gap-2">
                    <AlertTriangle size={18} className="shrink-0 text-red-500 mt-0.5" />
                    <p className="text-sm">Prioritize implementing <strong>{family.family}</strong> controls ({family.implementationRate}% complete) to address critical risks in {family.description.toLowerCase()}</p>
                  </li>
                ))}
              {familyImplementationRates
                .filter(f => f.criticality === 'High' && f.implementationRate < 60)
                .slice(0, 2)
                .map(family => (
                  <li key={family.family} className="flex gap-2">
                    <Info size={18} className="shrink-0 text-orange-500 mt-0.5" />
                    <p className="text-sm">Address <strong>{family.family}</strong> controls ({family.implementationRate}% complete) to mitigate high-risk vulnerabilities.</p>
                  </li>
                ))}
              {statusCounts['Partially Implemented'] > 0 && (
                <li className="flex gap-2">
                  <Info size={18} className="shrink-0 text-amber-500 mt-0.5" />
                  <p className="text-sm">Complete the {statusCounts['Partially Implemented']} partially implemented controls to improve your overall security posture.</p>
                </li>
              )}
              {statusCounts['Implemented'] > 0 && (
                <li className="flex gap-2">
                  <Check size={18} className="shrink-0 text-green-500 mt-0.5" />
                  <p className="text-sm">Continue maintaining and reviewing your {statusCounts['Implemented']} implemented controls for effectiveness.</p>
                </li>
              )}
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleExport}>
            Export Assessment
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal; 