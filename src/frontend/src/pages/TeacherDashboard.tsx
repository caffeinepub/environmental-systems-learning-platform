import { useGetAllUserProfiles, useIsCallerAdmin } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '../components/ui/button';
import { Users, Award, TrendingUp } from 'lucide-react';

export default function TeacherDashboard() {
  const { identity, login } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: allProfiles, isLoading: profilesLoading } = useGetAllUserProfiles();

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-bold mb-4">Teacher Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Login to access the teacher dashboard and view student progress.
          </p>
          <Button onClick={login} className="bg-primary">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading || profilesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            You need administrator privileges to access the teacher dashboard.
          </p>
        </div>
      </div>
    );
  }

  const students = allProfiles?.filter(p => p.role === 'student') || [];
  const totalBadges = students.reduce((sum, s) => sum + s.badges.length, 0);
  const avgCompletion = students.length > 0
    ? Math.round((students.reduce((sum, s) => sum + s.completedUnits.length, 0) / students.length / 9) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-8">Teacher Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-forestGreen to-moss text-white shadow-nature">
            <Users className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{students.length}</div>
            <div className="text-sm opacity-90">Total Students</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-sageGreen to-olive text-white shadow-nature">
            <Award className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{totalBadges}</div>
            <div className="text-sm opacity-90">Total Badges Earned</div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-olive to-moss text-white shadow-nature">
            <TrendingUp className="w-8 h-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{avgCompletion}%</div>
            <div className="text-sm opacity-90">Average Completion</div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-display font-bold mb-6">Student Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Student</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-center p-3 font-semibold">Completed Units</th>
                  <th className="text-center p-3 font-semibold">Badges</th>
                  <th className="text-center p-3 font-semibold">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      No students enrolled yet
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => {
                    const avgScore = student.quizScores.length > 0
                      ? Math.round(
                          student.quizScores.reduce((sum, [, score]) => sum + Number(score), 0) /
                            student.quizScores.length
                        )
                      : 0;

                    return (
                      <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3 text-muted-foreground">{student.email}</td>
                        <td className="p-3 text-center">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {student.completedUnits.length}/9
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                            {student.badges.length}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-3 py-1 rounded-full font-semibold text-sm ${
                            avgScore >= 80
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : avgScore >= 60
                              ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          }`}>
                            {avgScore}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Career Reflections Section */}
        {students.some(s => s.careerReflections.length > 0) && (
          <div className="mt-8 bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-display font-bold mb-6">Career Reflections</h2>
            <div className="space-y-4">
              {students
                .filter(s => s.careerReflections.length > 0)
                .map((student, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border">
                    <h3 className="font-semibold mb-2">{student.name}</h3>
                    <div className="space-y-2">
                      {student.careerReflections.map((reflection, rIndex) => (
                        <p key={rIndex} className="text-sm text-muted-foreground">
                          {reflection}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
