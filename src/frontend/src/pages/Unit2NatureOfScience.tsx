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

export default function Unit2NatureOfScience() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <UnitLayout unitNumber={2} unitTitle="Nature of Science">
      <ReadingContent subtopics={unitReadingContent.unit2} />
      
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
              onClick={() => scrollToSection('scientific-method-activities')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Scientific Method Builder
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Practice the scientific method
              </p>
            </button>
            <button
              onClick={() => scrollToSection('scientific-method-activities')}
              className="p-4 rounded-xl bg-white hover:bg-forestGreen/10 border border-border hover:border-forestGreen transition-all text-left group"
            >
              <h4 className="font-semibold text-forestGreen group-hover:underline">
                Hypothesis Testing
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Test and refine hypotheses
              </p>
            </button>
          </div>
        </div>
      </section>
      
      <section id="scientific-method-activities" className="my-12 scroll-mt-24">
        <h2 className="text-3xl font-display font-bold mb-6">Interactive Activities</h2>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <p className="text-muted-foreground">
            Interactive scientific method builder, hypothesis testing, and classification activities coming soon.
          </p>
        </div>
      </section>

      <VideoEmbed videos={unitVideos.unit2} />
      <WebQuest content={unitWebQuests.unit2} />
      <FunFacts facts={unitFunFacts.unit2} />
      <CareerExploration careers={unitCareers.unit2} />
      <STEMConnectionsSection />
      <SelfCheckingQuiz quiz={unitQuizzes.unit2} unitId="unit2" />
    </UnitLayout>
  );
}
