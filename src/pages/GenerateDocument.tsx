import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2, Copy, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const docTypes = [
  "Statement of Purpose", "Personal Statement", "Research Proposal",
  "Motivation Letter", "Study Plan", "Scholarship Essay",
  "Academic CV", "Professional CV", "Supervisor Email",
  "Recommendation Request", "Gap Explanation Letter", "Visa Statement",
];

const tones = [
  "Standard Formal", "Ghanaian Professional", "African Professional",
  "Scholarship Persuasive", "Research Academic", "Concise Professional", "Visa-safe Conservative",
];

const GenerateDocument = () => {
  const [docType, setDocType] = useState("Statement of Purpose");
  const [tone, setTone] = useState("Standard Formal");
  const [programme, setProgramme] = useState("");
  const [university, setUniversity] = useState("");
  const [country, setCountry] = useState("");
  const [background, setBackground] = useState("");
  const [goals, setGoals] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!programme || !university) {
      toast.error("Please fill in programme and university");
      return;
    }

    setGenerating(true);
    setResult("");

    abortRef.current = new AbortController();

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-document`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            docType, tone, programme, university, country,
            background, goals, additionalContext,
          }),
          signal: abortRef.current.signal,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        toast.error(err.error || "Generation failed");
        setGenerating(false);
        return;
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setResult(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Flush remaining
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setResult(fullText);
            }
          } catch { /* ignore */ }
        }
      }

      toast.success("Document generated!");
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error(e);
        toast.error("Generation failed. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docType.replace(/\s+/g, "_")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    setGenerating(false);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-bold tracking-tight">Generate Document</h1>
        <p className="mt-1 text-muted-foreground">Fill in the details and let AI build your document.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Input form */}
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Document Type</Label>
                <select value={docType} onChange={(e) => setDocType(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {docTypes.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Tone</Label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {tones.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Programme *</Label>
              <Input value={programme} onChange={(e) => setProgramme(e.target.value)} placeholder="e.g. MSc Computer Science" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>University *</Label>
                <Input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. University of Oxford" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United Kingdom" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Academic Background</Label>
              <Textarea value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Degree, institution, key courses, GPA, research experience…" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Career Goals</Label>
              <Textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="What do you want to achieve after completing this programme?" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Additional Context (optional)</Label>
              <Textarea value={additionalContext} onChange={(e) => setAdditionalContext(e.target.value)} placeholder="Work experience, specific faculty, research interests, scholarship name…" rows={2} />
            </div>

            <div className="flex gap-3">
              <Button variant="hero" size="lg" onClick={handleGenerate} disabled={generating}>
                {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate Document</>}
              </Button>
              {generating && (
                <Button variant="outline" size="lg" onClick={handleCancel}>Cancel</Button>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col rounded-xl border border-border/60 bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="font-display text-sm font-semibold">Generated Document</h3>
              {result && (
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleDownload} title="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {result ? (
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {result}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                  {generating ? (
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span>Generating your {docType}…</span>
                    </div>
                  ) : (
                    "Your generated document will appear here."
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GenerateDocument;
