import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout";
import { FloatingChatbot, FloatingActionButtons } from "@/components/ui/floating-elements";

// Existing Core Pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AIPlanner from "./pages/AIPlanner";

// **New Functional Pages (replacing "Coming Soon" placeholders)**
import Destinations from "./pages/Destinations";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import VirtualTours from "./pages/VirtualTours";

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
            
            {/* Functional Routes - Now linked to dedicated components */}
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/virtual-tours" element={<VirtualTours />} />
            <Route path="/community" element={<Community />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* CATCH-ALL "*" ROUTE */}
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