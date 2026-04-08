import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 mb-6">
            <Leaf className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance max-w-xl">
            Own a Farmhouse? List It on FunFarm
          </h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md leading-relaxed">
            Join 89+ farmhouse owners earning through our platform. Get AI-powered
            insights, automated booking management, and reach thousands of guests.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/admin">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2"
              >
                List Your Farmhouse
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/search">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Explore as Guest
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
