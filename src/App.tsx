// src/App.tsx (MODIFIED FILE)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { FloatingChatbot, FloatingActionButtons } from "@/components/ui/floating-elements";
import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AIPlanner from "./pages/AIPlanner";
import Destinations from "./pages/Destinations";
import Marketplace from "./pages/Marketplace";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Community from "./pages/Community";
import Analytics from "./pages/Analytics";
import VirtualTours from "./pages/VirtualTours";
import Auth from './pages/Auth'; // NEW IMPORT

const queryClient = new QueryClient();

// NEW: Auth Wrapper Component (Protects routes)
const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any>(undefined); // undefined = loading, null = no session
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Fetch initial session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        if (!session && window.location.pathname !== '/auth') {
          navigate('/auth');
        }
      }
    });

    // Listen for auth changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session);
          if (!session && window.location.pathname !== '/auth') {
            navigate('/auth');
          } else if (session && window.location.pathname === '/auth') {
            navigate('/');
          }
        }
      }
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (session === undefined) {
    // Show a loading screen while checking auth status
    return (
        <div className="pt-24 min-h-screen flex items-center justify-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-nature" />
            <p className="ml-3 text-lg">Checking authentication status...</p>
        </div>
    );
  }

  // If we have a session OR we are on the Auth page, render the content
  if (session || window.location.pathname === '/auth') {
    return <>{children}</>;
  }

  // Fallback, should be caught by the navigate('/auth') above
  return null; 
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* PUBLIC ROUTE: The Authentication Page */}
            <Route path="/auth" element={<Auth />} />

            {/* PROTECTED ROUTES: All main application pages */}
            <Route path="/" element={<AuthWrapper><HomePage /></AuthWrapper>} />
            <Route path="/destinations" element={<AuthWrapper><Destinations /></AuthWrapper>} />
            <Route path="/ai-planner" element={<AuthWrapper><AIPlanner /></AuthWrapper>} />
            <Route path="/marketplace" element={<AuthWrapper><Marketplace /></AuthWrapper>} />
            <Route path="/virtual-tours" element={<AuthWrapper><VirtualTours /></AuthWrapper>} />
            <Route path="/community" element={<AuthWrapper><Community /></AuthWrapper>} />
            <Route path="/analytics" element={<AuthWrapper><Analytics /></AuthWrapper>} />
            <Route path="/about" element={<AuthWrapper><AboutUs /></AuthWrapper>} />
            <Route path="/contact" element={<AuthWrapper><Contact /></AuthWrapper>} />
            
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