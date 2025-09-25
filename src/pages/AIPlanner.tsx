import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Sparkles, MapPin, Calendar, DollarSign } from 'lucide-react';

interface Preferences {
  interests: string[];
  budget: string;
  duration: string;
  travelStyle: string;
  groupSize: string;
}

const AIPlanner = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    interests: [],
    budget: '',
    duration: '',
    travelStyle: '',
    groupSize: ''
  });
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const interestOptions = [
    'Cultural Heritage',
    'Tribal Experiences',
    'Wildlife & Nature',
    'Adventure Sports',
    'Spiritual Sites',
    'Handicrafts & Shopping',
    'Photography',
    'Festivals & Events'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest)
    }));
  };

  const handlePlanTrip = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please describe your travel preferences or ask a question.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-travel-planner', {
        body: {
          message: message.trim(),
          preferences: preferences
        }
      });

      if (error) throw error;

      if (data?.success && data?.response) {
        setResponse(data.response);
        toast({
          title: "Itinerary Generated!",
          description: "Your personalized Jharkhand travel plan is ready."
        });
      } else {
        throw new Error(data?.error || 'Failed to generate itinerary');
      }
    } catch (error) {
      console.error('Error planning trip:', error);
      toast({
        title: "Planning Error",
        description: "Failed to generate your itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            AI Travel Planner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI create a personalized Jharkhand itinerary that celebrates local culture, 
            supports communities, and matches your travel style perfectly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preferences Form */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Travel Preferences
              </CardTitle>
              <CardDescription>
                Tell us about your ideal Jharkhand experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Interests */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">What interests you most?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={preferences.interests.includes(interest)}
                        onCheckedChange={(checked) => 
                          handleInterestChange(interest, checked as boolean)
                        }
                      />
                      <Label htmlFor={interest} className="text-sm">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Budget Range (per person)
                </Label>
                <Select value={preferences.budget} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, budget: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget (₹5,000-15,000)</SelectItem>
                    <SelectItem value="mid-range">Mid-range (₹15,000-40,000)</SelectItem>
                    <SelectItem value="luxury">Luxury (₹40,000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Trip Duration
                </Label>
                <Select value={preferences.duration} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, duration: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="How long is your trip?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-3 days">2-3 days</SelectItem>
                    <SelectItem value="4-6 days">4-6 days</SelectItem>
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="10+ days">10+ days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <Label htmlFor="style" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Travel Style
                </Label>
                <Select value={preferences.travelStyle} onValueChange={(value) => 
                  setPreferences(prev => ({ ...prev, travelStyle: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your travel style?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxed">Relaxed & Scenic</SelectItem>
                    <SelectItem value="adventure">Adventure & Active</SelectItem>
                    <SelectItem value="cultural">Cultural Immersion</SelectItem>
                    <SelectItem value="mixed">Mixed Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Group Size */}
              <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  placeholder="e.g., 2 adults, family of 4"
                  value={preferences.groupSize}
                  onChange={(e) => setPreferences(prev => ({ 
                    ...prev, 
                    groupSize: e.target.value 
                  }))}
                />
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Tell us more about your dream trip</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your ideal Jharkhand experience, specific requests, or ask any questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button 
                onClick={handlePlanTrip}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Your Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate AI Itinerary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Response Area */}
          <Card className="backdrop-blur-sm bg-card/80">
            <CardHeader>
              <CardTitle>Your Personalized Itinerary</CardTitle>
              <CardDescription>
                AI-generated travel plan for your Jharkhand adventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Crafting your perfect Jharkhand experience...
                  </p>
                </div>
              ) : response ? (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {response}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                  <Sparkles className="w-12 h-12 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Fill out your preferences and describe your ideal trip to get started!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;