"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Users,
  Heart,
  Share2,
  Phone,
  Mail,
  Clock,
  Shield,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  X as XIcon,
  Bot,
  Calendar,
  IndianRupee,
  Waves,
  Trophy,
  Trees,
  Car,
  Wifi,
  ChefHat,
  Music,
  Monitor,
  Sun,
  PawPrint,
} from "lucide-react";
import { farmhouses, testimonials } from "@/lib/data";

const amenityIconMap = {
  waves: Waves,
  trophy: Trophy,
  trees: Trees,
  car: Car,
  wifi: Wifi,
  "chef-hat": ChefHat,
  music: Music,
  monitor: Monitor,
  sun: Sun,
  heart: PawPrint,
};

export default function FarmhouseDetailPage({ params }) {
  const { slug } = use(params);
  const farm = farmhouses.find((f) => f.slug === slug) || farmhouses[0];
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const nextImage = () =>
    setCurrentImage((prev) => (prev + 1) % farm.images.length);
  const prevImage = () =>
    setCurrentImage(
      (prev) => (prev - 1 + farm.images.length) % farm.images.length
    );

  return (
    <main>
      <Navbar />
      <div className="pt-16">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
            <Image
              src={farm.images[currentImage]}
              alt={`${farm.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {farm.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentImage
                      ? "w-6 bg-background"
                      : "w-2 bg-background/50"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 right-4 hidden gap-2 sm:flex">
            {farm.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`relative h-16 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                  i === currentImage
                    ? "border-background shadow-lg"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {farm.instantBooking && (
                      <Badge className="bg-accent text-accent-foreground border-none text-xs">
                        <Zap className="mr-1 h-3 w-3" />
                        Instant Booking
                      </Badge>
                    )}
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      <Sparkles className="mr-1 h-3 w-3" />
                      AI Verified
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {farm.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="font-semibold text-foreground">
                        {farm.rating.average}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({farm.rating.count} reviews)
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {farm.location.address}, {farm.location.city}
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {farm.capacity.minGuests}-{farm.capacity.maxGuests} guests
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={isFavorited ? "text-destructive" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* AI Summary */}
              <Card className="mt-6 border-primary/20 bg-primary/5">
                <CardContent className="p-4 flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary mb-1">
                      AI Summary
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {farm.description} This property has a {farm.rating.average}-star rating from {farm.rating.count} verified guests and has hosted {farm.totalBookings}+ events. Best for{" "}
                      {farm.capacity.maxGuests > 40 ? "large groups and celebrations" : "intimate gatherings and couples"}.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="food">Food</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        About this Farmhouse
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {farm.description}
                      </p>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        Location
                      </h3>
                      <div className="rounded-xl bg-muted h-64 flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p className="font-medium">{farm.location.address}</p>
                          <p className="text-sm">{farm.location.city}, {farm.location.state} - {farm.location.pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="mt-6">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {farm.amenities.map((a) => {
                      const Icon = amenityIconMap[a.icon] || Check;
                      return (
                        <div
                          key={a.name}
                          className="flex items-center gap-3 rounded-lg border border-border p-3"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {a.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Hourly Rates
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {Object.entries(farm.pricing.hourly).map(([key, val]) => (
                        <Card key={key} className="border-border">
                          <CardContent className="p-4 text-center">
                            <p className="text-xs text-muted-foreground uppercase">
                              {key}
                            </p>
                            <p className="mt-1 text-lg font-bold text-foreground">
                              INR {val.toLocaleString("en-IN")}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Full Day (24 hours)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Best value for extended stays
                          </p>
                        </div>
                        <p className="text-xl font-bold text-primary">
                          INR {farm.pricing.fullDay.toLocaleString("en-IN")}
                        </p>
                      </CardContent>
                    </Card>
                    <p className="text-xs text-muted-foreground">
                      Weekend rates are {((farm.pricing.weekendMultiplier - 1) * 100).toFixed(0)}% higher.
                      Seasonal rates may apply.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="food" className="mt-6">
                  <div className="space-y-3">
                    {farm.foodOptions.map((food) => (
                      <Card key={food.meal} className="border-border">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">
                              {food.meal}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {food.menu}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">
                              INR {food.price}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per person
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rules" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Check-in
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {farm.rules.checkInTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Check-out
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {farm.rules.checkOutTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <Shield className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Security Deposit
                          </p>
                          <p className="text-sm text-muted-foreground">
                            INR {farm.rules.securityDeposit.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Pets", allowed: farm.rules.petsAllowed },
                        { label: "Alcohol", allowed: farm.rules.alcoholAllowed },
                        { label: "Smoking", allowed: farm.rules.smokingAllowed },
                      ].map((rule) => (
                        <div
                          key={rule.label}
                          className={`flex items-center gap-2 rounded-lg p-3 ${
                            rule.allowed
                              ? "bg-primary/5 text-primary"
                              : "bg-destructive/5 text-destructive"
                          }`}
                        >
                          {rule.allowed ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <XIcon className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">
                            {rule.label} {rule.allowed ? "Allowed" : "Not Allowed"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Cancellation Policy
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {farm.rules.cancellationPolicy}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {testimonials.slice(0, 3).map((t) => (
                      <Card key={t.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {t.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                {t.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < t.rating
                                      ? "text-accent fill-accent"
                                      : "text-border"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {t.comment}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Booking Sidebar */}
            <aside className="w-full lg:w-96 shrink-0">
              <div className="sticky top-24">
                <Card className="border-border shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">
                        INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / 4 hours
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-border p-3">
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                            Date
                          </p>
                          <p className="text-sm font-medium text-foreground mt-1">
                            Select date
                          </p>
                        </div>
                        <div className="rounded-lg border border-border p-3">
                          <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                            Duration
                          </p>
                          <p className="text-sm font-medium text-foreground mt-1">
                            4 hours
                          </p>
                        </div>
                      </div>
                      <div className="rounded-lg border border-border p-3">
                        <p className="text-[10px] uppercase text-muted-foreground font-semibold">
                          Guests
                        </p>
                        <p className="text-sm font-medium text-foreground mt-1">
                          {farm.capacity.minGuests} guests
                        </p>
                      </div>
                    </div>

                    <Link href={`/booking/${farm.slug}`}>
                      <Button className="w-full gap-2" size="lg">
                        <Calendar className="h-4 w-4" />
                        Book Now
                      </Button>
                    </Link>

                    <Separator className="my-4" />

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Base price (4 hrs)
                        </span>
                        <span className="font-medium text-foreground">
                          INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Service fee
                        </span>
                        <span className="font-medium text-foreground">
                          INR {Math.round(farm.pricing.hourly["4hr"] * 0.05).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-foreground">Total</span>
                        <span className="text-foreground">
                          INR {Math.round(farm.pricing.hourly["4hr"] * 1.05).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-4 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {farm.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Hosted by FunFarm Verified Owner
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Member since {new Date(farm.createdAt).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Phone className="h-3 w-3" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
