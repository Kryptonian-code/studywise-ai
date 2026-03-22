import { DashboardLayout } from "@/components/DashboardLayout";
import { templates } from "@/data/templates";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Globe, ArrowRight, BookOpen } from "lucide-react";
import { useState } from "react";

const Templates = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const active = templates.find((t) => t.id === selected);

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Template Library</h1>
          <p className="mt-1 text-muted-foreground">Structural templates for different document types and countries.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Template list */}
          <div className="space-y-3 lg:col-span-1">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  selected === t.id
                    ? "border-primary bg-accent shadow-sm"
                    : "border-border/60 bg-card hover:shadow-md"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" /> {t.country}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Template detail */}
          <div className="lg:col-span-2">
            {active ? (
              <div className="space-y-6">
                <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold">{active.name}</h2>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-3.5 w-3.5" /> {active.country} • {active.docType}
                      </p>
                    </div>
                    <Button variant="hero" size="sm" asChild>
                      <Link to={`/dashboard/documents/generate?type=${encodeURIComponent(active.docType)}`}>
                        Use Template <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <h3 className="mb-3 mt-6 font-display text-sm font-semibold">Structure</h3>
                  <div className="space-y-2">
                    {active.sections.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/30 p-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{s.name}</p>
                            <span className="text-xs text-muted-foreground">{s.wordCount} words</span>
                          </div>
                          <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-gold/20 bg-gold-light p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gold" />
                    <h3 className="font-display text-sm font-semibold">Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {active.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-sm text-muted-foreground">
                Select a template to view its structure and tips.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
