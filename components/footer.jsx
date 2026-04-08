import Link from "next/link";
import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">FunFarm</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              Discover and book premium farmhouses for unforgettable experiences.
              AI-powered search, verified listings, and seamless booking.
            </p>
            <p className="text-xs font-medium opacity-60 pt-2">
              Built by Shaikh Saad | MERN Stack Developer | BCA Student
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>8686948282</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@funfarm.in</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">
              Explore
            </h3>
            <div className="flex flex-col gap-2">
              {["Browse Farmhouses", "Search by City", "Categories", "Featured", "New Listings", "Map View"].map(
                (item) => (
                  <Link
                    key={item}
                    href="/search"
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">
              For Owners
            </h3>
            <div className="flex flex-col gap-2">
              {[
                "List Your Farmhouse",
                "Owner Dashboard",
                "Pricing Plans",
                "Success Stories",
                "Guidelines",
                "Support",
              ].map((item) => (
                <Link
                  key={item}
                  href="/dashboard/admin"
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50">
              Company
            </h3>
            <div className="flex flex-col gap-2">
              {["About Us", "How It Works", "Blog", "Careers", "Terms & Conditions", "Privacy Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm opacity-70 transition-opacity hover:opacity-100"
                  >
                    {item}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-background/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs opacity-50">
            2026 FunFarm. All rights reserved. Built by saad Dev        </p>
          <div className="flex items-center gap-1 text-xs opacity-50">
            <span>Powered by</span>
            <span className="font-semibold">AI-Driven Discovery & Real-Time Booking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
