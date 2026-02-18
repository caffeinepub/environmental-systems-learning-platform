import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

interface UnitLayoutProps {
  unitNumber: number;
  unitTitle: string;
  children: ReactNode;
}

export default function UnitLayout({ unitNumber, unitTitle, children }: UnitLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      {/* Unit Header */}
      <div className="relative py-16 px-4 bg-gradient-to-br from-forestGreen to-moss text-white overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-10" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Units
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              Unit {unitNumber}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            {unitTitle}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}
