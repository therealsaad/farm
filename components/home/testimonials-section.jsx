import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            What Our Guests Say
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Real experiences from real guests, verified by our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="border-border bg-card"
            >
              <CardContent className="p-6">
                <Quote className="h-6 w-6 text-primary/30 mb-3" />
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {t.comment}
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < t.rating
                          ? "text-accent fill-accent"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {t.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.farmhouse} &middot; {t.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
