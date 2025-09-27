import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import SubjectTopics from "./pages/SubjectTopics";
import TopicPage from "./pages/TopicPage";
import Pomodoro from "./pages/Pomodoro";
import NotFound from "./pages/NotFound";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PublicLandingPage from "./components/landing/PublicLandingPage";
import Dashboard from "./components/dashboard/Dashboard";
import { Layout } from "lucide-react";
import Header from "./components/layout/Header";
import DashboardPage from "./pages/DashboardPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/landing" element={<Index />} />

              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects/:subjectId" element={<SubjectTopics />} />
              <Route
                path="/topic/:subjectId/:topicId"
                element={<TopicPage />}
              />
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
