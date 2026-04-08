"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.length > 2) {
      const suggestions = {
        loo: "Showing 34 farmhouses in Lonavala with pools...",
        kar: "28 cozy retreats available in Karjat...",
        ali: "22 beach-side farmhouses in Alibaug...",
        par: "41 party venues with DJ & dance floor...",
        bud: "15 budget-friendly options under INR 10,000...",
      };
      const match = Object.entries(suggestions).find(([k]) =>
        val.toLowerCase().startsWith(k)
      );
      setAiSuggestion(match ? match[1] : "AI is searching across 156 farmhouses...");
    } else {
      setAiSuggestion("");
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-farmhouse.jpg"
          alt="Beautiful farmhouse with lush gardens"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 lg:px-8">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-primary/90 text-primary-foreground border-none px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <Sparkles className="mr-1.5 h-3 w-3" />
            AI-Powered Farmhouse Discovery
          </Badge>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl lg:text-6xl">
            <span className="text-balance">Your Perfect Farmhouse Getaway Awaits</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-background/80 sm:text-lg">
            Discover 156+ verified farmhouses with AI-powered recommendations.
            Book instantly, explore amenities, and create unforgettable memories.
          </p>

          <div className="mt-8 w-full max-w-xl">
            <div className="rounded-2xl border border-background/20 bg-background/10 p-2 backdrop-blur-md">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-background/60" />
                  <Input
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search by city, amenity, or type..."
                    className="w-full border-none bg-transparent pl-10 text-background placeholder:text-background/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Link href="/search">
                  <Button className="w-full gap-2 sm:w-auto rounded-xl">
                    <Sparkles className="h-4 w-4" />
                    AI Search
                  </Button>
                </Link>
              </div>

              {aiSuggestion && (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-primary/20 px-3 py-2 backdrop-blur-sm">
                  <Sparkles className="h-3 w-3 text-primary-foreground shrink-0" />
                  <span className="text-xs text-background/90">{aiSuggestion}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Lonavala", "With Pool", "Pet Friendly", "Under 10K"].map((tag) => (
                <Link href="/search" key={tag}>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer bg-background/15 text-background/90 border-background/20 backdrop-blur-sm hover:bg-background/25 transition-colors"
                  >
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <div>
              <p className="text-2xl font-bold text-background">156+</p>
              <p className="text-xs text-background/60">Verified Farmhouses</p>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div>
              <p className="text-2xl font-bold text-background">12K+</p>
              <p className="text-xs text-background/60">Happy Guests</p>
            </div>
            <div className="h-8 w-px bg-background/20" />
            <div className="flex items-center gap-1">
              <p className="text-2xl font-bold text-background">4.8</p>
              <Star className="h-4 w-4 text-accent fill-accent" />
              <p className="text-xs text-background/60 ml-1">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
