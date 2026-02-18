import { BookOpen } from 'lucide-react';

interface Subtopic {
  title: string;
  content: string;
}

interface ReadingContentProps {
  subtopics: Subtopic[];
}

export default function ReadingContent({ subtopics }: ReadingContentProps) {
  return (
    <section className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-display font-bold">Reading Content</h2>
      </div>
      
      <div className="space-y-8">
        {subtopics.map((subtopic, index) => (
          <div 
            key={index}
            className="p-8 rounded-2xl tan-bg border border-border shadow-sm"
          >
            <h3 className="text-2xl font-display font-bold text-forestGreen mb-4">
              {subtopic.title}
            </h3>
            <div className="prose prose-lg max-w-none text-foreground leading-relaxed">
              {subtopic.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
