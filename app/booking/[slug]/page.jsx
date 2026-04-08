"use client";

import { use, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AIChatbot from "@/components/ai-chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Users,
  ChefHat,
  Sparkles,
  Bot,
  Check,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  Shield,
  PartyPopper,
} from "lucide-react";
import { farmhouses } from "@/lib/data";
import { useAuth } from "@/lib/authContext";
import { bookingsDB } from "@/lib/bookingsDB";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function BookingPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const farm = farmhouses.find((f) => f.slug === slug) || farmhouses[0];
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    duration: "4hr",
    guests: farm.capacity.minGuests.toString(),
    meals: [],
    specialRequests: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const durationPrices = {
    "4hr": farm.pricing.hourly["4hr"],
    "6hr": farm.pricing.hourly["6hr"],
    "8hr": farm.pricing.hourly["8hr"],
    "12hr": farm.pricing.hourly["12hr"],
    fullDay: farm.pricing.fullDay,
  };

  const basePrice = durationPrices[bookingData.duration] || farm.pricing.hourly["4hr"];
  const guestCount = parseInt(bookingData.guests) || farm.capacity.minGuests;
  const mealTotal = bookingData.meals.reduce((sum, mealName) => {
    const food = farm.foodOptions.find((f) => f.meal === mealName);
    return sum + (food ? food.price * guestCount : 0);
  }, 0);
  const serviceFee = Math.round(basePrice * 0.05);
  const total = basePrice + mealTotal + serviceFee;

  const calculateTotal = () => basePrice + mealTotal + serviceFee;

  const toggleMeal = (meal) => {
    setBookingData((prev) => ({
      ...prev,
      meals: prev.meals.includes(meal)
        ? prev.meals.filter((m) => m !== meal)
        : [...prev.meals, meal],
    }));
  };

  const steps = [
    { num: 1, label: "Date & Duration" },
    { num: 2, label: "Add-ons" },
    { num: 3, label: "Guest Info" },
    { num: 4, label: "Review & Book" },
  ];

  return (
    <main>
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-8">
            <Link href={`/farmhouse/${farm.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              <span className="flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Back to {farm.name}</span>
            </Link>
            <h1 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Book {farm.name}
            </h1>
          </div>

          {/* AI Suggestion */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-primary mb-1">AI Booking Tip</p>
                <p className="text-sm text-muted-foreground">
                  {step === 1 && "Weekday bookings save you up to 30%. The best availability this month is on Tuesdays and Wednesdays."}
                  {step === 2 && `The Dinner BBQ package is the most popular add-on at ${farm.name}. ${guestCount > 20 ? "For your group size, we recommend the full meal package for best value." : "Consider adding breakfast for a complete experience."}`}
                  {step === 3 && "Your information is secured with 256-bit encryption. We only share contact details with the farmhouse after booking confirmation."}
                  {step === 4 && `Great choices! Your booking for ${farm.name} is ready. You'll receive instant confirmation via email and WhatsApp.`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                      step > s.num
                        ? "bg-primary text-primary-foreground"
                        : step === s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <Check className="h-4 w-4" /> : s.num}
                  </div>
                  <span className="mt-1.5 text-[10px] font-medium text-muted-foreground hidden sm:block">
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-3 ${
                      step > s.num ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Step Content */}
            <div className="flex-1">
              {step === 1 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      Select Date & Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Booking Date
                      </label>
                      <Input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, date: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Duration
                      </label>
                      <Select
                        value={bookingData.duration}
                        onValueChange={(v) =>
                          setBookingData({ ...bookingData, duration: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4hr">4 Hours - INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}</SelectItem>
                          <SelectItem value="6hr">6 Hours - INR {farm.pricing.hourly["6hr"].toLocaleString("en-IN")}</SelectItem>
                          <SelectItem value="8hr">8 Hours - INR {farm.pricing.hourly["8hr"].toLocaleString("en-IN")}</SelectItem>
                          <SelectItem value="12hr">12 Hours - INR {farm.pricing.hourly["12hr"].toLocaleString("en-IN")}</SelectItem>
                          <SelectItem value="fullDay">Full Day - INR {farm.pricing.fullDay.toLocaleString("en-IN")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Number of Guests
                      </label>
                      <Select
                        value={bookingData.guests}
                        onValueChange={(v) =>
                          setBookingData({ ...bookingData, guests: v })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from(
                            { length: Math.ceil((farm.capacity.maxGuests - farm.capacity.minGuests) / 5) + 1 },
                            (_, i) => {
                              const n = farm.capacity.minGuests + i * 5;
                              return n <= farm.capacity.maxGuests ? n : null;
                            }
                          )
                            .filter(Boolean)
                            .map((n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n} guests
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ChefHat className="h-5 w-5 text-primary" />
                      Add-ons & Meals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {farm.foodOptions.map((food) => (
                      <div
                        key={food.meal}
                        className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                          bookingData.meals.includes(food.meal)
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/30"
                        }`}
                        onClick={() => toggleMeal(food.meal)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={bookingData.meals.includes(food.meal)} />
                          <div>
                            <p className="font-medium text-foreground">{food.meal}</p>
                            <p className="text-sm text-muted-foreground">{food.menu}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            INR {food.price} <span className="text-xs font-normal text-muted-foreground">/person</span>
                          </p>
                          {bookingData.meals.includes(food.meal) && (
                            <p className="text-xs text-primary">
                              = INR {(food.price * guestCount).toLocaleString("en-IN")} total
                            </p>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="pt-3">
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Special Requests
                      </label>
                      <Textarea
                        value={bookingData.specialRequests}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            specialRequests: e.target.value,
                          })
                        }
                        placeholder="Any special arrangements, decorations, dietary needs..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5 text-primary" />
                      Guest Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          First Name
                        </label>
                        <Input
                          value={bookingData.firstName}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          Last Name
                        </label>
                        <Input
                          value={bookingData.lastName}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Phone
                      </label>
                      <Input
                        value={bookingData.phone}
                        onChange={(e) =>
                          setBookingData({ ...bookingData, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <p className="text-xs text-muted-foreground">
                        Your data is encrypted and only shared with the host after confirmation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <PartyPopper className="h-5 w-5 text-primary" />
                      Review & Confirm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg bg-muted p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Farmhouse</span>
                        <span className="font-medium text-foreground">{farm.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium text-foreground">{bookingData.date || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium text-foreground">
                          {bookingData.duration === "fullDay" ? "Full Day" : bookingData.duration.replace("hr", " Hours")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Guests</span>
                        <span className="font-medium text-foreground">{bookingData.guests}</span>
                      </div>
                      {bookingData.meals.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Meals</span>
                          <span className="font-medium text-foreground">{bookingData.meals.join(", ")}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Guest</span>
                        <span className="font-medium text-foreground">
                          {bookingData.firstName} {bookingData.lastName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                        I agree to the terms, cancellation policy, and house rules.
                      </label>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-6 flex items-center justify-between">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
                <div className="ml-auto">
                  {step < 4 ? (
                    <Button onClick={() => setStep(step + 1)} className="gap-2">
                      Next Step
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={async () => {
                        if (!isAuthenticated) {
                          toast.error("Please log in to complete your booking");
                          router.push("/auth/login");
                          return;
                        }

                        setIsSubmitting(true);
                        try {
                          const price = calculateTotal();
                          const { success, error } = await bookingsDB.createBooking(
                            user.id,
                            farm.id || farm.slug,
                            {
                              checkInDate: bookingData.date,
                              checkOutDate: bookingData.date,
                              totalGuests: parseInt(bookingData.guests),
                              totalPrice: price,
                              addOns: bookingData.meals,
                              specialRequests: bookingData.specialRequests
                            }
                          );

                          if (success) {
                            toast.success("Booking confirmed! Check your email for details.");
                            router.push("/dashboard/user");
                          } else {
                            toast.error(error || "Booking failed. Please try again.");
                          }
                        } catch (err) {
                          toast.error(err.message || "Error processing booking");
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                      disabled={isSubmitting}
                      className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      <CreditCard className="h-4 w-4" />
                      {isSubmitting ? "Processing..." : "Submit Booking Request"}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <aside className="w-full lg:w-80 shrink-0">
              <Card className="sticky top-24 border-border">
                <CardHeader>
                  <CardTitle className="text-sm">Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {bookingData.duration === "fullDay" ? "Full Day" : bookingData.duration.replace("hr", " Hours")}
                    </span>
                    <span className="font-medium text-foreground">
                      INR {basePrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {mealTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Meals ({guestCount} guests)
                      </span>
                      <span className="font-medium text-foreground">
                        INR {mealTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service fee</span>
                    <span className="font-medium text-foreground">
                      INR {serviceFee.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">
                      INR {total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 mt-4">
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      AI-optimized pricing. You are saving approximately INR {Math.round(total * 0.12).toLocaleString("en-IN")} compared to direct booking.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
      <AIChatbot />
    </main>
  );
}
