import { HeroCarousel } from "@/components/ui/hero-carousel";
import { FeatureCard } from "@/components/ui/feature-card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  MapPin, 
  ShoppingBag, 
  Headset, 
  Users, 
  BarChart3,
  Heart,
  Leaf,
  Calendar,
  Star,
  ArrowRight,
  Mail
} from "lucide-react";

const coreFeatures = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Trip Planner",
    description: "Get personalized itineraries crafted by AI, tailored to your interests, budget, and travel style.",
    features: [
      "Smart destination matching",
      "Budget optimization",
      "Cultural experience curation",
      "Real-time updates"
    ],
    ctaText: "Plan Your Journey",
    ctaHref: "/ai-planner",
    gradient: "nature" as const
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Interactive Map",
    description: "Explore Jharkhand's hidden gems with our detailed interactive map and real-time information.",
    features: [
      "Live weather updates",
      "Cultural site markers", 
      "Eco-tourism spots",
      "Local guide connections"
    ],
    ctaText: "Explore Map",
    ctaHref: "/destinations",
    gradient: "cultural" as const
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: "Local Marketplace",
    description: "Support local artisans and communities through authentic handicrafts and experiences.",
    features: [
      "Tribal handicrafts",
      "Homestay bookings",
      "Local experiences",
      "Community guides"
    ],
    ctaText: "Shop Local",
    ctaHref: "/marketplace",
    gradient: "tribal" as const
  },
  {
    icon: <Headset className="h-8 w-8" />,
    title: "Virtual Tours",
    description: "Experience Jharkhand's beauty through immersive 360° virtual reality tours.",
    features: [
      "360° site tours",
      "Cultural experiences",
      "VR compatibility",
      "Interactive elements"
    ],
    ctaText: "Start Virtual Tour",
    ctaHref: "/virtual-tours",
    gradient: "golden" as const
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Hub",
    description: "Connect with local communities, guides, and fellow travelers for authentic experiences.",
    features: [
      "Local partner network",
      "Traveler community",
      "Cultural events",
      "Impact stories"
    ],
    ctaText: "Join Community",
    ctaHref: "/community",
    gradient: "nature" as const
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Tourism Analytics",
    description: "Real-time insights on tourism trends, impact metrics, and destination performance.",
    features: [
      "Live tourism data",
      "Economic impact",
      "Sustainability metrics",
      "Trend analysis"
    ],
    ctaText: "View Analytics",
    ctaHref: "/analytics",
    gradient: "cultural" as const
  }
];

const impactStats = [
  { number: "2,500+", label: "Local Artisans Supported", icon: Heart },
  { number: "150+", label: "Eco-Tourism Sites", icon: Leaf },
  { number: "500+", label: "Cultural Events Promoted", icon: Calendar },
  { number: "4.8★", label: "Average Experience Rating", icon: Star }
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Core Features Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Empowering <span className="text-nature">Eco</span> & 
              <span className="text-cultural"> Cultural</span> Tourism
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Smart India Hackathon 2025 project promoting sustainable tourism while 
              empowering local communities through innovative AI-powered solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Discover Jharkhand's Treasures
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                From misty hill stations to ancient tribal lands, explore diverse 
                landscapes and rich cultural heritage.
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-accent hover:shadow-golden"
              asChild
            >
              <a href="/destinations" className="flex items-center space-x-2">
                <span>View All Destinations</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Featured destination cards will be added here */}
            <div className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-cultural transition-all duration-300 group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-nature/20 to-cultural/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-nature/60" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Netarhat Hills</h3>
                <p className="text-sm text-muted-foreground mb-3">Queen of Chotanagpur Plateau</p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore More
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-cultural transition-all duration-300 group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-cultural/20 to-golden/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-cultural/60" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Hundru Falls</h3>
                <p className="text-sm text-muted-foreground mb-3">98-meter cascading wonder</p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore More
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-cultural transition-all duration-300 group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-tribal/20 to-nature/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-tribal/60" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Betla National Park</h3>
                <p className="text-sm text-muted-foreground mb-3">Wildlife sanctuary paradise</p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore More
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-cultural transition-all duration-300 group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-golden/20 to-cultural/20 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-golden/60" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Patratu Valley</h3>
                <p className="text-sm text-muted-foreground mb-3">Serene lake and valley views</p>
                <Button size="sm" variant="outline" className="w-full">
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-nature/10 via-cultural/10 to-golden/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empowering Local Communities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real impact through sustainable tourism and community partnership
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent mb-4">
                  <stat.icon className="h-8 w-8 text-cultural-foreground" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-nature mb-2 animate-bounce-gentle">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Jharkhand Journey Today
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get personalized travel insights, cultural events, and exclusive local experiences 
              delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <Button 
                className="bg-white text-nature hover:bg-white/90 px-8"
              >
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-4">
              Join 10,000+ travelers exploring Jharkhand sustainably
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}