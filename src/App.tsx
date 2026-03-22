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
import ResearchTopic from "./pages/ResearchTopic";
import ProfileStrength from "./pages/ProfileStrength";
import Templates from "./pages/Templates";
import MyProfile from "./pages/MyProfile";
import WritingHints from "./pages/WritingHints";
import Questionnaire from "./pages/Questionnaire";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const P = ({ children }: { children: React.ReactNode }) => <ProtectedRoute>{children}</ProtectedRoute>;

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
            <Route path="/dashboard" element={<P><Dashboard /></P>} />
            <Route path="/dashboard/projects" element={<P><Projects /></P>} />
            <Route path="/dashboard/projects/new" element={<P><NewProject /></P>} />
            <Route path="/dashboard/documents" element={<P><Documents /></P>} />
            <Route path="/dashboard/documents/generate" element={<P><GenerateDocument /></P>} />
            <Route path="/dashboard/uploads" element={<P><Uploads /></P>} />
            <Route path="/dashboard/scoring" element={<P><Scoring /></P>} />
            <Route path="/dashboard/deadlines" element={<P><Deadlines /></P>} />
            <Route path="/dashboard/settings" element={<P><Settings /></P>} />
            <Route path="/dashboard/blog" element={<P><Blog /></P>} />
            <Route path="/dashboard/research-topic" element={<P><ResearchTopic /></P>} />
            <Route path="/dashboard/profile-strength" element={<P><ProfileStrength /></P>} />
            <Route path="/dashboard/templates" element={<P><Templates /></P>} />
            <Route path="/dashboard/my-profile" element={<P><MyProfile /></P>} />
            <Route path="/dashboard/writing-hints" element={<P><WritingHints /></P>} />
            <Route path="/dashboard/questionnaire" element={<P><Questionnaire /></P>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
