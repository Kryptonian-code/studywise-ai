import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Sparkles, MessageCircle } from "lucide-react";

const Questionnaire = () => {
  const [docType, setDocType] = useState("Statement of Purpose");
  const [studyLevel, setStudyLevel] = useState("Master's");
  const [programmeCategory, setProgrammeCategory] = useState("");
  const [funding, setFunding] = useState("Self-funded");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: { action: "questionnaire", docType, studyLevel, programmeCategory, funding, country },
      });
      if (error) throw error;
      setQuestions(Array.isArray(data.result) ? data.result : []);
      setAnswers({});
      toast.success("Questions generated!");
    } catch (e: any) {
      toast.error(e.message || "Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAnswers = () => {
    const text = questions
      .map((q) => `Q: ${q.question}\nA: ${answers[q.id] || "(not answered)"}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    toast.success("Answers copied — paste into document generator's Additional Context field");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Smart Questionnaire</h1>
          <p className="mt-1 text-muted-foreground">Get adaptive questions tailored to your document type and context. Use your answers to generate better documents.</p>
        </div>

        {/* Config */}
        <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <select value={docType} onChange={(e) => setDocType(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {["Statement of Purpose", "Personal Statement", "Research Proposal", "Motivation Letter", "Scholarship Essay", "Study Plan"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Study Level</Label>
              <select value={studyLevel} onChange={(e) => setStudyLevel(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {["Bachelor's", "Master's", "PhD", "Postdoc"].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Programme Category</Label>
              <Input value={programmeCategory} onChange={(e) => setProgrammeCategory(e.target.value)} placeholder="e.g. STEM, Social Sciences, Arts" />
            </div>
            <div className="space-y-2">
              <Label>Funding Type</Label>
              <select value={funding} onChange={(e) => setFunding(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                {["Self-funded", "Scholarship", "Employer-sponsored", "Government-funded"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Label>Destination Country</Label>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United Kingdom, Germany" />
          </div>
          <Button variant="hero" className="mt-4" onClick={handleGenerate} disabled={loading}>
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate Questions</>}
          </Button>
        </div>

        {/* Questions */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Your Questions ({questions.length})</h2>
              <Button variant="default" size="sm" onClick={handleCopyAnswers}>
                <MessageCircle className="h-4 w-4" /> Copy All Answers
              </Button>
            </div>
            {questions.map((q, i) => (
              <div key={q.id || i} className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{q.category || "General"}</span>
                  {q.required && <span className="text-xs text-destructive">*</span>}
                </div>
                <p className="mb-3 text-sm font-medium">{q.question}</p>
                {q.type === "select" && q.options ? (
                  <select
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select…</option>
                    {q.options.map((o: string) => <option key={o}>{o}</option>)}
                  </select>
                ) : q.type === "textarea" ? (
                  <Textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    placeholder={q.placeholder || "Your answer…"}
                    rows={3}
                  />
                ) : (
                  <Input
                    value={answers[q.id] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                    placeholder={q.placeholder || "Your answer…"}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Questionnaire;
