import { useState } from 'react';
import { Beaker } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';

export default function VirtualLab() {
  const [oxygen, setOxygen] = useState([7]);
  const [nitrates, setNitrates] = useState([5]);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Beaker className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-display font-bold">Virtual Lab: Water Quality Testing</h3>
      </div>
      <p className="text-muted-foreground mb-6">
        Measure dissolved oxygen and nitrate levels to assess water quality.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold mb-4">Dissolved Oxygen (mg/L)</h4>
          <Slider
            value={oxygen}
            onValueChange={setOxygen}
            max={15}
            step={0.5}
            className="mb-4"
          />
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {oxygen[0]} mg/L
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {oxygen[0] > 8 ? 'Excellent' : oxygen[0] > 5 ? 'Good' : 'Poor'} water quality
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-200 dark:border-green-800">
          <h4 className="font-semibold mb-4">Nitrate Levels (mg/L)</h4>
          <Slider
            value={nitrates}
            onValueChange={setNitrates}
            max={20}
            step={0.5}
            className="mb-4"
          />
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {nitrates[0]} mg/L
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {nitrates[0] < 10 ? 'Safe' : 'Elevated'} nitrate levels
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary">
        <h4 className="font-semibold mb-2">Analysis:</h4>
        <p className="text-sm text-muted-foreground">
          {oxygen[0] > 8 && nitrates[0] < 10
            ? 'This water body shows excellent health with high oxygen and low nutrient pollution.'
            : oxygen[0] < 5 || nitrates[0] > 10
            ? 'Warning: This water body may be experiencing pollution or eutrophication.'
            : 'This water body shows moderate health. Monitor for changes.'}
        </p>
      </div>

      <div className="mt-4">
        <Button size="sm" className="bg-primary">Record Measurements</Button>
      </div>
    </div>
  );
}
