import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../ui/button';

const items = [
  { name: 'Sunlight', type: 'abiotic' },
  { name: 'Tree', type: 'biotic' },
  { name: 'Water', type: 'abiotic' },
  { name: 'Bacteria', type: 'biotic' },
  { name: 'Rock', type: 'abiotic' },
  { name: 'Mushroom', type: 'biotic' },
  { name: 'Air', type: 'abiotic' },
  { name: 'Deer', type: 'biotic' },
  { name: 'Soil', type: 'abiotic' },
  { name: 'Grass', type: 'biotic' },
];

export default function BioticAbioticSorting() {
  const [unsorted, setUnsorted] = useState(items);
  const [biotic, setBiotic] = useState<typeof items>([]);
  const [abiotic, setAbiotic] = useState<typeof items>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSort = (item: typeof items[0], category: 'biotic' | 'abiotic') => {
    setUnsorted(unsorted.filter(i => i.name !== item.name));
    if (category === 'biotic') {
      setBiotic([...biotic, item]);
    } else {
      setAbiotic([...abiotic, item]);
    }
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const reset = () => {
    setUnsorted(items);
    setBiotic([]);
    setAbiotic([]);
    setShowResults(false);
  };

  const bioticCorrect = biotic.filter(i => i.type === 'biotic').length;
  const abioticCorrect = abiotic.filter(i => i.type === 'abiotic').length;
  const totalCorrect = bioticCorrect + abioticCorrect;

  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
      <h3 className="text-2xl font-display font-bold mb-4">Biotic vs. Abiotic Sorting Activity</h3>
      <p className="text-muted-foreground mb-6">
        Drag items into the correct category: biotic (living) or abiotic (non-living).
      </p>

      {/* Unsorted Items */}
      {unsorted.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Items to Sort:</h4>
          <div className="flex flex-wrap gap-2">
            {unsorted.map(item => (
              <div key={item.name} className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSort(item, 'biotic')}
                  className="hover:bg-forestGreen hover:text-white"
                >
                  {item.name} → Biotic
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSort(item, 'abiotic')}
                  className="hover:bg-olive hover:text-white"
                >
                  {item.name} → Abiotic
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-forestGreen/10 border-2 border-forestGreen/30">
          <h4 className="font-semibold text-forestGreen mb-3">Biotic (Living)</h4>
          <div className="space-y-2">
            {biotic.map(item => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded bg-white">
                <span>{item.name}</span>
                {showResults && (
                  item.type === 'biotic' ? 
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" /> :
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-olive/10 border-2 border-olive/30">
          <h4 className="font-semibold text-olive mb-3">Abiotic (Non-living)</h4>
          <div className="space-y-2">
            {abiotic.map(item => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded bg-white">
                <span>{item.name}</span>
                {showResults && (
                  item.type === 'abiotic' ? 
                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" /> :
                    <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {unsorted.length === 0 && !showResults && (
          <Button onClick={checkAnswers} className="bg-primary">
            Check Answers
          </Button>
        )}
        {showResults && (
          <>
            <div className="flex-1 p-3 rounded-lg bg-secondary text-center">
              <span className="font-semibold">Score: {totalCorrect}/{items.length}</span>
            </div>
            <Button onClick={reset} variant="outline">
              Try Again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
