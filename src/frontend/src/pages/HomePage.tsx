import { Link } from '@tanstack/react-router';
import { Leaf, Microscope, Zap, TrendingUp, Cloud, Factory, Users, Scale, FileText } from 'lucide-react';

const units = [
  {
    id: 1,
    title: 'Environmental Systems',
    description: 'Explore ecosystems, biotic and abiotic factors, and biogeochemical cycles',
    icon: Leaf,
    route: '/unit1-environmental-systems',
    color: 'from-forestGreen to-moss',
  },
  {
    id: 2,
    title: 'Nature of Science',
    description: 'Understand the scientific method, hypothesis testing, and scientific inquiry',
    icon: Microscope,
    route: '/unit2-nature-of-science',
    color: 'from-sageGreen to-olive',
  },
  {
    id: 3,
    title: 'Energy Flow',
    description: 'Discover energy transfer, trophic levels, and Earth system interactions',
    icon: Zap,
    route: '/unit3-energy-flow',
    color: 'from-olive to-moss',
  },
  {
    id: 4,
    title: 'Carrying Capacity',
    description: 'Analyze population dynamics, growth patterns, and limiting factors',
    icon: TrendingUp,
    route: '/unit4-carrying-capacity',
    color: 'from-moss to-forestGreen',
  },
  {
    id: 5,
    title: 'Natural Environmental Change',
    description: 'Study tectonic activity, climate patterns, and ecological succession',
    icon: Cloud,
    route: '/unit5-natural-change',
    color: 'from-forestGreen to-sageGreen',
  },
  {
    id: 6,
    title: 'Human Impact',
    description: 'Examine pollution, emissions, and human effects on the environment',
    icon: Factory,
    route: '/unit6-human-impact',
    color: 'from-sageGreen to-moss',
  },
  {
    id: 7,
    title: 'Human Actions',
    description: 'Explore sustainability, conservation, and individual environmental choices',
    icon: Users,
    route: '/unit7-human-actions',
    color: 'from-olive to-forestGreen',
  },
  {
    id: 8,
    title: 'Ethics & Economics',
    description: 'Debate environmental ethics, cost-benefit analysis, and policy decisions',
    icon: Scale,
    route: '/unit8-ethics-economics',
    color: 'from-moss to-olive',
  },
  {
    id: 9,
    title: 'Environmental Legislation',
    description: 'Learn about environmental laws, treaties, and global agreements',
    icon: FileText,
    route: '/unit9-legislation',
    color: 'from-forestGreen to-olive',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/generated/hero-nature-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-forestGreen/80 to-moss/70" />
        <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
          <div className="inline-block mb-6 animate-float">
            <img 
              src="/assets/generated/leaf-accent.dim_64x64.png" 
              alt="" 
              className="w-16 h-16 opacity-80"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
            Environmental Systems
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in opacity-95">
            Explore the science of our planet through interactive simulations, virtual labs, and engaging activities
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
            <Link 
              to="/progress"
              className="px-8 py-3 bg-white text-forestGreen rounded-full font-semibold hover:bg-lightTan transition-all shadow-nature hover:shadow-nature-lg"
            >
              Track Your Progress
            </Link>
            <a 
              href="#units"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all border-2 border-white/50"
            >
              Explore Units
            </a>
          </div>
        </div>
      </section>

      {/* Units Grid */}
      <section id="units" className="py-16 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Learning Units
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nine comprehensive units covering all aspects of environmental science
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit, index) => {
              const Icon = unit.icon;
              return (
                <Link
                  key={unit.id}
                  to={unit.route}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-full p-6 rounded-2xl bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-nature-lg overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 leaf-pattern pointer-events-none" />
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${unit.color} text-white shadow-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-muted-foreground">
                          Unit {unit.id}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {unit.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {unit.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        Start Learning →
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-forestGreen to-moss flex items-center justify-center text-white">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Interactive Labs</h3>
              <p className="text-muted-foreground">
                Conduct virtual experiments and simulations
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-sageGreen to-olive flex items-center justify-center text-white">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Earn badges and monitor your learning journey
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-olive to-moss flex items-center justify-center text-white">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Career Exploration</h3>
              <p className="text-muted-foreground">
                Discover STEM careers in environmental science
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
