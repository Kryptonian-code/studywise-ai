import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import {
  FileText, Upload, Brain, PenTool, BarChart3, Globe,
  BookOpen, Mail, Shield, Clock, Users, Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "10+ Document Types",
    desc: "SOP, personal statement, research proposal, motivation letter, study plan, scholarship essay, CV, and more.",
  },
  {
    icon: Upload,
    title: "Smart File Ingestion",
    desc: "Upload transcripts, CVs, and guidelines. OCR handles scanned documents automatically.",
  },
  {
    icon: Brain,
    title: "AI-Powered Generation",
    desc: "Multi-stage prompting builds each section intelligently — not just templated text.",
  },
  {
    icon: PenTool,
    title: "Tone Optimizer",
    desc: "Ghanaian professional, academic, scholarship persuasive, visa-safe — rewrite in the tone that fits.",
  },
  {
    icon: BarChart3,
    title: "Document Scoring",
    desc: "Get clarity, structure, specificity, and narrative strength scores with actionable feedback.",
  },
  {
    icon: Globe,
    title: "Anti-Generic Engine",
    desc: "Detects clichés, weak claims, and repetition. Makes your application authentically yours.",
  },
  {
    icon: BookOpen,
    title: "Research Proposal Builder",
    desc: "Structured workflow from title to methodology to ethics — every section guided.",
  },
  {
    icon: Mail,
    title: "Supervisor Emails",
    desc: "Generate professional outreach emails to potential supervisors with tailored content.",
  },
  {
    icon: Shield,
    title: "Version History",
    desc: "Track every draft, compare versions, and never lose your progress.",
  },
  {
    icon: Clock,
    title: "Deadline Tracker",
    desc: "Never miss an application deadline. Organize by university and programme.",
  },
  {
    icon: Users,
    title: "Consultant Workspace",
    desc: "Education agents and SOP writers manage multiple students from one dashboard.",
  },
  {
    icon: Sparkles,
    title: "Guideline Matcher",
    desc: "Upload university guidelines and get document alignment recommendations.",
  },
];

export const FeaturesSection = () => (
  <section id="features" className="py-24 lg:py-32">
    <div className="container">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">Capabilities</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to build a winning application
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          From transcript analysis to polished export — every step is covered.
        </p>
      </ScrollReveal>

      <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((f) => (
          <StaggerItem key={f.title}>
            <div className="group rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <f.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);
