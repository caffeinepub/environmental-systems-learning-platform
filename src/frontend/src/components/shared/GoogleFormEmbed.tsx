import { FileText } from 'lucide-react';

interface GoogleFormEmbedProps {
  formUrl: string;
  title: string;
}

export default function GoogleFormEmbed({ formUrl, title }: GoogleFormEmbedProps) {
  return (
    <section className="my-16 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-display font-bold">{title}</h2>
      </div>
      
      <p className="text-muted-foreground mb-6">
        Complete this 25-question multiple choice assessment to test your understanding of this unit.
      </p>
      
      <div className="rounded-xl overflow-hidden border-2 border-border bg-white shadow-lg">
        <iframe
          src={formUrl}
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title={title}
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}
