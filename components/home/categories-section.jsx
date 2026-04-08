"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Waves,
  Trophy,
  Trees,
  Crown,
  PawPrint,
  Fish,
  Music,
  Heart,
} from "lucide-react";
import { categories } from "@/lib/data";

const iconMap = {
  waves: Waves,
  trophy: Trophy,
  trees: Trees,
  crown: Crown,
  "paw-print": PawPrint,
  fish: Fish,
  music: Music,
  heart: Heart,
};

export default function CategoriesSection() {
  return (
    <section id="categories" className="py-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Browse by Category
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Find farmhouses tailored to your needs with AI-curated collections.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Heart;
            return (
              <Link key={cat.name} href="/search">
                <Card className="group cursor-pointer border-border bg-card transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {cat.name}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cat.count} properties
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
