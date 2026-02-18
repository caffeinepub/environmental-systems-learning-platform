import { useGetCallerUserProfile } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

export default function ProgressDashboard() {
  const { identity, login } = useInternetIdentity();
  const { data: userProfile, isLoading } = useGetCallerUserProfile();

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-bold mb-4">Track Your Progress</h1>
          <p className="text-muted-foreground mb-6">
            Login to track your quiz scores, earn badges, and monitor your learning journey.
          </p>
          <Button onClick={login} className="bg-primary">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const units = [
    { id: 'unit1', name: 'Environmental Systems', route: '/unit1-environmental-systems' },
    { id: 'unit2', name: 'Nature of Science', route: '/unit2-nature-of-science' },
    { id: 'unit3', name: 'Energy Flow', route: '/unit3-energy-flow' },
    { id: 'unit4', name: 'Carrying Capacity', route: '/unit4-carrying-capacity' },
    { id: 'unit5', name: 'Natural Change', route: '/unit5-natural-change' },
    { id: 'unit6', name: 'Human Impact', route: '/unit6-human-impact' },
    { id: 'unit7', name: 'Human Actions', route: '/unit7-human-actions' },
    { id: 'unit8', name: 'Ethics & Economics', route: '/unit8-ethics-economics' },
    { id: 'unit9', name: 'Legislation', route: '/unit9-legislation' },
  ];

  const getUnitScore = (unitId: string) => {
    const score = userProfile?.quizScores.find(([id]) => id === unitId);
    return score ? Number(score[1]) : null;
  };

  const hasBadge = (unitId: string) => {
    return userProfile?.badges.includes(unitId) || false;
  };

  const completedUnits = units.filter(unit => getUnitScore(unit.id) !== null).length;
  const totalBadges = userProfile?.badges.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-8">Your Progress</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-forestGreen to-moss text-white shadow-nature">
            <BookOpen className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{completedUnits}/9</div>
            <div className="text-sm opacity-90">Units Completed</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-sageGreen to-olive text-white shadow-nature">
            <Award className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{totalBadges}</div>
            <div className="text-sm opacity-90">Badges Earned</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-olive to-moss text-white shadow-nature">
            <CheckCircle2 className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">
              {Math.round((completedUnits / 9) * 100)}%
            </div>
            <div className="text-sm opacity-90">Overall Progress</div>
          </div>
        </div>

        {/* Unit Progress */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-display font-bold mb-6">Unit Progress</h2>
          <div className="space-y-4">
            {units.map((unit, index) => {
              const score = getUnitScore(unit.id);
              const badge = hasBadge(unit.id);

              return (
                <div
                  key={unit.id}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-forestGreen to-moss text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{unit.name}</h3>
                    {score !== null ? (
                      <p className="text-sm text-muted-foreground">
                        Quiz Score: {score}%
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not started</p>
                    )}
                  </div>

                  {badge && (
                    <div className="flex-shrink-0">
                      <img
                        src="/assets/generated/quiz-badge.dim_128x128.png"
                        alt="Badge"
                        className="w-12 h-12"
                      />
                    </div>
                  )}

                  <Link to={unit.route}>
                    <Button variant="outline" size="sm">
                      {score !== null ? 'Review' : 'Start'}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
