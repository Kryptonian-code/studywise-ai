import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Clock, Plus, AlertTriangle, CheckCircle } from "lucide-react";

const deadlines = [
  { id: "1", name: "UCL — MSc Data Science", date: "Feb 28, 2026", daysLeft: 343, status: "upcoming" },
  { id: "2", name: "Wageningen — PhD Application", date: "Mar 15, 2026", daysLeft: 358, status: "upcoming" },
  { id: "3", name: "DAAD Scholarship", date: "Apr 1, 2026", daysLeft: 375, status: "upcoming" },
  { id: "4", name: "Commonwealth Scholarship", date: "Dec 15, 2025", daysLeft: -97, status: "passed" },
];

const Deadlines = () => (
  <DashboardLayout>
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Deadline Tracker</h1>
          <p className="mt-1 text-muted-foreground">Never miss an application deadline.</p>
        </div>
        <Button variant="hero" size="sm"><Plus className="h-4 w-4" /> Add Deadline</Button>
      </div>

      <div className="space-y-3">
        {deadlines.map((d) => (
          <div
            key={d.id}
            className={`flex items-center gap-4 rounded-xl border p-5 shadow-sm ${
              d.status === "passed" ? "border-border/40 bg-muted/30 opacity-60" : "border-border/60 bg-card"
            }`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              d.status === "passed" ? "bg-muted" : d.daysLeft < 30 ? "bg-destructive/10" : "bg-accent"
            }`}>
              {d.status === "passed" ? (
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              ) : d.daysLeft < 30 ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : (
                <Clock className="h-5 w-5 text-accent-foreground" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.date}</p>
            </div>
            {d.status === "upcoming" && (
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                d.daysLeft < 30 ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"
              }`}>
                {d.daysLeft} days left
              </span>
            )}
            {d.status === "passed" && (
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Passed</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Deadlines;
