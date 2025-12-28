import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import VolunteerOnboarding from "./pages/VolunteerOnboarding";
import EmergencyRequest from "./pages/EmergencyRequest";
import SmartMatching from "./pages/SmartMatching";
import TaskTracking from "./pages/TaskTracking";
import TrustVerification from "./pages/TrustVerification";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/volunteer" element={<VolunteerOnboarding />} />
            <Route path="/emergency" element={<EmergencyRequest />} />
            <Route path="/matching" element={<SmartMatching />} />
            <Route path="/tasks" element={<TaskTracking />} />
            <Route path="/verification" element={<TrustVerification />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
