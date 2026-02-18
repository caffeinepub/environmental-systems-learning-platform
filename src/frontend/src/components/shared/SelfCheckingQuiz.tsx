import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { useSaveCallerUserProfile, useGetCallerUserProfile } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  quiz: {
    questions: Question[];
  };
  unitId: string;
}

export default function SelfCheckingQuiz({ quiz, unitId }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const { data: userProfile } = useGetCallerUserProfile();
  const saveProfile = useSaveCallerUserProfile();

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    return answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length;
  };

  const handleSubmit = async () => {
    setShowResults(true);
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    // Save score to profile
    if (userProfile) {
      const updatedProfile = {
        ...userProfile,
        quizScores: [
          ...userProfile.quizScores.filter(([id]) => id !== unitId),
          [unitId, BigInt(percentage)]
        ] as [string, bigint][],
      };

      // Award badge if score is 80% or higher
      if (percentage >= 80 && !userProfile.badges.includes(unitId)) {
        updatedProfile.badges = [...userProfile.badges, unitId];
        toast.success('🎉 Badge earned! Great job!');
      }

      try {
        await saveProfile.mutateAsync(updatedProfile);
        toast.success(`Quiz completed! Score: ${percentage}%`);
      } catch (error) {
        console.error('Failed to save quiz score:', error);
      }
    }
  };

  const handleReset = () => {
    setAnswers(new Array(quiz.questions.length).fill(null));
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = answers.every(a => a !== null);

  return (
    <section className="my-12 p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-primary/20">
      <h2 className="text-3xl font-display font-bold mb-6">Self-Checking Quiz</h2>
      
      <div className="space-y-6">
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="p-6 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-lg mb-4">
              {qIndex + 1}. {q.question}
            </h3>
            
            <div className="space-y-2">
              {q.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === oIndex;
                const isCorrect = oIndex === q.correctAnswer;
                const showFeedback = showResults && isSelected;

                return (
                  <button
                    key={oIndex}
                    onClick={() => !showResults && handleAnswer(qIndex, oIndex)}
                    disabled={showResults}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? showResults
                          ? isCorrect
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : 'border-red-500 bg-red-50 dark:bg-red-950'
                          : 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && (
                        isCorrect ? 
                          <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                          <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showResults && answers[qIndex] !== q.correctAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        {!showResults ? (
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="bg-primary"
          >
            Submit Quiz
          </Button>
        ) : (
          <>
            <div className="flex-1 p-4 rounded-lg bg-card border-2 border-primary text-center">
              <p className="text-2xl font-bold text-primary">
                Score: {score}/{quiz.questions.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {Math.round((score / quiz.questions.length) * 100)}%
              </p>
            </div>
            <Button onClick={handleReset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
