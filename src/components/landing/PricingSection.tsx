import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Get started with basics",
    features: [
      "1 application project",
      "3 AI generations/month",
      "SOP & Personal Statement",
      "Basic tone options",
      "Export to PDF",
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Starter",
    price: "$12",
    period: "/month",
    desc: "For serious applicants",
    features: [
      "5 application projects",
      "30 AI generations/month",
      "All document types",
      "All tone modes",
      "Document scoring",
      "Version history",
      "Deadline tracker",
    ],
    cta: "Get Starter",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Premium",
    price: "$29",
    period: "/month",
    desc: "Maximum power",
    features: [
      "Unlimited projects",
      "Unlimited AI generations",
      "All document types",
      "OCR file scanning",
      "Guideline matching",
      "Supervisor email generator",
      "Visa interview prep",
      "Priority support",
    ],
    cta: "Go Premium",
    variant: "default" as const,
    popular: false,
  },
  {
    name: "Consultant",
    price: "$79",
    period: "/month",
    desc: "For education agents",
    features: [
      "Everything in Premium",
      "Manage 25 student profiles",
      "Consultant workspace",
      "Comment on documents",
      "Bulk generation",
      "Analytics dashboard",
      "White-label exports",
    ],
    cta: "Start Consulting",
    variant: "gold" as const,
    popular: false,
  },
];

export const PricingSection = () => (
  <section id="pricing" className="py-24 lg:py-32">
    <div className="container">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Pricing</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Plans that grow with your ambitions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Start free. Upgrade when you need more power.
        </p>
      </ScrollReveal>

      <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <StaggerItem key={p.name}>
            <div
              className={`relative flex flex-col rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-lg ${
                p.popular ? "border-primary bg-card shadow-md" : "border-border/60 bg-card"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-hero px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={p.variant} className="mt-8 w-full" asChild>
                <Link to="/signup">{p.cta}</Link>
              </Button>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
