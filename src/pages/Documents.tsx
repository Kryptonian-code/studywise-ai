import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const docTypes = [
  "Statement of Purpose", "Personal Statement", "Research Proposal",
  "Motivation Letter", "Study Plan", "Scholarship Essay",
  "Academic CV", "Professional CV", "Supervisor Email",
  "Recommendation Request", "Gap Explanation", "Visa Statement",
];

const Documents = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Documents</h1>
          <p className="mt-1 text-muted-foreground">Generate and manage your application documents.</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-10" placeholder="Search documents…" />
      </div>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Create New Document</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {docTypes.map((d) => (
            <Link
              key={d}
              to="/dashboard/documents/generate"
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <FileText className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium">{d}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Documents;
