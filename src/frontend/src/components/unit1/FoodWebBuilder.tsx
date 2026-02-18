import { useState } from 'react';
import { Button } from '../ui/button';

export default function FoodWebBuilder() {
  const [organisms] = useState([
    'Sun', 'Grass', 'Rabbit', 'Fox', 'Hawk', 'Decomposers'
  ]);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <h3 className="text-2xl font-display font-bold mb-4">Food Web Builder</h3>
      <p className="text-muted-foreground mb-6">
        Build a food web by connecting organisms to show energy flow through an ecosystem.
      </p>

      <div className="p-8 rounded-xl bg-gradient-to-br from-forestGreen/5 to-moss/5 border-2 border-dashed border-primary/30 min-h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Interactive food web builder coming soon
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {organisms.map(org => (
              <div key={org} className="px-4 py-2 rounded-full bg-primary/10 text-sm font-medium">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button variant="outline" size="sm">Reset</Button>
        <Button size="sm" className="bg-primary">Save Food Web</Button>
      </div>
    </div>
  );
}
