
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProfessionalProvider } from "@/context/ProfessionalContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfessionalProfile from "./components/ProfessionalProfile";
import ServicesList from "./components/ServicesList";
import ServiceDetail from "./components/ServiceDetail";
import AppointmentForm from "./components/AppointmentForm";
import ProfessionalDashboard from "./components/ProfessionalDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProfessionalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pro/:profId" element={<ProfessionalProfile />} />
            <Route path="/pro/:profId/services" element={<ServicesList />} />
            <Route path="/pro/:profId/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/pro/:profId/appointment" element={<AppointmentForm />} />
            <Route path="/pro/:profId/dashboard" element={<ProfessionalDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProfessionalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
