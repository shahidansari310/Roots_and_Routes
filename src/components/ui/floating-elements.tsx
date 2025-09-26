// src/components/ui/floating-elements.tsx (MODIFIED FILE)
import { useState } from "react";
import { MessageCircle, ChevronUp, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Import Supabase client to access the backend Edge Function
import { supabase } from "@/integrations/supabase/client"; 

interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const initialMessages: ChatMessage[] = [
  { 
    id: 1, 
    sender: 'bot', 
    text: "Hi! I'm your AI travel assistant for Jharkhand. How can I help you explore or plan a trip today?" 
  },
];

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const appendMessage = (sender: 'user' | 'bot', text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), sender, text }]);
  };

  const handleSendMessage = async () => {
    const userMessage = message.trim();
    if (userMessage === '' || isLoading) return;

    // 1. Add user message to history
    appendMessage('user', userMessage);
    setMessage("");
    setIsLoading(true);

    try {
      // 2. Call the existing Supabase Edge Function (the same backend as AIPlanner)
      const { data, error } = await supabase.functions.invoke('ai-travel-planner', {
        body: {
          message: userMessage,
          // Since this is a general chat, we send no specific preferences
          preferences: {} 
        }
      });

      if (error) throw error;

      if (data?.success && data?.response) {
        // 3. Add bot's response to history
        appendMessage('bot', data.response);
      } else {
        throw new Error(data?.error || 'Failed to get AI response.');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      appendMessage('bot', "Oops! It looks like our AI is taking a short break. Please try again later, or visit the full /ai-planner page.");
    } finally {
      setIsLoading(false);
      // Ensure the window scrolls to the bottom after loading the response
      setTimeout(() => {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 mb-16 right-6 w-80 bg-card border rounded-lg shadow-elegant transition-all duration-300",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="p-4 border-b bg-gradient-accent rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
              <h3 className="font-semibold text-cultural-foreground">AI Travel Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cultural-foreground hover:opacity-70 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Message Display Area */}
        <div id="chat-window" className="h-64 p-4 overflow-y-auto bg-background/95">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "p-3 rounded-lg max-w-[80%] whitespace-pre-wrap",
                  msg.sender === 'user' 
                    ? 'ml-auto bg-nature/10 text-right' 
                    : 'mr-auto bg-muted/50 text-left'
                )}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
            {/* Loading Indicator */}
            {isLoading && (
                <div className="mr-auto bg-muted/50 p-3 rounded-lg max-w-[80%] flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-nature" />
                    <p className="text-sm text-nature">AI is typing...</p>
                </div>
            )}
          </div>
        </div>

        {/* Input Field and Send Button */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about destinations, activities..."
              className="flex-1 px-3 py-2 bg-muted/50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nature/30"
              disabled={isLoading}
            />
            <Button
              size="sm"
              onClick={handleSendMessage}
              className="bg-nature hover:bg-nature/90"
              disabled={isLoading || message.trim() === ''}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button (omitted for brevity, no changes) */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-accent shadow-cultural hover:shadow-golden animate-bounce-gentle"
      >
        {isOpen ? (
          <ChevronUp className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}

// FloatingActionButtons remains unchanged
export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-8 right-24 z-40 space-y-3">
      <Button
        size="lg"
        className="rounded-full bg-cultural/90 hover:bg-cultural shadow-elegant left-3"
        asChild
      >
        <a href="/ai-planner" className="flex items-center space-x-2">
          <span className="hidden sm:inline">Quick Plan</span>
        </a>
      </Button>

      <Button
        size="lg"
        className="rounded-full bg-tribal/90 hover:bg-tribal shadow-elegant"
        asChild
      >
        <a href="/virtual-tours" className="flex items-center space-x-2">
          <span className="hidden sm:inline">VR Tour</span>
        </a>
      </Button>
    </div>
  );
}