import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ControlFiltersProps {
  baseline: string;
  onBaselineChange: (baseline: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  family: string;
  onFamilyChange: (family: string) => void;
  families: string[];
}

const ControlFilters: React.FC<ControlFiltersProps> = ({
  baseline,
  onBaselineChange,
  searchQuery,
  onSearchChange,
  family,
  onFamilyChange,
  families
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="baseline">Baseline</Label>
          <Select value={baseline} onValueChange={onBaselineChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select baseline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Baselines</SelectItem>
              <SelectItem value="cis">CIS</SelectItem>
              <SelectItem value="nist">NIST</SelectItem>
              <SelectItem value="iso">ISO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="family">Family</Label>
          <Select value={family} onValueChange={onFamilyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select family" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Families</SelectItem>
              {families.map((f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search controls..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 p-3 bg-secondary/30 rounded">
        <p className="text-sm font-medium mr-2 w-full md:w-auto">Status Legend:</p>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-4 h-4 rounded-full bg-green-500"></span>
          <span className="text-sm">Implemented</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-4 h-4 rounded-full bg-orange-400"></span>
          <span className="text-sm">Partially Implemented</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-4 h-4 rounded-full bg-blue-400"></span>
          <span className="text-sm">Planned</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-4 h-4 rounded-full bg-red-500"></span>
          <span className="text-sm">Not Implemented</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="inline-block w-4 h-4 rounded-full bg-gray-400"></span>
          <span className="text-sm">Not Applicable</span>
        </div>
      </div>
    </div>
  );
};

export default ControlFilters; 