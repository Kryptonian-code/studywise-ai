import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, FolderOpen, ArrowRight, Calendar, Globe } from "lucide-react";

const projects = [
  {
    id: "1",
    name: "MSc Data Science — UCL",
    country: "United Kingdom",
    deadline: "Feb 28, 2026",
    docs: 4,
    progress: 65,
  },
  {
    id: "2",
    name: "PhD Agricultural AI — Wageningen",
    country: "Netherlands",
    deadline: "Mar 15, 2026",
    docs: 3,
    progress: 40,
  },
  {
    id: "3",
    name: "DAAD Scholarship — TU Munich",
    country: "Germany",
    deadline: "Apr 1, 2026",
    docs: 2,
    progress: 20,
  },
];

const Projects = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Application Projects</h1>
          <p className="mt-1 text-muted-foreground">Manage your university applications in one place.</p>
        </div>
        <Button variant="hero" asChild>
          <Link to="/dashboard/projects/new"><Plus className="h-4 w-4" /> New Project</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            to={`/dashboard/projects/${p.id}`}
            className="group rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <FolderOpen className="h-5 w-5 text-accent-foreground" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
            <h3 className="mt-4 font-display font-semibold">{p.name}</h3>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{p.country}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{p.deadline}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{p.docs} documents</span>
                <span className="font-medium">{p.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-hero" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Projects;
