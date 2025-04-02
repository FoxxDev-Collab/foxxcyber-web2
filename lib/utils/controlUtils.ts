export interface Control {
  id: string;
  title: string;
  description: string;
  family: string;
  baseline: string | string[];
  status?: string;
  notes?: string;
  evidence?: string;
  priority?: string;
  related?: string[];
  importance?: string;
  mitigationSuggestions?: string[];
  assessmentProcedures?: string[];
  requiredArtifacts?: string[];
}

export interface ControlFamily {
  [controlId: string]: Control;
}

export interface Controls {
  [family: string]: ControlFamily;
}

export async function loadAllControls(): Promise<Controls> {
  try {
    const response = await fetch('/api/assessment/controls');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading controls:', error);
    return {};
  }
}

export function filterControlsByBaseline(controls: Controls, baseline: string): Control[] {
  if (baseline === 'ALL') {
    // Collect all controls across all families
    const allControls: Control[] = [];
    Object.keys(controls).forEach(family => {
      Object.values(controls[family]).forEach(control => {
        allControls.push(control);
      });
    });
    return allControls;
  }
  
  // Filter controls by baseline
  const filteredControls: Control[] = [];
  Object.keys(controls).forEach(family => {
    Object.values(controls[family]).forEach(control => {
      // Handle both string and array baselines
      if (
        (typeof control.baseline === 'string' && control.baseline === baseline) ||
        (Array.isArray(control.baseline) && control.baseline.includes(baseline))
      ) {
        filteredControls.push(control);
      }
    });
  });
  
  return filteredControls;
}

export function getControlsByFamily(controls: Controls, family: string): Control[] {
  if (family === 'ALL') {
    // Collect all controls across all families
    const allControls: Control[] = [];
    Object.keys(controls).forEach(fam => {
      Object.values(controls[fam]).forEach(control => {
        allControls.push(control);
      });
    });
    return allControls;
  }
  
  // Return controls for the specified family
  return controls[family] ? Object.values(controls[family]) : [];
}

export function getControlById(controls: Controls, id: string): Control | undefined {
  // Search across all families for the control with the given ID
  for (const family in controls) {
    if (controls[family][id]) {
      return controls[family][id];
    }
  }
  return undefined;
}

export function getFamilyFullName(family: string): string {
  const familyNames: { [key: string]: string } = {
    'AC': 'Access Control',
    'AT': 'Awareness and Training',
    'AU': 'Audit and Accountability',
    'CA': 'Security Assessment and Authorization',
    'CM': 'Configuration Management',
    'CP': 'Contingency Planning',
    'IA': 'Identification and Authentication',
    'IR': 'Incident Response',
    'MA': 'Maintenance',
    'MP': 'Media Protection',
    'PE': 'Physical and Environmental Protection',
    'PL': 'Planning',
    'PS': 'Personnel Security',
    'RA': 'Risk Assessment',
    'SA': 'System and Services Acquisition',
    'SC': 'System and Communications Protection',
    'SI': 'System and Information Integrity',
    'PM': 'Program Management'
  };
  return familyNames[family] || family;
} 