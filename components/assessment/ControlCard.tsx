import React, { useState, useEffect } from 'react';
import type { Control } from '@/lib/utils/controlUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ControlCardProps {
  control: Control;
  onStatusChange: (controlId: string, status: string) => void;
  onNotesChange: (controlId: string, notes: string) => void;
  onEvidenceChange?: (controlId: string, evidence: string) => void;
}

const ControlCard: React.FC<ControlCardProps> = ({
  control,
  onStatusChange,
  onNotesChange,
  onEvidenceChange
}) => {
  const statusOptions = ['Implemented', 'Partially Implemented', 'Planned', 'Not Implemented', 'Not Applicable'];
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'Implemented': return 'bg-green-100 text-green-800';
      case 'Partially Implemented': return 'bg-yellow-100 text-yellow-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      case 'Not Implemented': return 'bg-red-100 text-red-800';
      case 'Not Applicable': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };
  
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (control.status) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [control.status]);

  return (
    <Card 
      className={`transition-all duration-300 ${animate ? 'scale-105' : ''}`}
      id={control.id}
    >
      <CardHeader>
        <CardTitle className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold">
              {control.id}: {control.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 mb-3">
              {control.description}
            </p>
          </div>
          <div className="md:ml-4 mt-2 md:mt-0">
            <Select
              value={control.status}
              onValueChange={(value) => onStatusChange(control.id, value)}
            >
              <SelectTrigger className={`w-[200px] ${getStatusClass(control.status || '')}`}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <Textarea
            value={control.notes || ''}
            onChange={(e) => onNotesChange(control.id, e.target.value)}
            placeholder="Add notes about this control..."
            className="min-h-[100px]"
          />
        </div>
        {onEvidenceChange && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Evidence</label>
            <Textarea
              value={control.evidence || ''}
              onChange={(e) => onEvidenceChange(control.id, e.target.value)}
              placeholder="Add evidence for this control..."
              className="min-h-[100px]"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ControlCard; 