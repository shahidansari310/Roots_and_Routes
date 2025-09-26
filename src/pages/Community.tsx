// src/pages/Community.tsx
import { MessageSquare, Users, UserPlus, LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const communityFeatures = [
  { icon: <MessageSquare className="h-8 w-8 text-cultural" />, title: "Discussion Forums", description: "Connect with local guides, ask questions, and share travel stories.", cta: "Go to Forums", href: "#" },
  { icon: <UserPlus className="h-8 w-8 text-nature" />, title: "Local Guide Registry", description: "Find certified, community-vetted guides for authentic cultural experiences.", cta: "Find a Guide", href: "#" },
  { icon: <LinkIcon className="h-8 w-8 text-golden" />, title: "Partner Network", description: "For homestays and artisans to register and access tourism data.", cta: "Become a Partner", href: "#" },
];

export default function Community() {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-cultural">
          <Users className="h-8 w-8" />
          Roots & Routes Community Hub
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          The place to connect, share, and empower sustainable tourism across Jharkhand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {communityFeatures.map((feature, index) => (
          <Card key={index} className="shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              {feature.icon}
              <CardTitle className="mt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm text-center">{feature.description}</p>
              <Button asChild className="w-full bg-gradient-to-r from-cultural to-golden">
                <a href={feature.href}>{feature.cta}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center bg-nature/10 p-10 rounded-xl">
        <h2 className="text-3xl font-semibold text-nature mb-3">Community Impact Stories</h2>
        <p className="text-foreground/80 max-w-3xl mx-auto">
          Read testimonials from local artisans and homestay owners who have benefited from the Roots & Routes platform.
        </p>
        <Button variant="link" className="text-nature hover:text-nature/80 mt-2">
          View All Stories
        </Button>
      </div>
    </div>
  );
}
