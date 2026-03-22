import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

const docTypes = [
  "Statement of Purpose", "Personal Statement", "Research Proposal",
  "Motivation Letter", "Study Plan", "Scholarship Essay",
  "Academic CV", "Supervisor Email", "Recommendation Request",
  "Gap Explanation Letter", "Visa Statement",
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
  const [background, setBackground] = useState("");
  const [goals, setGoals] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!programme || !university) { toast.error("Please fill in programme and university"); return; }
    setGenerating(true);
    // Simulate AI generation — will be replaced with edge function call
    await new Promise((r) => setTimeout(r, 2500));
    setResult(
      `[AI-Generated ${docType}]\n\nDear Admissions Committee,\n\nI am writing to express my strong interest in the ${programme} programme at ${university}. ${background ? `My background in ${background} has prepared me uniquely for this opportunity.` : ''}\n\n${goals ? `My career aspirations include ${goals}, which align closely with the research focus of your department.` : 'My career goals are closely aligned with the strengths of your programme.'}\n\nThis document was generated in ${tone} tone. In the full version, this will be a comprehensive, multi-section document built through structured AI workflows.\n\n[End of preview — connect AI provider to generate full documents]`
    );
    setGenerating(false);
    toast.success("Document generated!");
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

            <div className="space-y-2">
              <Label>University *</Label>
              <Input value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. University of Oxford" />
            </div>

            <div className="space-y-2">
              <Label>Your Academic Background</Label>
              <Textarea value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Briefly describe your academic background, degree, key courses…" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Career Goals</Label>
              <Textarea value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="What do you want to achieve after completing this programme?" rows={3} />
            </div>

            <Button variant="hero" size="lg" onClick={handleGenerate} disabled={generating}>
              {generating ? <><Loader2 className="h-4 w-4 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4" /> Generate Document</>}
            </Button>
          </div>

          {/* Output */}
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-display text-base font-semibold">Generated Document</h3>
            {result ? (
              <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {result}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Your generated document will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GenerateDocument;
