import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import Pomodoro from "./pages/Pomodoro";
import NotFound from "./pages/NotFound";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PublicLandingPage from "./components/landing/PublicLandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/landing" element={<Index />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<PublicLandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
