import { useState } from "react";
import { MessageCircle, ChevronUp, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would integrate with your AI chat system
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-[20px] z-50">
      {/* Chat Window */}
      <div
        className={cn(
          "mb-4 w-80 bg-card border rounded-lg shadow-elegant transition-all duration-300",
          isOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="p-4 border-b bg-gradient-accent rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
        
        <div className="h-64 p-4 overflow-y-auto bg-background/95">
          <div className="space-y-3">
            <div className="bg-muted/50 p-3 rounded-lg max-w-[80%]">
              <p className="text-sm">
                Hi! I'm your AI travel assistant. How can I help you explore Jharkhand today?
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about destinations, activities..."
              className="flex-1 px-3 py-2 bg-muted/50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nature/30"
            />
            <Button 
              size="sm" 
              onClick={handleSendMessage}
              className="bg-nature hover:bg-nature/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Toggle Button */}
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

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-24 right-6 z-40 space-y-3">
      <Button
        size="sm"
        className="rounded-full bg-cultural/90 hover:bg-cultural shadow-elegant"
        asChild
      >
        <a href="/ai-planner" className="flex items-center space-x-2">
          <span className="hidden sm:inline">Quick Plan</span>
        </a>
      </Button>
      
      <Button
        size="sm"
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