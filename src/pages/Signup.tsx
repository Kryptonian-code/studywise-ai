import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const { session, loading: authLoading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!authLoading && session) return <Navigate to="/dashboard" replace />;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName }, emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Check your email to verify.");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16">
        <Link to="/" className="mb-12 flex items-center gap-2 font-display text-xl font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          StudyWise AI
        </Link>

        <h1 className="font-display text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-2 text-muted-foreground">Start building your study abroad application today.</p>

        <form onSubmit={handleSignup} className="mt-8 max-w-sm space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Kwame Asante" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" required />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button variant="hero" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"} <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>

      <div className="hidden bg-gradient-hero lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div className="max-w-md text-center text-primary-foreground">
          <GraduationCap className="mx-auto h-16 w-16 opacity-80" />
          <h2 className="mt-6 font-display text-2xl font-bold">Join 1,200+ students</h2>
          <p className="mt-3 text-lg opacity-80">Craft authentic, compelling applications that get accepted.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
