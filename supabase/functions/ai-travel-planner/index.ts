import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, preferences } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    // Construct system prompt for Jharkhand tourism
    const systemPrompt = `You are an expert AI travel planner specializing in Jharkhand, India tourism. Your role is to create personalized, culturally authentic, and eco-friendly travel itineraries that support local communities.

Key destinations in Jharkhand:
- Netarhat: Hill station known as "Queen of Chotanagpur" with sunrise/sunset points
- Patratu Valley: Scenic valley with lakes and adventure activities  
- Betla National Park: Wildlife sanctuary with tigers, elephants, and biodiversity
- Hundru Falls: Spectacular 98m waterfall near Ranchi
- Deoghar: Sacred pilgrimage site with Baidyanath Temple
- Jamshedpur: Industrial city with parks and cultural sites
- Hazaribagh: Wildlife and coal mining heritage
- Palamu: Tiger reserve and historical fort

Focus on:
- Tribal culture and heritage experiences
- Eco-tourism and sustainable practices
- Local homestays and community engagement
- Traditional handicrafts and local markets
- Seasonal festivals and cultural events
- Adventure activities and nature exploration

Always provide practical details like best time to visit, local transport, accommodation options, and cultural etiquette.`;

    const userPrompt = `${preferences ? `User preferences: ${JSON.stringify(preferences)}\n\n` : ''}User request: ${message}

Please create a detailed travel itinerary for Jharkhand that includes:
1. Day-by-day schedule with activities
2. Recommended destinations based on user interests
3. Local experiences and cultural immersion
4. Accommodation suggestions (prioritize homestays)
5. Transportation between locations
6. Estimated budget breakdown
7. Best time to visit and seasonal considerations
8. Cultural etiquette and tips

Format your response in clear sections with practical information.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\n${userPrompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 64,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      response: generatedText,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-travel-planner function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});