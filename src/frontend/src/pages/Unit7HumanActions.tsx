import { Link2 } from 'lucide-react';
import UnitLayout from '../components/shared/UnitLayout';
import ReadingContent from '../components/shared/ReadingContent';
import VideoEmbed from '../components/shared/VideoEmbed';
import WebQuest from '../components/shared/WebQuest';
import FunFacts from '../components/shared/FunFacts';
import CareerExploration from '../components/shared/CareerExploration';
import STEMConnectionsSection from '../components/shared/STEMConnectionsSection';
import SelfCheckingQuiz from '../components/shared/SelfCheckingQuiz';
import { unitReadingContent } from '../data/unitReadingContent';
import { unitVideos } from '../data/unitVideos';
import { unitWebQuests } from '../data/unitWebQuests';
import { unitFunFacts } from '../data/unitFunFacts';
import { unitCareers } from '../data/unitCareers';
import { unitQuizzes } from '../data/unitQuizzes';

export default function Unit7HumanActions() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <UnitLayout unitNumber={7} unitTitle="Individual & Collective Human Actions">
      <ReadingContent subtopics={unitReadingContent.unit7} />
      
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
              onClick={() => scrollToSection('sustainability-activities')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Sustainability Audit
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Assess sustainability practices
              </p>
            </button>
            <button
              onClick={() => scrollToSection('sustainability-activities')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Renewable Energy Comparison
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Compare renewable energy sources
              </p>
            </button>
          </div>
        </div>
      </section>
      
      <section id="sustainability-activities" className="my-12 scroll-mt-24">
        <h2 className="text-3xl font-display font-bold mb-6">Interactive Activities</h2>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <p className="text-muted-foreground">
            Sustainable city simulation, waste reduction challenge, and carbon footprint calculator coming soon.
          </p>
        </div>
      </section>

      <VideoEmbed videos={unitVideos.unit7} />
      <WebQuest content={unitWebQuests.unit7} />
      <FunFacts facts={unitFunFacts.unit7} />
      <CareerExploration careers={unitCareers.unit7} />
      <STEMConnectionsSection />
      <SelfCheckingQuiz quiz={unitQuizzes.unit7} unitId="unit7" />
    </UnitLayout>
  );
}
