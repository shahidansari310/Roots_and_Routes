// src/pages/VirtualTours.tsx
import { Headset, Eye, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockTours = [
  { 
    id: 1, 
    title: "Netarhat Sunrise Panorama", 
    description: "Experience the 'Queen of Chotanagpur' plateau at dawn in a breathtaking 360° view.", 
    tags: ["Scenic", "360°", "Hill Station"],
    link: "#",
    image: "https://via.placeholder.com/400x200/4c7c8c/ffffff?text=Netarhat+Tour" 
  },
  { 
    id: 2, 
    title: "Hundru Falls Immersion", 
    description: "Stand at the foot of the 98-meter cascading waterfall with interactive elements.", 
    tags: ["Adventure", "Interactive", "Waterfall"],
    link: "#",
    image: "https://via.placeholder.com/400x200/8c4c7c/ffffff?text=Hundru+Falls+VR" 
  },
  { 
    id: 3, 
    title: "Betla Wildlife Safari", 
    description: "A virtual reality jungle safari through the Betla National Park. (Coming Soon)", 
    tags: ["Wildlife", "360°", "Safari"],
    link: "#",
    disabled: true,
    image: "https://via.placeholder.com/400x200/7c8c4c/ffffff?text=Betla+Safari" 
  },
];

export default function VirtualTours() {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3 text-golden">
          <Headset className="h-8 w-8" />
          Immersive Virtual Tours
        </h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Experience Jharkhand's cultural and natural wonders from anywhere with 360° virtual reality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockTours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
            <div 
              className="h-48 bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${tour.image})` }}
            >
              {/* Optional: Placeholder for image or VR viewer icon */}
              <Eye className="h-12 w-12 text-white/80 drop-shadow-lg" />
            </div>
            <CardHeader>
              <CardTitle>{tour.title}</CardTitle>
              <CardDescription>{tour.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tour.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-golden/20 text-golden hover:bg-golden/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                className="w-full bg-golden hover:bg-golden/90"
                disabled={tour.disabled}
              >
                <a href={tour.link}>
                  {tour.disabled ? 'Coming Soon' : 'Start Tour'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          For the best experience, use a VR headset or Google Cardboard.
        </p>
      </div>
    </div>
  );
}