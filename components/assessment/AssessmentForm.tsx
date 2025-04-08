import React, { useState, useEffect } from 'react';
import ControlCard from './ControlCard';
import ResultsModal from './ResultsModal';
import UploadAssessment from './UploadAssessment';
import { 
  loadAllControls, 
  type Control,
  type Controls
} from '@/lib/utils/controlUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, HelpCircle } from 'lucide-react';

interface AssessmentData {
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
}

const AssessmentForm: React.FC = () => {
  const [controls, setControls] = useState<Controls>({});
  const [filteredControls, setFilteredControls] = useState<Control[]>([]);
  const [selectedBaseline, setSelectedBaseline] = useState<string>('LOW');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [assessmentName, setAssessmentName] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [assessor, setAssessor] = useState<string>('');
  const [scope, setScope] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableFamilies, setAvailableFamilies] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [progress, setProgress] = useState<{
    total: number;
    completed: number;
    percentage: number;
  }>({ total: 0, completed: 0, percentage: 0 });
  
  // New state for modals
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  // Add state to track if content is changing to prevent jolting
  const [isChangingFamily, setIsChangingFamily] = useState<boolean>(false);
  // New state for help dialog
  const [showHelpDialog, setShowHelpDialog] = useState<boolean>(false);

  // Load controls on component mount
  useEffect(() => {
    async function fetchControls() {
      try {
        setLoading(true);
        setError(null);
        const loadedControls = await loadAllControls();
        
        if (Object.keys(loadedControls).length === 0) {
          setError("No controls were loaded. Please check if the server is running and control files are available.");
        }
        
        setControls(loadedControls);
        
        // Get available families
        const families = Object.keys(loadedControls).sort();
        setAvailableFamilies(families);
        
        // Set initial active tab if we have families
        if (families.length > 0) {
          setActiveTab(families[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading controls:', error);
        setError("Failed to load controls. Please try refreshing the page.");
        setLoading(false);
      }
    }
    
    fetchControls();
  }, []);

  // Filter controls when filter criteria or active tab changes
  useEffect(() => {
    if (Object.keys(controls).length === 0 || !activeTab) return;

    // Set changing state to true to prevent jolting
    setIsChangingFamily(true);
    
    let result: Control[] = [];
    
    // Get controls for the active family
    if (activeTab && activeTab !== 'ALL') {
      if (controls[activeTab]) {
        result = Object.values(controls[activeTab]);
      }
    } else {
      // If ALL is selected, show controls from all families
      Object.keys(controls).forEach(family => {
        if (controls[family]) {
          result = [...result, ...Object.values(controls[family])];
        }
      });
    }
    
    // Filter by baseline
    if (selectedBaseline !== 'ALL') {
      result = result.filter(control => {
        if (Array.isArray(control.baseline)) {
          return control.baseline.includes(selectedBaseline);
        } else {
          return control.baseline === selectedBaseline;
        }
      });
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(control => 
        control.id.toLowerCase().includes(query) || 
        control.title.toLowerCase().includes(query) ||
        control.description.toLowerCase().includes(query)
      );
    }
    
    // Sort by control ID
    result.sort((a, b) => a.id.localeCompare(b.id));
    
    setFilteredControls(result);
    
    // After a short delay, set changing state to false to prevent jolting
    setTimeout(() => {
      setIsChangingFamily(false);
    }, 100);
  }, [controls, activeTab, selectedBaseline, searchQuery]);

  // Calculate overall progress across all controls
  useEffect(() => {
    if (Object.keys(controls).length === 0) {
      setProgress({ total: 0, completed: 0, percentage: 0 });
      return;
    }
    
    let total = 0;
    let completed = 0;
    
    // Count completed controls across all families - exclude Not Applicable
    Object.keys(controls).forEach(family => {
      Object.values(controls[family]).forEach(control => {
        // Only count controls that match the selected baseline
        const matchesBaseline = selectedBaseline === 'ALL' || 
          (Array.isArray(control.baseline) 
            ? control.baseline.includes(selectedBaseline)
            : control.baseline === selectedBaseline);
        
        if (!matchesBaseline) return;
        
        const status = control.status || 'Not Implemented';
        if (status !== 'Not Applicable') {
          total++;
          if (status !== 'Not Implemented') {
            completed++;
          }
        }
      });
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    setProgress({ total, completed, percentage });
  }, [controls, selectedBaseline]);

  const handleStatusChange = (controlId: string, status: string) => {
    // Update the status in both filteredControls and the main controls object
    setFilteredControls(prev => 
      prev.map(control => 
        control.id === controlId 
          ? { ...control, status } 
          : control
      )
    );
    
    // Update the main controls object
    setControls(prev => {
      const newControls = { ...prev };
      
      // Find the control in all families
      Object.keys(newControls).forEach(family => {
        if (newControls[family][controlId]) {
          newControls[family][controlId] = {
            ...newControls[family][controlId],
            status
          };
        }
      });
      
      return newControls;
    });
  };

  const handleNotesChange = (controlId: string, notes: string) => {
    // Update notes in both filteredControls and the main controls object
    setFilteredControls(prev => 
      prev.map(control => 
        control.id === controlId 
          ? { ...control, notes } 
          : control
      )
    );
    
    // Update the main controls object
    setControls(prev => {
      const newControls = { ...prev };
      
      // Find the control in all families
      Object.keys(newControls).forEach(family => {
        if (newControls[family][controlId]) {
          newControls[family][controlId] = {
            ...newControls[family][controlId],
            notes
          };
        }
      });
      
      return newControls;
    });
  };

  const handleChangeTab = (family: string) => {
    setActiveTab(family);
  };

  // Add function to navigate to next family
  const handleNextFamily = () => {
    const currentIndex = availableFamilies.indexOf(activeTab);
    if (currentIndex < availableFamilies.length - 1) {
      setActiveTab(availableFamilies[currentIndex + 1]);
      // Scroll to top of the control section
      const controlSection = document.getElementById('control-assessment-section');
      if (controlSection) {
        controlSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleShowResults = () => {
    if (!assessmentName) {
      alert('Please provide an assessment name');
      return;
    }
    
    // Check if assessment is complete enough to show results
    if (progress.percentage < 10) {
      setShowConfirmDialog(true);
      return;
    }
    
    createAndShowResults();
  };
  
  const createAndShowResults = () => {
    // Create the assessment data
    const data: AssessmentData = {
      id: Date.now().toString(),
      name: assessmentName,
      organization: organization,
      assessor: assessor,
      scope: scope,
      date: new Date().toISOString(),
      status: progress.percentage === 100 ? "Completed" : "In Progress",
      controls: {}
    };

    // Add all controls with their status, notes, and evidence
    Object.keys(controls).forEach(family => {
      Object.values(controls[family]).forEach(control => {
        data.controls[control.id] = {
          id: control.id,
          status: control.status || "Not Implemented",
          notes: control.notes || "",
          evidence: control.evidence || ""
        };
      });
    });

    // Store the assessment data 
    setAssessmentData(data);
    localStorage.setItem('currentAssessment', JSON.stringify(data));
    
    // Show the results modal
    setShowResultsModal(true);
  };
  
  const handleUploadAssessment = (uploadedAssessment: AssessmentData) => {
    // Set all the form fields from the uploaded assessment
    setAssessmentName(uploadedAssessment.name);
    setOrganization(uploadedAssessment.organization);
    setAssessor(uploadedAssessment.assessor);
    setScope(uploadedAssessment.scope);
    
    // Load the control statuses from the uploaded assessment
    const newControls = { ...controls };
    
    // Update controls with status and notes from the uploaded assessment
    Object.keys(newControls).forEach(family => {
      Object.values(newControls[family]).forEach(control => {
        const uploadedControl = uploadedAssessment.controls[control.id];
        if (uploadedControl) {
          newControls[family][control.id] = {
            ...control,
            status: uploadedControl.status,
            notes: uploadedControl.notes,
            evidence: uploadedControl.evidence
          };
        }
      });
    });
    
    setControls(newControls);
  };

  if (loading) {
    return <div className="card p-6">Loading controls...</div>;
  }
  
  if (error) {
    return (
      <div className="card p-6">
        <h2 className="text-xl font-bold text-danger mb-4">Error Loading Controls</h2>
        <p className="mb-4">{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Continue with Incomplete Assessment?</DialogTitle>
            <DialogDescription>
              Your assessment is only {progress.percentage}% complete. Are you sure you want to view the results now?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Continue Assessment
            </Button>
            <Button onClick={() => {
              setShowConfirmDialog(false);
              createAndShowResults();
            }}>
              View Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Results Modal */}
      <ResultsModal 
        open={showResultsModal}
        onOpenChange={setShowResultsModal}
        assessmentData={assessmentData}
        progress={progress}
      />
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Assessment Information</CardTitle>
          <div className="flex items-center gap-2">
            <UploadAssessment onUpload={handleUploadAssessment} />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowHelpDialog(true)}
              title="Assessment Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add info alert for technical users */}
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Technical Assessment</AlertTitle>
            <AlertDescription>
              This assessment is designed for technical users familiar with security controls and risk management frameworks. 
              Foxx Cyber experts are willing and able to assist you in completing the assessment if needed, please reach out.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="assessmentName">Assessment Name</Label>
              <Input
                id="assessmentName"
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
                placeholder="Enter assessment name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Enter organization name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assessor">Assessor</Label>
              <Input
                id="assessor"
                value={assessor}
                onChange={(e) => setAssessor(e.target.value)}
                placeholder="Enter assessor name"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <Label htmlFor="scope">Assessment Scope</Label>
              <Textarea
                id="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                placeholder="Define the scope of this assessment"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center">
            <div className="space-y-2">
              <Label>Overall Progress</Label>
              <div className="flex items-center gap-3">
                <Progress value={progress.percentage} className="w-[200px]" />
                <span className="text-sm font-medium">{progress.percentage}% complete</span>
              </div>
            </div>
            <Button onClick={handleShowResults}>
              View Results
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Control Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleChangeTab} id="control-assessment-section">
            <TabsList className="w-full overflow-x-auto">
              {availableFamilies.map(family => (
                <TabsTrigger key={family} value={family}>
                  {family}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="baseline">Baseline</Label>
                  <Select value={selectedBaseline} onValueChange={setSelectedBaseline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select baseline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Baselines</SelectItem>
                      <SelectItem value="LOW">LOW Baseline</SelectItem>
                      <SelectItem value="MODERATE">MODERATE Baseline</SelectItem>
                      <SelectItem value="HIGH">HIGH Baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Search Controls</Label>
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, title, or description"
                  />
                </div>
              </div>

              {/* Add loading indicator and transition for smooth experience */}
              <div className={`space-y-4 transition-opacity duration-300 ${isChangingFamily || loading ? 'opacity-50' : 'opacity-100'}`}>
                {filteredControls.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground">
                    No controls match the current filters for {activeTab} family.
                  </div>
                ) : (
                  filteredControls.map(control => (
                    <ControlCard
                      key={control.id}
                      control={control}
                      onStatusChange={handleStatusChange}
                      onNotesChange={handleNotesChange}
                    />
                  ))
                )}
              </div>
              
              {/* Add Next Family button */}
              <div className="flex justify-end mt-6">
                {availableFamilies.indexOf(activeTab) < availableFamilies.length - 1 && (
                  <Button 
                    onClick={handleNextFamily}
                    className="flex items-center gap-2"
                  >
                    Next Family
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assessment Help</DialogTitle>
            <DialogDescription>
              Information about using the Foxx Cyber assessment tool
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Assessment</h3>
              <p className="text-sm text-muted-foreground">
                This assessment tool is designed for technical users who are familiar with security controls 
                and risk management frameworks. It helps organizations evaluate their security posture 
                against industry-standard controls.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Who Should Use This Tool</h3>
              <p className="text-sm text-muted-foreground">
                Security professionals, compliance officers, IT managers, and other technical staff 
                responsible for security compliance and risk management.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How to Use</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Fill in your organization&apos;s information in the Assessment Information section</li>
                <li>Navigate through control families using the tabs or &quot;Next Family&quot; button</li>
                <li>For each control, select an implementation status and add notes</li>
                <li>Use the baseline filter to focus on controls relevant to your security level</li>
                <li>View your results at any time using the &quot;View Results&quot; button</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">About Foxx Cyber</h3>
              <p className="text-sm text-muted-foreground">
                Foxx Cyber is the industry-leading provider of Governance, Risk, and Compliance (GRC) 
                and Risk Management Framework (RMF) solutions. Our comprehensive tools and expert 
                guidance help organizations of all sizes implement effective security programs.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssessmentForm; 