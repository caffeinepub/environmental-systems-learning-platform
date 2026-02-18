import { Sparkles } from 'lucide-react';

interface FunFactsProps {
  facts: string[];
}

export default function FunFacts({ facts }: FunFactsProps) {
  return (
    <section className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-display font-bold">Fun Facts</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-forestGreen/10 to-moss/10 border-2 border-forestGreen/20 overflow-hidden group hover:shadow-nature transition-all"
          >
            <div className="absolute top-2 right-2 opacity-20">
              <img src="/assets/generated/leaf-accent.dim_64x64.png" alt="" className="w-12 h-12" />
            </div>
            <p className="text-sm leading-relaxed relative z-10">{fact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
