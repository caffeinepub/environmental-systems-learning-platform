import { Play } from 'lucide-react';

interface Video {
  title: string;
  url: string;
  description: string;
}

interface VideoEmbedProps {
  videos: Video[];
}

export default function VideoEmbed({ videos }: VideoEmbedProps) {
  return (
    <section className="my-12">
      <div className="flex items-center gap-3 mb-6">
        <Play className="w-6 h-6 text-primary" />
        <h2 className="text-3xl font-display font-bold">Video Resources</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="rounded-xl overflow-hidden border border-border shadow-sm bg-card">
            <div className="aspect-video">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
              <p className="text-sm text-muted-foreground">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
