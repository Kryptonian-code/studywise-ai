import { DashboardLayout } from "@/components/DashboardLayout";
import { BarChart3 } from "lucide-react";

const categories = [
  { label: "Clarity", score: 87 },
  { label: "Structure", score: 82 },
  { label: "Specificity", score: 74 },
  { label: "Coherence", score: 90 },
  { label: "Tone", score: 85 },
  { label: "Programme Relevance", score: 78 },
  { label: "Narrative Strength", score: 71 },
];

const Scoring = () => (
  <DashboardLayout>
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Document Scoring</h1>
        <p className="mt-1 text-muted-foreground">AI-powered quality analysis of your documents.</p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <BarChart3 className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Overall Score</h2>
            <p className="text-sm text-muted-foreground">SOP — MSc Data Science, UCL</p>
          </div>
          <div className="ml-auto">
            <span className="font-display text-4xl font-bold text-brand">81</span>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((c) => (
            <div key={c.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span>{c.label}</span>
                <span className="tabular-nums font-medium">{c.score}/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className={`h-full rounded-full ${c.score >= 85 ? "bg-gradient-hero" : c.score >= 70 ? "bg-gold" : "bg-destructive/70"}`}
                  style={{ width: `${c.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg bg-muted/50 p-4">
          <h3 className="text-sm font-semibold">AI Suggestions</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Add more specific examples from your academic experience</li>
            <li>• Strengthen the connection between your goals and the programme structure</li>
            <li>• The narrative flow between paragraphs 2 and 3 could be smoother</li>
            <li>• Consider mentioning specific faculty or research groups</li>
          </ul>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Scoring;
