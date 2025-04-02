import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

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

interface UploadAssessmentProps {
  onUpload: (assessment: AssessmentData) => void;
}

const UploadAssessment: React.FC<UploadAssessmentProps> = ({ onUpload }) => {
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<AssessmentData | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        
        // Basic validation that this is an assessment file
        if (!jsonData.name || !jsonData.controls) {
          setError('Invalid assessment file format');
          return;
        }
        
        setFileData(jsonData as AssessmentData);
      } catch {
        setError('Error parsing file. Please ensure it is a valid JSON file.');
      }
    };
    
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (fileData) {
      onUpload(fileData);
      setOpen(false); // Close the dialog after successful upload
      
      // Reset form state
      setFileData(null);
      setFileName(null);
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload size={16} />
          Upload Assessment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Previous Assessment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="assessment-file">Select Assessment File</Label>
            <Input 
              id="assessment-file" 
              type="file" 
              accept=".json" 
              onChange={handleFileChange}
            />
            {fileName && !error && (
              <p className="text-sm text-muted-foreground">
                Selected: {fileName}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!fileData || !!error}
            type="submit"
          >
            Load Assessment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadAssessment; 