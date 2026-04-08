import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { popularCities } from "@/lib/data";

export default function PopularCities() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Popular Destinations
            </h2>
            <p className="mt-2 text-muted-foreground">
              Explore farmhouses in the most loved getaway spots.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {popularCities.map((city) => (
            <Link key={city.name} href="/search">
              <div className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer">
                <Image
                  src={city.image}
                  alt={`Farmhouses in ${city.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-semibold text-background">
                    {city.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-background/70" />
                    <span className="text-xs text-background/70">
                      {city.count} properties
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
