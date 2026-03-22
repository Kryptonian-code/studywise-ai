import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Save, Loader2, User, Briefcase, GraduationCap, AlertTriangle } from "lucide-react";

const MyProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    nationality: "",
    current_country: "",
    degree: "",
    institution: "",
    graduation_year: "",
    programme_studied: "",
    gpa: "",
    gpa_scale: "",
    study_level: "",
    work_experience: "",
    research_experience: "",
    publications: "",
    skills: "",
    achievements: "",
    career_goals: "",
    personal_statement_notes: "",
    has_study_gap: false,
    study_gap_explanation: "",
    is_career_change: false,
    career_change_context: "",
    low_gpa: false,
    limited_research: false,
  });

  useEffect(() => {
    if (!user) return;
    supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProfile({
            full_name: data.full_name || "",
            nationality: data.nationality || "",
            current_country: data.current_country || "",
            degree: data.degree || "",
            institution: data.institution || "",
            graduation_year: data.graduation_year?.toString() || "",
            programme_studied: data.programme_studied || "",
            gpa: data.gpa || "",
            gpa_scale: data.gpa_scale || "",
            study_level: data.study_level || "",
            work_experience: data.work_experience || "",
            research_experience: data.research_experience || "",
            publications: data.publications || "",
            skills: data.skills || "",
            achievements: data.achievements || "",
            career_goals: data.career_goals || "",
            personal_statement_notes: data.personal_statement_notes || "",
            has_study_gap: data.has_study_gap || false,
            study_gap_explanation: data.study_gap_explanation || "",
            is_career_change: data.is_career_change || false,
            career_change_context: data.career_change_context || "",
            low_gpa: data.low_gpa || false,
            limited_research: data.limited_research || false,
          });
        }
        setLoading(false);
      });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      ...profile,
      graduation_year: profile.graduation_year ? parseInt(profile.graduation_year) : null,
    };

    const { error } = await supabase
      .from("user_profiles")
      .upsert(payload, { onConflict: "user_id" });

    setSaving(false);
    if (error) {
      toast.error("Failed to save profile");
      console.error(error);
    } else {
      toast.success("Profile saved! This data will be used across your projects.");
    }
  };

  const update = (key: string, value: any) => setProfile((p) => ({ ...p, [key]: value }));

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">My Background Profile</h1>
          <p className="mt-1 text-muted-foreground">Save your background once and reuse it across all document generations.</p>
        </div>

        {/* Personal Info */}
        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h2 className="font-display text-base font-semibold">Personal Information</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Full Name</Label><Input value={profile.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Kwame Asante" /></div>
            <div className="space-y-2"><Label>Nationality</Label><Input value={profile.nationality} onChange={(e) => update("nationality", e.target.value)} placeholder="Ghanaian" /></div>
            <div className="space-y-2"><Label>Current Country</Label><Input value={profile.current_country} onChange={(e) => update("current_country", e.target.value)} placeholder="Ghana" /></div>
            <div className="space-y-2">
              <Label>Study Level</Label>
              <select value={profile.study_level} onChange={(e) => update("study_level", e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select</option>
                <option>Bachelor's</option><option>Master's</option><option>PhD</option><option>Postdoc</option>
              </select>
            </div>
          </div>
        </section>

        {/* Academic Background */}
        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h2 className="font-display text-base font-semibold">Academic Background</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Degree</Label><Input value={profile.degree} onChange={(e) => update("degree", e.target.value)} placeholder="BSc Computer Science" /></div>
            <div className="space-y-2"><Label>Institution</Label><Input value={profile.institution} onChange={(e) => update("institution", e.target.value)} placeholder="University of Ghana" /></div>
            <div className="space-y-2"><Label>Programme</Label><Input value={profile.programme_studied} onChange={(e) => update("programme_studied", e.target.value)} placeholder="Computer Science" /></div>
            <div className="space-y-2"><Label>Graduation Year</Label><Input value={profile.graduation_year} onChange={(e) => update("graduation_year", e.target.value)} placeholder="2023" type="number" /></div>
            <div className="space-y-2"><Label>GPA</Label><Input value={profile.gpa} onChange={(e) => update("gpa", e.target.value)} placeholder="3.45" /></div>
            <div className="space-y-2"><Label>GPA Scale</Label><Input value={profile.gpa_scale} onChange={(e) => update("gpa_scale", e.target.value)} placeholder="4.0" /></div>
          </div>
          <div className="mt-4 space-y-2">
            <Label>Research Experience</Label>
            <Textarea value={profile.research_experience} onChange={(e) => update("research_experience", e.target.value)} placeholder="Describe any research projects, theses, or publications…" rows={3} />
          </div>
          <div className="mt-4 space-y-2">
            <Label>Publications</Label>
            <Textarea value={profile.publications} onChange={(e) => update("publications", e.target.value)} placeholder="List any publications, conference papers, posters…" rows={2} />
          </div>
        </section>

        {/* Professional */}
        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gold" />
            <h2 className="font-display text-base font-semibold">Professional Experience</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Work Experience</Label><Textarea value={profile.work_experience} onChange={(e) => update("work_experience", e.target.value)} placeholder="Key roles, responsibilities, achievements…" rows={3} /></div>
            <div className="space-y-2"><Label>Skills</Label><Textarea value={profile.skills} onChange={(e) => update("skills", e.target.value)} placeholder="Technical skills, languages, certifications…" rows={2} /></div>
            <div className="space-y-2"><Label>Key Achievements</Label><Textarea value={profile.achievements} onChange={(e) => update("achievements", e.target.value)} placeholder="Awards, scholarships, notable projects…" rows={2} /></div>
            <div className="space-y-2"><Label>Career Goals</Label><Textarea value={profile.career_goals} onChange={(e) => update("career_goals", e.target.value)} placeholder="What do you want to achieve professionally?" rows={2} /></div>
          </div>
        </section>

        {/* Challenges */}
        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-gold" />
            <h2 className="font-display text-base font-semibold">Profile Challenges (optional)</h2>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">Flagging these helps AI generate better framing in your documents.</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={profile.low_gpa} onChange={(e) => update("low_gpa", e.target.checked)} className="h-4 w-4 rounded border-input" />
              <span className="text-sm">Low GPA / weak grades</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={profile.has_study_gap} onChange={(e) => update("has_study_gap", e.target.checked)} className="h-4 w-4 rounded border-input" />
              <span className="text-sm">Study gap</span>
            </label>
            {profile.has_study_gap && (
              <Textarea value={profile.study_gap_explanation} onChange={(e) => update("study_gap_explanation", e.target.value)} placeholder="Explain the gap briefly…" rows={2} className="ml-7" />
            )}
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={profile.is_career_change} onChange={(e) => update("is_career_change", e.target.checked)} className="h-4 w-4 rounded border-input" />
              <span className="text-sm">Career change</span>
            </label>
            {profile.is_career_change && (
              <Textarea value={profile.career_change_context} onChange={(e) => update("career_change_context", e.target.value)} placeholder="Describe the career switch context…" rows={2} className="ml-7" />
            )}
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={profile.limited_research} onChange={(e) => update("limited_research", e.target.checked)} className="h-4 w-4 rounded border-input" />
              <span className="text-sm">Limited research experience</span>
            </label>
          </div>
        </section>

        <div className="flex gap-3">
          <Button variant="hero" size="lg" onClick={handleSave} disabled={saving}>
            {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</> : <><Save className="h-4 w-4" /> Save Profile</>}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProfile;
