// src/pages/AboutUs.tsx
import { Handshake, Leaf, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const missionPoints = [
  { icon: <Target className="h-6 w-6 text-nature" />, title: "Sustainable Travel", description: "Promoting eco-friendly practices that protect Jharkhand's natural environment." },
  { icon: <Users className="h-6 w-6 text-cultural" />, title: "Community Empowerment", description: "Directly supporting local artisans, homestays, and tribal communities." },
  { icon: <Handshake className="h-6 w-6 text-golden" />, title: "Cultural Immersion", description: "Facilitating authentic, respectful, and deep cultural exchange experiences." },
];

export default function AboutUs() {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-foreground mb-4">
          Our Roots & Routes Story
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We are an initiative born from the Smart India Hackathon 2025, dedicated to revolutionizing tourism in Jharkhand through technology, sustainability, and community partnership.
        </p>
      </div>

      <Separator className="mb-12 bg-nature/20" />

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
          <Leaf className="h-7 w-7 text-nature" />
          Our Core Mission
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missionPoints.map((point, index) => (
            <Card key={index} className="shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-nature/50">
              <CardHeader className="flex flex-row items-center space-x-4">
                {point.icon}
                <CardTitle>{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Vision Statement */}
      <section className="bg-cultural/10 p-10 rounded-xl shadow-inner my-12">
        <h2 className="text-3xl font-bold text-cultural mb-4">Our Vision</h2>
        <p className="text-xl text-foreground/80">
          To establish Jharkhand as a premier global destination for eco-cultural tourism, where technology directly translates into economic opportunities for local communities, and every journey leaves a positive ecological and social footprint.
        </p>
      </section>

      {/* Team/Contact Call to Action */}
      <section className="text-center py-8">
        <h3 className="text-2xl font-semibold mb-3">Want to collaborate or learn more?</h3>
        <p className="text-muted-foreground mb-6">Visit our contact page or join our community hub.</p>
        <div className="space-x-4">
          <a href="/contact" className="inline-block px-6 py-3 bg-nature text-white rounded-lg hover:bg-nature/90 transition-colors">Contact Us</a>
          <a href="/community" className="inline-block px-6 py-3 border border-cultural text-cultural rounded-lg hover:bg-cultural/10 transition-colors">Join Community</a>
        </div>
      </section>
    </div>
  );
}