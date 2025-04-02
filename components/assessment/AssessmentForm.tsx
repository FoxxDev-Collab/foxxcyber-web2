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
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>NIST RMF Assessment</span>
            <UploadAssessment onUpload={handleUploadAssessment} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
          <Tabs value={activeTab} onValueChange={handleChangeTab}>
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

              <div className="space-y-4">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentForm; 