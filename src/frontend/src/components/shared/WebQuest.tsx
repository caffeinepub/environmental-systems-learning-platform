import { Compass } from 'lucide-react';

interface Task {
  question: string;
  resources: string[];
}

interface WebQuestContent {
  title: string;
  objectives: string[];
  tasks: Task[];
}

interface WebQuestProps {
  content: WebQuestContent;
}

export default function WebQuest({ content }: WebQuestProps) {
  return (
    <section className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-display font-bold">WebQuest</h2>
      </div>
      
      <div className="p-8 rounded-2xl bg-gradient-to-br from-sageGreen/10 to-olive/10 border-2 border-sageGreen/30">
        <h3 className="text-2xl font-display font-bold text-forestGreen mb-4">
          {content.title}
        </h3>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Learning Objectives:</h4>
          <ul className="space-y-2">
            {content.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {content.tasks.map((task, index) => (
            <div key={index} className="p-6 rounded-xl bg-white dark:bg-card border border-border">
              <h4 className="font-semibold mb-3">Task {index + 1}:</h4>
              <p className="mb-4">{task.question}</p>
              <div>
                <h5 className="text-sm font-semibold text-muted-foreground mb-2">
                  Suggested Resources:
                </h5>
                <ul className="space-y-1">
                  {task.resources.map((resource, rIndex) => (
                    <li key={rIndex}>
                      <a
                        href={resource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
