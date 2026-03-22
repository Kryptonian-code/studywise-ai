import { DashboardLayout } from "@/components/DashboardLayout";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FolderOpen, FileText, Clock, BarChart3, Plus,
  ArrowRight, TrendingUp,
} from "lucide-react";

const stats = [
  { label: "Active Projects", value: "3", icon: FolderOpen, color: "text-primary" },
  { label: "Documents Created", value: "12", icon: FileText, color: "text-gold" },
  { label: "Avg. Score", value: "84", icon: BarChart3, color: "text-primary" },
  { label: "Upcoming Deadlines", value: "2", icon: Clock, color: "text-destructive" },
];

const recentDocs = [
  { name: "SOP — MSc Data Science, UCL", status: "Draft", score: 78, updated: "2 hours ago" },
  { name: "Research Proposal — AI in Agriculture", status: "Reviewed", score: 91, updated: "1 day ago" },
  { name: "Motivation Letter — TU Munich", status: "Draft", score: 65, updated: "3 days ago" },
];

const Dashboard = () => (
  <DashboardLayout>
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back. Here's your application overview.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "New Project", desc: "Start a new application", icon: Plus, href: "/dashboard/projects/new" },
          { label: "Generate Document", desc: "Create SOP, CV, or proposal", icon: FileText, href: "/dashboard/documents" },
          { label: "Upload Files", desc: "Add transcripts or CVs", icon: TrendingUp, href: "/dashboard/uploads" },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.href}
            className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <a.icon className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{a.label}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      {/* Recent documents */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Recent Documents</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard/documents">View all</Link>
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Document</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Score</th>
                <th className="px-5 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentDocs.map((d) => (
                <tr key={d.name} className="border-b border-border/50 last:border-0 hover:bg-muted/30">
                  <td className="px-5 py-4 text-sm font-medium">{d.name}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      d.status === "Reviewed" ? "bg-accent text-accent-foreground" : "bg-gold-light text-gold"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm tabular-nums">{d.score}/100</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{d.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Dashboard;
