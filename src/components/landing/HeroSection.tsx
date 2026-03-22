import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, Star } from "lucide-react";

export const HeroSection = () => (
  <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--surface-accent)),transparent_70%)]" />

    <div className="container relative">
      <StaggerContainer className="mx-auto max-w-3xl text-center">
        <StaggerItem>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Built for Ghanaian & African Students
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Your study abroad
            <br />
            <span className="text-gradient-brand">application, perfected</span>
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            AI-powered SOP, research proposal, and scholarship document builder.
            Craft authentic, compelling applications that stand out — not generic templates.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/signup">
                Start Building for Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#features">See How It Works</a>
            </Button>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              4.9/5 from 1,200+ users
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              47,000+ documents generated
            </span>
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* Preview mockup */}
      <ScrollReveal delay={0.3} className="mt-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-gold/60" />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 text-xs text-muted-foreground">StudyWise AI — Application Workspace</span>
          </div>
          <div className="grid grid-cols-4 gap-0">
            <div className="col-span-1 border-r border-border bg-muted/30 p-4">
              <div className="space-y-3">
                {["SOP Draft v2", "Research Proposal", "Motivation Letter", "CV"].map((d) => (
                  <div key={d} className="rounded-md bg-background px-3 py-2 text-xs font-medium shadow-sm">{d}</div>
                ))}
              </div>
            </div>
            <div className="col-span-3 p-6">
              <div className="space-y-3">
                <div className="h-4 w-3/4 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted/60" />
                <div className="h-3 w-5/6 rounded bg-muted/60" />
                <div className="h-3 w-4/5 rounded bg-muted/60" />
                <div className="mt-4 h-3 w-2/3 rounded bg-muted/40" />
                <div className="h-3 w-3/4 rounded bg-muted/40" />
              </div>
              <div className="mt-6 flex gap-2">
                <div className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-brand">Score: 87/100</div>
                <div className="rounded-md bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold">Tone: Academic</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
