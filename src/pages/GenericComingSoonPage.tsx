// src/pages/GenericComingSoonPage.tsx
import { Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface GenericPageProps {
  title: string;
  description: string;
}

export default function GenericComingSoonPage({ title, description }: GenericPageProps) {
  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-background/50 text-center">
      <div className="max-w-2xl p-8 bg-card rounded-xl shadow-xl space-y-6">
        <Settings className="h-16 w-16 text-golden mx-auto animate-spin-slow" />
        <h1 className="text-4xl font-extrabold text-foreground">{title}</h1>
        <p className="text-xl text-muted-foreground">
          {description}
        </p>
        <p className="text-sm text-primary/70 font-medium">
          Our team is actively building this feature to ensure it meets our standards for sustainable and community-focused tourism. Check back soon!
        </p>
        <Button asChild size="lg" className="bg-nature hover:bg-nature/90">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
