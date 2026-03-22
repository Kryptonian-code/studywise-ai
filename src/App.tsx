import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/projects/new" element={<NewProject />} />
          <Route path="/dashboard/documents" element={<Documents />} />
          <Route path="/dashboard/documents/generate" element={<GenerateDocument />} />
          <Route path="/dashboard/uploads" element={<Uploads />} />
          <Route path="/dashboard/scoring" element={<Scoring />} />
          <Route path="/dashboard/deadlines" element={<Deadlines />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
