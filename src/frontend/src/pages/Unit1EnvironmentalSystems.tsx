import { Link2 } from 'lucide-react';
import UnitLayout from '../components/shared/UnitLayout';
import ReadingContent from '../components/shared/ReadingContent';
import VideoEmbed from '../components/shared/VideoEmbed';
import WebQuest from '../components/shared/WebQuest';
import FunFacts from '../components/shared/FunFacts';
import CareerExploration from '../components/shared/CareerExploration';
import STEMConnectionsSection from '../components/shared/STEMConnectionsSection';
import SelfCheckingQuiz from '../components/shared/SelfCheckingQuiz';
import BioticAbioticSorting from '../components/unit1/BioticAbioticSorting';
import FoodWebBuilder from '../components/unit1/FoodWebBuilder';
import VirtualLab from '../components/unit1/VirtualLab';
import BiogeochemicalCycles from '../components/unit1/BiogeochemicalCycles';
import { unitReadingContent } from '../data/unitReadingContent';
import { unitVideos } from '../data/unitVideos';
import { unitWebQuests } from '../data/unitWebQuests';
import { unitFunFacts } from '../data/unitFunFacts';
import { unitCareers } from '../data/unitCareers';
import { unitQuizzes } from '../data/unitQuizzes';

export default function Unit1EnvironmentalSystems() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <UnitLayout unitNumber={1} unitTitle="Environmental Systems">
      <ReadingContent subtopics={unitReadingContent.unit1} />
      
      {/* Interactive Activities Navigation */}
      <section className="my-12">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-forestGreen/5 to-moss/10 border-2 border-forestGreen/20">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-6 h-6 text-forestGreen" />
            <h3 className="text-2xl font-display font-bold text-forestGreen">Interactive Activities</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Jump to any interactive activity below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              onClick={() => scrollToSection('biotic-abiotic-sorting')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Biotic vs. Abiotic Sorting
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sort living and non-living components
              </p>
            </button>
            <button
              onClick={() => scrollToSection('food-web-builder')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Food Web Builder
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Visualize energy flow through ecosystems
              </p>
            </button>
            <button
              onClick={() => scrollToSection('virtual-lab')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Virtual Lab
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Measure dissolved oxygen and nitrates
              </p>
            </button>
            <button
              onClick={() => scrollToSection('biogeochemical-cycles')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Biogeochemical Cycles
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Explore water, carbon, nitrogen, and phosphorus cycles
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Activities */}
      <section className="my-12 space-y-8">
        <div id="biotic-abiotic-sorting" className="scroll-mt-24">
          <BioticAbioticSorting />
        </div>
        
        <div id="food-web-builder" className="scroll-mt-24">
          <FoodWebBuilder />
        </div>
        
        <div id="virtual-lab" className="scroll-mt-24">
          <VirtualLab />
        </div>
        
        <div id="biogeochemical-cycles" className="scroll-mt-24">
          <BiogeochemicalCycles />
        </div>
      </section>

      <VideoEmbed videos={unitVideos.unit1} />
      
      <WebQuest content={unitWebQuests.unit1} />
      
      <FunFacts facts={unitFunFacts.unit1} />
      
      <CareerExploration careers={unitCareers.unit1} />
      
      <STEMConnectionsSection />
      
      <SelfCheckingQuiz quiz={unitQuizzes.unit1} unitId="unit1" />
    </UnitLayout>
  );
}
