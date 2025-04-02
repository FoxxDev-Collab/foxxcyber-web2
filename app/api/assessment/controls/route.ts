import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Control {
  id: string;
  title: string;
  description: string;
  family: string;
  baseline: string | string[];
  priority?: string;
  related?: string[];
  importance?: string;
  mitigationSuggestions?: string[];
  assessmentProcedures?: string[];
  requiredArtifacts?: string[];
}

interface ControlFamily {
  [controlId: string]: Control;
}

interface ControlsMap {
  [family: string]: ControlFamily;
}

export async function GET() {
  try {
    const controlsDir = path.join(process.cwd(), 'components', 'assessment', 'controls');
    const controlsMap: ControlsMap = {};

    // Read all JSON files in the controls directory
    const files = fs.readdirSync(controlsDir)
      .filter(file => file.endsWith('.json'));

    // Parse each file and merge the controls
    for (const file of files) {
      const filePath = path.join(controlsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const controlData = JSON.parse(fileContent);
      
      // Merge the control families from this file
      Object.keys(controlData).forEach(family => {
        if (!controlsMap[family]) {
          controlsMap[family] = {};
        }
        // Add controls from this family to our map
        Object.assign(controlsMap[family], controlData[family]);
      });
    }

    // Format controls appropriately for the frontend
    // The frontend expects a Controls object keyed by family
    return NextResponse.json(controlsMap);
  } catch (error) {
    console.error('Error loading controls:', error);
    return NextResponse.json(
      { error: 'Failed to load assessment controls' },
      { status: 500 }
    );
  }
} 