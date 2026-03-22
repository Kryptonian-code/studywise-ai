import { DashboardLayout } from "@/components/DashboardLayout";
import { BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const posts = [
  {
    id: "1",
    title: "How to Write a Winning SOP for UK Universities",
    excerpt: "A step-by-step guide to crafting a Statement of Purpose that stands out to admissions committees.",
    category: "SOP Guide",
    date: "Mar 10, 2026",
  },
  {
    id: "2",
    title: "Choosing a Research Topic for Your Proposal",
    excerpt: "Tips for selecting a research topic that's original, feasible, and aligned with your interests.",
    category: "Research",
    date: "Mar 5, 2026",
  },
  {
    id: "3",
    title: "Top Scholarship Strategies for African Students",
    excerpt: "Maximize your chances of winning fully-funded scholarships with these proven strategies.",
    category: "Scholarships",
    date: "Feb 28, 2026",
  },
  {
    id: "4",
    title: "Visa Interview Preparation: What to Expect",
    excerpt: "Common questions and best practices for your student visa interview.",
    category: "Visa Prep",
    date: "Feb 20, 2026",
  },
];

const Blog = () => (
  <DashboardLayout>
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Resources & Blog</h1>
        <p className="mt-1 text-muted-foreground">Guides, tips, and strategies for your study abroad journey.</p>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="group rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{p.category}</span>
                <h2 className="mt-3 font-display text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">{p.date}</p>
              </div>
              <ArrowRight className="mt-6 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Blog;
