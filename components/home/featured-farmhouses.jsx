"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MapPin,
  Users,
  Heart,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { farmhouses } from "@/lib/data";

export default function FeaturedFarmhouses() {
  const featured = farmhouses.filter((f) => f.featured);

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="mr-1.5 h-3 w-3" />
              AI Recommended
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Featured Farmhouses
            </h2>
            <p className="mt-2 text-muted-foreground max-w-lg">
              Hand-picked by our AI based on ratings, amenities, and guest experiences.
            </p>
          </div>
          <Link href="/search" className="hidden sm:block">
            <Button variant="outline" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((farm) => (
            <Link key={farm.id} href={`/farmhouse/${farm.slug}`}>
              <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={farm.images[0]}
                    alt={farm.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {farm.instantBooking && (
                      <Badge className="bg-accent text-accent-foreground border-none text-[10px] font-semibold">
                        <Zap className="mr-1 h-3 w-3" />
                        Instant Book
                      </Badge>
                    )}
                    {farm.featured && (
                      <Badge className="bg-primary/90 text-primary-foreground border-none text-[10px] font-semibold">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI Pick
                      </Badge>
                    )}
                  </div>
                  <button
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-destructive hover:bg-background"
                    aria-label="Add to wishlist"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div className="flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 backdrop-blur-sm">
                      <Star className="h-3 w-3 text-accent fill-accent" />
                      <span className="text-xs font-semibold text-foreground">
                        {farm.rating.average}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        ({farm.rating.count})
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {farm.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {farm.location.city}, {farm.location.state}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {farm.amenities.slice(0, 4).map((a) => (
                      <Badge
                        key={a.name}
                        variant="secondary"
                        className="text-[10px] font-normal"
                      >
                        {a.name}
                      </Badge>
                    ))}
                    {farm.amenities.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] font-normal"
                      >
                        +{farm.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        {"INR "}
                        {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-muted-foreground"> / 4 hrs</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      Up to {farm.capacity.maxGuests}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/search">
            <Button variant="outline" className="gap-2">
              View All Farmhouses <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
