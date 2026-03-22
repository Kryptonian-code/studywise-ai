import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Loader2, Lightbulb, Target, FlaskConical, HelpCircle } from "lucide-react";

const ResearchTopic = () => {
  const [topic, setTopic] = useState("");
  const [field, setField] = useState("");
  const [studyLevel, setStudyLevel] = useState("Master's");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleRefine = async () => {
    if (!topic) { toast.error("Please enter a research topic"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "refine-topic", topic, field, studyLevel, context },
      });
      if (error) throw error;
      setResult(data.result);
      toast.success("Topic refined!");
    } catch (e: any) {
      toast.error(e.message || "Failed to refine topic");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Research Topic Refinement</h1>
          <p className="mt-1 text-muted-foreground">Enter a rough idea and get AI-refined research direction.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Your Rough Research Topic *</Label>
              <Textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Using AI to improve farming in Ghana" rows={3} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Field / Discipline</Label>
                <Input value={field} onChange={(e) => setField(e.target.value)} placeholder="e.g. Agricultural Science" />
              </div>
              <div className="space-y-2">
                <Label>Study Level</Label>
                <select value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Postdoc</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Additional Context (optional)</Label>
              <Textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Any specific interests, data availability, region focus…" rows={2} />
            </div>
            <Button variant="hero" size="lg" onClick={handleRefine} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Refining…</> : <><Sparkles className="h-4 w-4" /> Refine Topic</>}
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-gold" />
                    <h3 className="font-display text-sm font-semibold">Improved Title</h3>
                  </div>
                  <p className="text-sm font-medium">{result.improved_title}</p>
                  {result.rationale && <p className="mt-2 text-xs text-muted-foreground">{result.rationale}</p>}
                </div>

                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-sm font-semibold">Objectives</h3>
                  </div>
                  <ul className="space-y-2">
                    {(result.objectives || []).map((obj: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">{i + 1}</span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    <h3 className="font-display text-sm font-semibold">Methodology Direction</h3>
                  </div>
                  <p className="text-sm">{result.methodology_direction}</p>
                </div>

                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-gold" />
                    <h3 className="font-display text-sm font-semibold">Research Questions</h3>
                  </div>
                  <ul className="space-y-2">
                    {(result.research_questions || []).map((q: string, i: number) => (
                      <li key={i} className="text-sm">
                        <span className="font-medium">RQ{i + 1}:</span> {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
                Your refined research topic will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResearchTopic;
