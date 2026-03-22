import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";

const docTypes = [
  { name: "Statement of Purpose", emoji: "📝" },
  { name: "Personal Statement", emoji: "💬" },
  { name: "Research Proposal", emoji: "🔬" },
  { name: "Motivation Letter", emoji: "💡" },
  { name: "Study Plan", emoji: "📅" },
  { name: "Scholarship Essay", emoji: "🎓" },
  { name: "Academic CV", emoji: "📄" },
  { name: "Professional CV", emoji: "💼" },
  { name: "Supervisor Email", emoji: "✉️" },
  { name: "Recommendation Request", emoji: "🤝" },
  { name: "Gap Explanation Letter", emoji: "📋" },
  { name: "Visa Statement", emoji: "🛂" },
];

export const DocumentsSection = () => (
  <section id="documents" className="bg-surface-warm py-24 lg:py-32">
    <div className="container">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Document Types</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Every document your application needs
        </h2>
      </ScrollReveal>

      <StaggerContainer className="mt-14 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {docTypes.map((d) => (
          <StaggerItem key={d.name}>
            <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
              <span className="text-2xl">{d.emoji}</span>
              <span className="text-sm font-medium">{d.name}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
