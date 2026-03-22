import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Shield, Loader2, Sparkles, CheckCircle } from "lucide-react";

const ProfileStrength = () => {
  const [lowGpa, setLowGpa] = useState(false);
  const [gpaDetails, setGpaDetails] = useState("");
  const [studyGap, setStudyGap] = useState(false);
  const [gapDetails, setGapDetails] = useState("");
  const [careerChange, setCareerChange] = useState(false);
  const [changeDetails, setChangeDetails] = useState("");
  const [limitedResearch, setLimitedResearch] = useState(false);
  const [background, setBackground] = useState("");
  const [programme, setProgramme] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!lowGpa && !studyGap && !careerChange && !limitedResearch) {
      toast.error("Please select at least one challenge");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: {
          action: "profile-strength",
          lowGpa, gpaDetails, studyGap, gapDetails,
          careerChange, changeDetails, limitedResearch,
          background, programme,
        },
      });
      if (error) throw error;
      setResult(data.result);
      toast.success("Analysis complete!");
    } catch (e: any) {
      toast.error(e.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const ChallengeToggle = ({ label, checked, onChange, details, onDetailsChange, detailsPlaceholder }: any) => (
    <div className="space-y-2">
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border/60 bg-card p-4 transition-colors hover:bg-muted/30">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded border-input" />
        <span className="text-sm font-medium">{label}</span>
      </label>
      {checked && (
        <Input value={details} onChange={(e) => onDetailsChange(e.target.value)} placeholder={detailsPlaceholder} className="ml-7" />
      )}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Profile Strength Helper</h1>
          <p className="mt-1 text-muted-foreground">Get professional framing suggestions for challenging aspects of your profile.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-medium">Select your challenges:</p>
            <ChallengeToggle label="Low GPA / Weak Grades" checked={lowGpa} onChange={setLowGpa} details={gpaDetails} onDetailsChange={setGpaDetails} detailsPlaceholder="e.g. 2.8/4.0, weak in first year" />
            <ChallengeToggle label="Study Gap" checked={studyGap} onChange={setStudyGap} details={gapDetails} onDetailsChange={setGapDetails} detailsPlaceholder="e.g. 2 year gap after bachelor's" />
            <ChallengeToggle label="Career Change" checked={careerChange} onChange={setCareerChange} details={changeDetails} onDetailsChange={setChangeDetails} detailsPlaceholder="e.g. switching from banking to public health" />
            <ChallengeToggle label="Limited Research Experience" checked={limitedResearch} onChange={setLimitedResearch} details="" onDetailsChange={() => {}} detailsPlaceholder="" />

            <div className="space-y-2">
              <Label>Your Background</Label>
              <Textarea value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Brief description of your academic and professional background" rows={2} />
            </div>
            <div className="space-y-2">
              <Label>Target Programme</Label>
              <Input value={programme} onChange={(e) => setProgramme(e.target.value)} placeholder="e.g. MSc Public Health, University of Leeds" />
            </div>

            <Button variant="hero" size="lg" onClick={handleAnalyze} disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Analyzing…</> : <><Shield className="h-4 w-4" /> Analyze Profile</>}
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <>
                {result.overall_strategy && (
                  <div className="rounded-xl border border-primary/20 bg-accent p-5">
                    <h3 className="font-display text-sm font-semibold text-accent-foreground">Overall Strategy</h3>
                    <p className="mt-2 text-sm">{result.overall_strategy}</p>
                  </div>
                )}

                {result.strengths_to_highlight && (
                  <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                    <h3 className="mb-3 font-display text-sm font-semibold">Strengths to Highlight</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.strengths_to_highlight.map((s: string, i: number) => (
                        <span key={i} className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                          <CheckCircle className="h-3 w-3" /> {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(result.framing_suggestions || []).map((s: any, i: number) => (
                  <div key={i} className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                    <h3 className="font-display text-sm font-semibold">{s.area}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.suggestion}</p>
                    {s.example_phrase && (
                      <div className="mt-3 rounded-lg bg-muted/50 p-3">
                        <p className="text-xs font-medium text-muted-foreground">Example phrase:</p>
                        <p className="mt-1 text-sm italic">"{s.example_phrase}"</p>
                      </div>
                    )}
                  </div>
                ))}

                {result.narrative_approach && (
                  <div className="rounded-xl border border-gold/20 bg-gold-light p-5">
                    <h3 className="font-display text-sm font-semibold">Narrative Approach</h3>
                    <p className="mt-2 text-sm">{result.narrative_approach}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
                Your profile analysis will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfileStrength;
