import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const countries = [
  "United Kingdom", "Germany", "Netherlands", "Canada", "United States",
  "Australia", "France", "Sweden", "China", "Japan", "South Korea", "Other",
];

const studyLevels = ["Bachelor's", "Master's", "PhD", "Postdoc", "Professional Certificate"];

const NewProject = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [programme, setProgramme] = useState("");
  const [level, setLevel] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !country) { toast.error("Please fill in required fields"); return; }
    toast.success("Project created!");
    navigate("/dashboard/projects");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">New Application Project</h1>
          <p className="mt-1 text-muted-foreground">Set up your application workspace.</p>
        </div>

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. MSc Computer Science — Oxford" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Destination Country *</Label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Select country</option>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Study Level</Label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select level</option>
                {studyLevels.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="university">University</Label>
            <Input id="university" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. University of Oxford" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="programme">Programme</Label>
            <Input id="programme" value={programme} onChange={(e) => setProgramme(e.target.value)} placeholder="e.g. MSc Advanced Computer Science" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="hero" size="lg" type="submit">Create Project</Button>
            <Button variant="outline" size="lg" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewProject;
