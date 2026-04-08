"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/authContext";
import { userProfilesDB } from "@/lib/userProfiles";
import { toast } from "sonner";
import {
  CalendarDays,
  Heart,
  Star,
  MapPin,
  CreditCard,
  Settings,
  Bot,
  Sparkles,
  Clock,
  ChevronRight,
  Download,
  MessageCircle,
  TrendingUp,
  Leaf,
  Home,
  LogOut,
  Bell,
  User,
  IndianRupee,
} from "lucide-react";
import { farmhouses, dashboardStats, recentBookings } from "@/lib/data";

export default function UserDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Protect route and fetch profile
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access your dashboard");
      router.push("/auth/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const profileData = await userProfilesDB.fetchProfile(user.id, user.email);
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setProfileLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [isAuthenticated, user?.id, user?.email, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
      setIsLoggingOut(false);
    }
  };

  const stats = dashboardStats.user;

  return (
    <main className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4">
        <Link href="/" className="flex items-center gap-2 px-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">FunFarm</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {[
            { icon: Home, label: "Overview", id: "overview" },
            { icon: CalendarDays, label: "My Bookings", id: "bookings" },
            { icon: Heart, label: "Wishlist", id: "wishlist" },
            { icon: Star, label: "My Reviews", id: "reviews" },
            { icon: Bot, label: "AI Assistant", id: "ai" },
            { icon: Settings, label: "Settings", id: "settings" },
          ].map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <Separator className="my-4" />
        <Button
          onClick={handleLogout}
          disabled={isLoggingOut}
          variant="outline"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {isLoggingOut ? "Signing out..." : "Sign Out"}
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-sm text-muted-foreground">
              Here is a summary of your farmhouse adventures
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-card" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="p-6">
          {/* Mobile Tab Navigation */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {["overview", "bookings", "wishlist", "reviews", "ai"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
                className="shrink-0 capitalize"
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* AI Insight Banner */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">AI Insight</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Based on your past bookings, you might love{" "}
                  <Link href="/farmhouse/serenity-springs" className="text-primary hover:underline">
                    Serenity Springs
                  </Link>{" "}
                  in Panchgani -- it matches your preference for peaceful retreats with spa amenities.
                </p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                Explore
              </Button>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          {(activeTab === "overview" || activeTab === "bookings") && (
            <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
              {[
                {
                  label: "Total Bookings",
                  value: stats.totalBookings,
                  icon: CalendarDays,
                  color: "text-primary",
                  bgColor: "bg-primary/10",
                },
                {
                  label: "Upcoming",
                  value: stats.upcomingBookings,
                  icon: Clock,
                  color: "text-accent",
                  bgColor: "bg-accent/10",
                },
                {
                  label: "Wishlist",
                  value: stats.wishlistCount,
                  icon: Heart,
                  color: "text-destructive",
                  bgColor: "bg-destructive/10",
                },
                {
                  label: "Total Spent",
                  value: `INR ${(stats.totalSpent / 1000).toFixed(0)}K`,
                  icon: IndianRupee,
                  color: "text-chart-3",
                  bgColor: "bg-chart-3/10",
                },
              ].map(({ label, value, icon: Icon, color, bgColor }) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${bgColor}`}>
                        <Icon className={`h-4 w-4 ${color}`} />
                      </div>
                      <TrendingUp className="h-3 w-3 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Upcoming Bookings */}
          {(activeTab === "overview" || activeTab === "bookings") && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Your Bookings</CardTitle>
                <Link href="/search">
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    Book New <ChevronRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.slice(0, 4).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src="/images/farmhouse-1.jpg"
                          alt={booking.farmhouse}
                          width={80}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {booking.farmhouse}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {booking.date} - {booking.duration}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "completed"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-[10px] px-1.5 py-0"
                          >
                            {booking.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {booking.guests} guests
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-foreground text-sm">
                          INR {booking.amount.toLocaleString("en-IN")}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-1 h-7 text-xs">
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Wishlist */}
          {(activeTab === "overview" || activeTab === "wishlist") && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base">Your Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {farmhouses.slice(0, 3).map((farm) => (
                    <Link
                      key={farm.id}
                      href={`/farmhouse/${farm.slug}`}
                      className="group rounded-lg border border-border overflow-hidden transition-all hover:shadow-md"
                    >
                      <div className="relative h-32">
                        <Image
                          src={farm.images[0]}
                          alt={farm.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm">
                          <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" />
                        </button>
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-foreground text-sm">{farm.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {farm.location.city}
                          </span>
                          <span className="ml-auto flex items-center gap-0.5 text-xs">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            {farm.rating.average}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-primary">
                          INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")}
                          <span className="text-xs font-normal text-muted-foreground"> /4hr</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    farmhouse: "Sunset Valley Estate",
                    date: "Feb 10, 2026",
                    rating: 5,
                    text: "Absolutely loved the experience! The pool area was stunning and the staff went above and beyond.",
                  },
                  {
                    farmhouse: "Riverside Retreat",
                    date: "Jan 28, 2026",
                    rating: 4,
                    text: "Beautiful riverside location. The bonfire night was magical. Would visit again!",
                  },
                ].map((review) => (
                  <div key={review.farmhouse} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-foreground text-sm">{review.farmhouse}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}

                {stats.pendingReviews > 0 && (
                  <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-center">
                    <MessageCircle className="mx-auto h-8 w-8 text-primary/50 mb-2" />
                    <p className="text-sm font-medium text-foreground">
                      {stats.pendingReviews} reviews pending
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Share your experience to help other travelers
                    </p>
                    <Button size="sm" className="mt-3">
                      Write Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* AI Assistant Tab */}
          {activeTab === "ai" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bot className="h-5 w-5 text-primary" />
                  Your AI Travel Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I have analyzed your booking history and preferences. Here are my personalized recommendations:
                  </p>
                </div>

                {[
                  {
                    title: "Weekend Getaway",
                    desc: "Serenity Springs has availability this weekend with a 15% off deal for returning guests.",
                    action: "View Deal",
                  },
                  {
                    title: "Group Gathering",
                    desc: "Planning another team outing? Green Meadows Farm has new cricket and badminton facilities.",
                    action: "Explore",
                  },
                  {
                    title: "Anniversary Special",
                    desc: "Royal Orchid Villa offers a curated couples package with candlelight dinner and spa.",
                    action: "See Package",
                  },
                ].map((rec) => (
                  <div
                    key={rec.title}
                    className="flex items-start gap-3 rounded-lg border border-border p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{rec.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{rec.desc}</p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 text-xs">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Personal Information</h3>
                  {profileLoading ? (
                    <div className="text-center text-muted-foreground">Loading profile...</div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">First Name</label>
                        <Input defaultValue={profile?.firstName || ""} placeholder="First name" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Last Name</label>
                        <Input defaultValue={profile?.lastName || ""} placeholder="Last name" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                        <Input defaultValue={user?.email || ""} type="email" disabled />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                        <Input defaultValue={profile?.phone || ""} placeholder="Phone number" />
                      </div>
                    </div>
                  )}
                </div>
                <Separator />
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Notification Preferences</h3>
                  <div className="space-y-3">
                    {["Booking confirmations", "Price drop alerts", "AI recommendations", "Promotional offers"].map(
                      (pref) => (
                        <div key={pref} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{pref}</span>
                          <button className="relative h-5 w-9 rounded-full bg-primary transition-colors">
                            <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-transform" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
