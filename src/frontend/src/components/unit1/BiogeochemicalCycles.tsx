import { useState } from 'react';
import { Droplets, Wind, Leaf, Mountain } from 'lucide-react';

const cycles = [
  {
    name: 'Water Cycle',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-500',
    stages: ['Evaporation', 'Condensation', 'Precipitation', 'Collection']
  },
  {
    name: 'Carbon Cycle',
    icon: Leaf,
    color: 'from-green-500 to-emerald-500',
    stages: ['Photosynthesis', 'Respiration', 'Decomposition', 'Combustion']
  },
  {
    name: 'Nitrogen Cycle',
    icon: Wind,
    color: 'from-purple-500 to-indigo-500',
    stages: ['Fixation', 'Nitrification', 'Assimilation', 'Denitrification']
  },
  {
    name: 'Phosphorus Cycle',
    icon: Mountain,
    color: 'from-orange-500 to-red-500',
    stages: ['Weathering', 'Absorption', 'Decomposition', 'Sedimentation']
  }
];

export default function BiogeochemicalCycles() {
  const [selectedCycle, setSelectedCycle] = useState(0);

  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <h3 className="text-2xl font-display font-bold mb-4">Biogeochemical Cycles</h3>
      <p className="text-muted-foreground mb-6">
        Explore how matter cycles through Earth's systems.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {cycles.map((cycle, index) => {
          const Icon = cycle.icon;
          return (
            <button
              key={cycle.name}
              onClick={() => setSelectedCycle(index)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedCycle === index
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-sm font-semibold text-center">{cycle.name}</div>
            </button>
          );
        })}
      </div>

      <div className="p-8 rounded-xl bg-gradient-to-br from-secondary/50 to-accent/30 border border-border">
        <h4 className="text-xl font-bold mb-6 text-center">
          {cycles[selectedCycle].name}
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cycles[selectedCycle].stages.map((stage, index) => (
            <div
              key={stage}
              className="relative"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-4 rounded-lg bg-card border-2 border-primary/30 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{index + 1}</div>
                <div className="text-sm font-medium">{stage}</div>
              </div>
              {index < cycles[selectedCycle].stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-primary text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block animate-cycle">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cycles[selectedCycle].color} opacity-50`} />
          </div>
        </div>
      </div>
    </div>
  );
}
