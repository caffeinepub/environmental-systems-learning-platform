import { Briefcase } from 'lucide-react';

interface Career {
  title: string;
  description: string;
  education: string;
  tasks: string[];
}

interface CareerExplorationProps {
  careers: Career[];
}

export default function CareerExploration({ careers }: CareerExplorationProps) {
  return (
    <section className="my-12">
      <div 
        className="relative py-12 px-6 rounded-2xl overflow-hidden mb-6"
        style={{
          backgroundImage: 'url(/assets/generated/career-header.dim_1200x400.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-forestGreen/90 to-moss/80" />
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Briefcase className="w-8 h-8" />
            <h2 className="text-3xl font-display font-bold">STEM Career Exploration</h2>
          </div>
          <p className="text-lg opacity-90">
            Discover exciting career paths in environmental science
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {careers.map((career, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-nature transition-all"
          >
            <h3 className="text-xl font-display font-bold text-primary mb-2">
              {career.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {career.description}
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">Education:</h4>
                <p className="text-sm text-muted-foreground">{career.education}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Typical Tasks:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {career.tasks.map((task, tIndex) => (
                    <li key={tIndex} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
