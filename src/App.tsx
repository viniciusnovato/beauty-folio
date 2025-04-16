import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfessionalProvider } from "@/context/ProfessionalContext";
import ProfessionalProfile from "./components/ProfessionalProfile";
import ServicesList from "./components/ServicesList";
import ServiceDetail from "./components/ServiceDetail";
import AppointmentForm from "./components/AppointmentForm";
import ProfessionalDashboard from "./components/ProfessionalDashboard";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ProfessionalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard/*"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/pro/:profId" element={<ProfessionalProfile />} />
                <Route path="/pro/:profId/services" element={<ServicesList />} />
                <Route path="/pro/:profId/service/:serviceId" element={<ServiceDetail />} />
                <Route path="/pro/:profId/appointment" element={<AppointmentForm />} />
                <Route path="/pro/:profId/dashboard" element={<ProfessionalDashboard />} />
                <Route path="*" element={<div>Página não encontrada</div>} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </ProfessionalProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
