import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

export default function STEMConnectionsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [reflection, setReflection] = useState('');

  const resources = [
    { 
      category: 'Museums', 
      items: [
        { name: 'Smithsonian Natural History Museum', url: 'https://naturalhistory.si.edu/' },
        { name: 'American Museum of Natural History', url: 'https://www.amnh.org/' }
      ]
    },
    { 
      category: 'Research Universities', 
      items: [
        { name: 'MIT Environmental Solutions', url: 'https://environmentalsolutions.mit.edu/' },
        { name: 'Stanford Woods Institute', url: 'https://woods.stanford.edu/' }
      ]
    },
    { 
      category: 'Professional Organizations', 
      items: [
        { name: 'Ecological Society of America', url: 'https://www.esa.org/' },
        { name: 'American Geophysical Union', url: 'https://www.agu.org/' }
      ]
    },
    { 
      category: 'Online Platforms', 
      items: [
        { name: 'Khan Academy', url: 'https://www.khanacademy.org/science/biology' },
        { name: 'Coursera Environmental Science', url: 'https://www.coursera.org/browse/physical-science-and-engineering/environmental-science-and-sustainability' }
      ]
    },
  ];

  const handleSaveReflection = () => {
    localStorage.setItem('stem-reflection', reflection);
    alert('Reflection saved!');
  };

  return (
    <section className="my-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-between hover:shadow-nature-lg transition-all"
      >
        <h2 className="text-2xl font-display font-bold">
          Explore STEM Careers & Real-World Connections
        </h2>
        {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="mt-4 p-8 rounded-2xl bg-card border-2 border-primary/20 space-y-8">
          {/* Resource Cards */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">External Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="p-4 rounded-lg border border-border hover:border-primary transition-colors">
                  <h4 className="font-semibold text-primary mb-2">{resource.category}</h4>
                  <ul className="space-y-1">
                    {resource.items.map((item, iIndex) => (
                      <li key={iIndex}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors cursor-pointer group"
                        >
                          <ExternalLink className="w-3 h-3 group-hover:scale-110 transition-transform" />
                          <span className="group-hover:underline">{item.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Career Pathway Map */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Career Pathway Map</h3>
            <div className="p-6 rounded-lg bg-gradient-to-r from-forestGreen/10 to-moss/10 border border-forestGreen/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-forestGreen text-white flex items-center justify-center font-bold mb-2">
                    High School
                  </div>
                  <p className="text-sm">Science courses, AP Environmental</p>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-sageGreen text-white flex items-center justify-center font-bold mb-2">
                    College
                  </div>
                  <p className="text-sm">Environmental Science degree</p>
                </div>
                <div className="text-2xl text-muted-foreground">→</div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-olive text-white flex items-center justify-center font-bold mb-2">
                    Career
                  </div>
                  <p className="text-sm">Environmental professional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interview Template */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Interview a STEM Professional</h3>
            <div className="p-6 rounded-lg border border-border">
              <p className="mb-4 text-sm text-muted-foreground">
                Use these questions to interview someone working in environmental science:
              </p>
              <ul className="space-y-2 text-sm mb-4">
                <li>• What inspired you to pursue this career?</li>
                <li>• What does a typical day look like in your job?</li>
                <li>• What skills are most important in your field?</li>
                <li>• What advice would you give to students interested in this career?</li>
              </ul>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Download Template
              </Button>
            </div>
          </div>

          {/* Reflection Journal */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Reflection Journal</h3>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Reflect on what you've learned about STEM careers. Which careers interest you most? Why?"
              className="min-h-32 mb-3"
            />
            <Button onClick={handleSaveReflection} className="bg-primary">
              Save Reflection
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
