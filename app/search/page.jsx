"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Search,
  MapPin,
  Star,
  Heart,
  Users,
  Zap,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Bot,
  ArrowUpDown,
} from "lucide-react";
import { farmhouses } from "@/lib/data";

const amenityFilters = [
  "Swimming Pool",
  "Garden",
  "Sports Turf",
  "BBQ Area",
  "WiFi",
  "Kitchen",
  "Music System",
  "Projector",
  "Parking",
];

const cityFilters = ["Lonavala", "Karjat", "Igatpuri", "Alibaug", "Panchgani", "Nashik"];

function FilterSidebar({ priceRange, setPriceRange, selectedCity, setSelectedCity, selectedAmenities, toggleAmenity, guestCount, setGuestCount }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Location</h3>
        <div className="flex flex-col gap-2">
          {cityFilters.map((city) => (
            <label key={city} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCity === city}
                onCheckedChange={() => setSelectedCity(selectedCity === city ? "" : city)}
              />
              <span className="text-sm text-muted-foreground">{city}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Price Range (4hr)
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={20000}
          min={0}
          step={1000}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>INR {priceRange[0].toLocaleString("en-IN")}</span>
          <span>INR {priceRange[1].toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Guests</h3>
        <Select value={guestCount} onValueChange={setGuestCount}>
          <SelectTrigger>
            <SelectValue placeholder="Select guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="10">Up to 10</SelectItem>
            <SelectItem value="25">Up to 25</SelectItem>
            <SelectItem value="50">Up to 50</SelectItem>
            <SelectItem value="100">Up to 100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Amenities</h3>
        <div className="flex flex-col gap-2">
          {amenityFilters.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm text-muted-foreground">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [guestCount, setGuestCount] = useState("any");
  const [aiInsight, setAiInsight] = useState(
    "Based on current trends, Lonavala farmhouses with pools are most booked this month. Weekend prices are 25-40% higher."
  );

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const filtered = useMemo(() => {
    let results = [...farmhouses];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.location.city.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.amenities.some((a) => a.name.toLowerCase().includes(q))
      );
    }

    if (selectedCity) {
      results = results.filter((f) => f.location.city === selectedCity);
    }

    results = results.filter(
      (f) =>
        f.pricing.hourly["4hr"] >= priceRange[0] &&
        f.pricing.hourly["4hr"] <= priceRange[1]
    );

    if (guestCount !== "any") {
      const max = parseInt(guestCount);
      results = results.filter((f) => f.capacity.maxGuests <= max);
    }

    if (selectedAmenities.length > 0) {
      results = results.filter((f) =>
        selectedAmenities.every((sa) =>
          f.amenities.some((a) => a.name === sa)
        )
      );
    }

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.pricing.hourly["4hr"] - b.pricing.hourly["4hr"]);
        break;
      case "price-high":
        results.sort((a, b) => b.pricing.hourly["4hr"] - a.pricing.hourly["4hr"]);
        break;
      case "rating":
        results.sort((a, b) => b.rating.average - a.rating.average);
        break;
      case "popular":
        results.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
    }

    return results;
  }, [searchQuery, selectedCity, priceRange, guestCount, selectedAmenities, sortBy]);

  return (
    <main>
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* AI Insight Bar */}
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-primary/5 border border-primary/10 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">AI Insight:</span> {aiInsight}
            </p>
          </div>

          {/* Search Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search farmhouses, cities, amenities..."
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      selectedCity={selectedCity}
                      setSelectedCity={setSelectedCity}
                      selectedAmenities={selectedAmenities}
                      toggleAmenity={toggleAmenity}
                      guestCount={guestCount}
                      setGuestCount={setGuestCount}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <ArrowUpDown className="mr-2 h-3 w-3" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden sm:flex items-center border border-border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h2>
                <FilterSidebar
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  selectedAmenities={selectedAmenities}
                  toggleAmenity={toggleAmenity}
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} farmhouse{filtered.length !== 1 ? "s" : ""} found
                {selectedCity ? ` in ${selectedCity}` : ""}
              </p>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-6 sm:grid-cols-2"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((farm) => (
                  <Link key={farm.id} href={`/farmhouse/${farm.slug}`}>
                    <Card
                      className={`group overflow-hidden border-border bg-card transition-all hover:shadow-lg cursor-pointer ${
                        viewMode === "list" ? "flex flex-row" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "list" ? "w-48 shrink-0" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={farm.images[0]}
                          alt={farm.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {farm.instantBooking && (
                            <Badge className="bg-accent text-accent-foreground border-none text-[10px]">
                              <Zap className="mr-1 h-3 w-3" />
                              Instant
                            </Badge>
                          )}
                          {farm.featured && (
                            <Badge className="bg-primary/90 text-primary-foreground border-none text-[10px]">
                              <Sparkles className="mr-1 h-3 w-3" />
                              AI Pick
                            </Badge>
                          )}
                        </div>
                        <button
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm"
                          aria-label="Add to wishlist"
                          onClick={(e) => e.preventDefault()}
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>

                      <CardContent className="p-4 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {farm.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                            <span className="text-sm font-medium text-foreground">
                              {farm.rating.average}
                            </span>
                          </div>
                        </div>

                        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {farm.location.city}, {farm.location.state}
                        </div>

                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {farm.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {farm.amenities.slice(0, 3).map((a) => (
                            <Badge key={a.name} variant="secondary" className="text-[10px] font-normal">
                              {a.name}
                            </Badge>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <div>
                            <span className="text-lg font-bold text-foreground">
                              INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-muted-foreground"> / 4 hrs</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            {farm.capacity.maxGuests} guests
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">No farmhouses found</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Try adjusting your filters or search query. Our AI can help you find alternatives.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
