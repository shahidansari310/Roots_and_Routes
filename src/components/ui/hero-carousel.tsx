import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Import hero images
import heroNetarhat from "@/assets/hero-netarhat.jpg";
import heroHundru from "@/assets/hero-hundru-falls.jpg";
import heroBetla from "@/assets/hero-betla-park.jpg";
import heroPatratu from "@/assets/hero-patratu.jpg";

const slides = [
  {
    id: 1,
    image: heroNetarhat,
    location: "Netarhat Hills",
    title: "The Queen of Chotanagpur",
    description: "Experience breathtaking sunrises and rolling green hills in Jharkhand's hill station paradise.",
    highlights: ["Sunrise Point", "Dense Forests", "Cool Climate"]
  },
  {
    id: 2,
    image: heroHundru,
    location: "Hundru Falls",
    title: "Nature's Spectacular Show",
    description: "Witness the mighty 98-meter waterfall cascading through pristine wilderness.",
    highlights: ["98m Waterfall", "Rainbow Views", "Trekking Trails"]
  },
  {
    id: 3,
    image: heroBetla,
    location: "Betla National Park",
    title: "Wildlife Paradise",
    description: "Encounter majestic elephants and diverse wildlife in their natural habitat.",
    highlights: ["Wild Elephants", "Sal Forests", "Safari Adventures"]
  },
  {
    id: 4,
    image: heroPatratu,
    location: "Patratu Valley",
    title: "Serene Blue Waters",
    description: "Discover tranquil lakes nestled between emerald hills and traditional villages.",
    highlights: ["Lake Views", "Boating", "Peaceful Valleys"]
  }
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slide Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt={slide.location}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-cultural" />
              <span className="text-cultural font-medium">
                {slides[currentSlide].location}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {slides[currentSlide].highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button
                size="lg"
                className="bg-gradient-accent hover:shadow-golden text-lg px-8 py-4"
              >
                Explore Destination
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4"
              >
                <Play className="h-5 w-5 mr-2" />
                Virtual Tour
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-200",
              index === currentSlide
                ? "bg-cultural scale-125"
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="absolute bottom-20 right-8 z-20 flex items-center space-x-2 text-white/80 text-sm">
          <div className="animate-pulse">
            <div className="w-2 h-2 bg-cultural rounded-full"></div>
          </div>
          <span>Auto-playing</span>
        </div>
      )}
    </section>
  );
}