import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-16">
    <div className="container grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          StudyWise AI
        </Link>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          AI-powered study abroad application builder for Ghanaian and African students.
        </p>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Product</h4>
        <ul className="mt-4 space-y-2 text-sm">
          {["Features", "Pricing", "Documents", "Blog"].map((l) => (
            <li key={l}><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resources</h4>
        <ul className="mt-4 space-y-2 text-sm">
          {["SOP Guide", "Research Tips", "Scholarship Tips", "Visa Prep"].map((l) => (
            <li key={l}><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Company</h4>
        <ul className="mt-4 space-y-2 text-sm">
          {["About", "Contact", "Terms", "Privacy"].map((l) => (
            <li key={l}><a href="#" className="text-muted-foreground transition-colors hover:text-foreground">{l}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="container mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} StudyWise AI. All rights reserved.
    </div>
  </footer>
);
