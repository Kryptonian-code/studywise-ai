import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import Documents from "./pages/Documents";
import GenerateDocument from "./pages/GenerateDocument";
import Uploads from "./pages/Uploads";
import Scoring from "./pages/Scoring";
import Deadlines from "./pages/Deadlines";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            <Route path="/dashboard/projects/new" element={<ProtectedRoute><NewProject /></ProtectedRoute>} />
            <Route path="/dashboard/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/dashboard/documents/generate" element={<ProtectedRoute><GenerateDocument /></ProtectedRoute>} />
            <Route path="/dashboard/uploads" element={<ProtectedRoute><Uploads /></ProtectedRoute>} />
            <Route path="/dashboard/scoring" element={<ProtectedRoute><Scoring /></ProtectedRoute>} />
            <Route path="/dashboard/deadlines" element={<ProtectedRoute><Deadlines /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/dashboard/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
