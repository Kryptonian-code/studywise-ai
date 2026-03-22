import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, AlertCircle, ArrowUp, Target, Ban, Zap } from "lucide-react";

const hintIcons: Record<string, any> = {
  measurable_achievement: ArrowUp,
  career_connection: Target,
  specificity: Sparkles,
  generic_phrase: Ban,
  impact: Zap,
  flow: ArrowUp,
  evidence: AlertCircle,
};

const hintColors: Record<string, string> = {
  high: "border-destructive/30 bg-destructive/5",
  medium: "border-gold/30 bg-gold-light",
  low: "border-border/60 bg-card",
};

const WritingHints = () => {
  const [text, setText] = useState("");
  const [docType, setDocType] = useState("Statement of Purpose");
  const [loading, setLoading] = useState(false);
  const [hints, setHints] = useState<any[]>([]);

  const handleAnalyze = async () => {
    if (!text || text.length < 50) { toast.error("Please enter at least 50 characters of text"); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "inline-hints", text, docType },
      });
      if (error) throw error;
      setHints(Array.isArray(data.result) ? data.result : []);
      toast.success(`${Array.isArray(data.result) ? data.result.length : 0} hints found`);
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Writing Hints</h1>
          <p className="mt-1 text-muted-foreground">Paste your document text and get specific, actionable improvement suggestions.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {["Statement of Purpose", "Personal Statement", "Research Proposal", "Motivation Letter", "Scholarship Essay"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Your Text</Label>
              <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your document text here…" rows={14} className="font-mono text-sm" />
            </div>
            <Button variant="hero" size="lg" onClick={handleAnalyze} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</> : <><Sparkles className="h-4 w-4" /> Get Writing Hints</>}
            </Button>
          </div>

          <div className="space-y-3">
            {hints.length > 0 ? (
              hints.map((h, i) => {
                const Icon = hintIcons[h.hint_type] || AlertCircle;
                const colorClass = hintColors[h.priority] || hintColors.low;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${colorClass}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {h.hint_type?.replace(/_/g, " ")}
                      </span>
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        h.priority === "high" ? "bg-destructive/10 text-destructive" : h.priority === "medium" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
                      }`}>
                        {h.priority}
                      </span>
                    </div>
                    {h.line_context && (
                      <p className="mb-2 rounded bg-muted/50 px-2 py-1 text-xs italic text-muted-foreground">
                        "{h.line_context}"
                      </p>
                    )}
                    <p className="text-sm">{h.suggestion}</p>
                  </div>
                );
              })
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
                Paste text and click analyze to get writing hints.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WritingHints;
