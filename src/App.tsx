import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import { FloatingChatbot, FloatingActionButtons } from "@/components/ui/floating-elements";

// Pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AIPlanner from "./pages/AIPlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinations" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Destinations - Coming Soon</h1></div>} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/marketplace" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Marketplace - Coming Soon</h1></div>} />
            <Route path="/virtual-tours" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Virtual Tours - Coming Soon</h1></div>} />
            <Route path="/community" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Community - Coming Soon</h1></div>} />
            <Route path="/analytics" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Analytics - Coming Soon</h1></div>} />
            <Route path="/about" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">About - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="pt-16 min-h-screen flex items-center justify-center"><h1 className="text-2xl">Contact - Coming Soon</h1></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingChatbot />
          <FloatingActionButtons />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
