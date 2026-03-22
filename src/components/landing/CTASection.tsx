import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => (
  <section className="py-24 lg:py-32">
    <div className="container">
      <ScrollReveal>
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-hero p-12 text-center text-primary-foreground shadow-xl lg:p-16">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your dream university is waiting
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg opacity-90">
            Join thousands of Ghanaian and African students who've built successful applications with StudyWise AI.
          </p>
          <Button
            variant="outline"
            size="xl"
            className="mt-8 border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            asChild
          >
            <Link to="/signup">
              Build Your Application Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </ScrollReveal>
    </div>
  </section>
);
