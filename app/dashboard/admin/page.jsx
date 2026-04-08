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
import { useAuth } from "@/lib/authContext";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Leaf,
  Home,
  CalendarDays,
  IndianRupee,
  Star,
  TrendingUp,
  Users,
  Building2,
  Clock,
  CheckCircle,
  XCircle,
  MessageCircle,
  Settings,
  Bot,
  Sparkles,
  LogOut,
  Bell,
  Image as ImageIcon,
  Edit,
  Plus,
  Eye,
  BarChart3,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { dashboardStats, recentBookings, monthlyRevenueData, farmhouses } from "@/lib/data";

const weeklyBookings = [
  { day: "Mon", bookings: 3 },
  { day: "Tue", bookings: 5 },
  { day: "Wed", bookings: 4 },
  { day: "Thu", bookings: 7 },
  { day: "Fri", bookings: 12 },
  { day: "Sat", bookings: 15 },
  { day: "Sun", bookings: 10 },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Protect route - only admin and superadmin can access
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/");
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin || !user) {
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
      logout();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const stats = dashboardStats.admin;
  const farm = farmhouses[0];

  const sidebarItems = [
    { icon: Home, label: "Overview", id: "overview" },
    { icon: CalendarDays, label: "Bookings", id: "bookings" },
    { icon: Building2, label: "My Farmhouse", id: "farmhouse" },
    { icon: IndianRupee, label: "Earnings", id: "earnings" },
    { icon: Star, label: "Reviews", id: "reviews" },
    { icon: Bot, label: "AI Insights", id: "ai" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  return (
    <main className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-card p-4">
        <Link href="/" className="flex items-center gap-2 px-2 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">FunFarm</span>
        </Link>
        <Badge variant="outline" className="mx-2 mb-6 w-fit text-xs">
          Owner Dashboard
        </Badge>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map(({ icon: Icon, label, id }) => (
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
              {id === "bookings" && stats.pendingRequests > 0 && (
                <Badge className="ml-auto h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center">
                  {stats.pendingRequests}
                </Badge>
              )}
            </button>
          ))}
        </nav>

        <Separator className="my-4" />
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Link>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Sunset Valley Estate
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0">
                  Premium Plan
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  {stats.averageRating} ({stats.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent border-2 border-card" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                RM
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="p-6">
          {/* Mobile Nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {sidebarItems.map(({ label, id }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(id)}
                className="shrink-0 text-xs"
              >
                {label}
              </Button>
            ))}
          </div>

          {/* AI Performance Banner */}
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">AI Performance Report</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Your farmhouse is trending 23% above similar properties in Lonavala.
                  Consider adding breakfast packages -- properties with meal add-ons see 35% higher repeat bookings.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          {(activeTab === "overview" || activeTab === "earnings") && (
            <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
              {[
                {
                  label: "Total Bookings",
                  value: stats.totalBookings,
                  icon: CalendarDays,
                  change: "+12%",
                  up: true,
                },
                {
                  label: "Monthly Earnings",
                  value: `INR ${(stats.monthlyEarnings / 1000).toFixed(0)}K`,
                  icon: IndianRupee,
                  change: "+8%",
                  up: true,
                },
                {
                  label: "Occupancy Rate",
                  value: `${stats.occupancyRate}%`,
                  icon: Percent,
                  change: "+5%",
                  up: true,
                },
                {
                  label: "Pending Requests",
                  value: stats.pendingRequests,
                  icon: Clock,
                  change: "-2",
                  up: false,
                },
              ].map(({ label, value, icon: Icon, change, up }) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span
                        className={`flex items-center gap-0.5 text-xs font-medium ${
                          up ? "text-primary" : "text-accent"
                        }`}
                      >
                        {up ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Revenue Chart */}
          {(activeTab === "overview" || activeTab === "earnings") && (
            <div className="grid gap-6 mb-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Weekly Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyBookings}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="day" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Bar dataKey="bookings" fill="oklch(0.45 0.12 155)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <YAxis
                          tick={{ fontSize: 12 }}
                          className="text-muted-foreground"
                          tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                          formatter={(v) => [`INR ${(v / 1000).toFixed(0)}K`, "Revenue"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="oklch(0.65 0.17 55)"
                          fill="oklch(0.65 0.17 55 / 0.15)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookings Table */}
          {(activeTab === "overview" || activeTab === "bookings") && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Recent Bookings</CardTitle>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Booking ID</TableHead>
                      <TableHead className="text-xs">Guest</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Guests</TableHead>
                      <TableHead className="text-xs">Amount</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-xs font-mono">{booking.id}</TableCell>
                        <TableCell className="text-xs font-medium">{booking.guest}</TableCell>
                        <TableCell className="text-xs">{booking.date}</TableCell>
                        <TableCell className="text-xs">{booking.guests}</TableCell>
                        <TableCell className="text-xs font-medium">
                          INR {booking.amount.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "completed"
                                ? "secondary"
                                : "outline"
                            }
                            className="text-[10px]"
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.status === "pending" ? (
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-primary hover:bg-primary/10"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="ghost" className="h-7 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Farmhouse Management */}
          {activeTab === "farmhouse" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Farmhouse Details</CardTitle>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {farm.images.map((img, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden h-32">
                        <Image
                          src={img}
                          alt={`${farm.name} ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Name</label>
                      <p className="text-sm font-medium text-foreground">{farm.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Location</label>
                      <p className="text-sm font-medium text-foreground">
                        {farm.location.city}, {farm.location.state}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Capacity</label>
                      <p className="text-sm font-medium text-foreground">
                        {farm.capacity.minGuests} - {farm.capacity.maxGuests} guests
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Base Price</label>
                      <p className="text-sm font-medium text-foreground">
                        INR {farm.pricing.hourly["4hr"].toLocaleString("en-IN")} /4hr
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Amenities</label>
                    <div className="flex flex-wrap gap-2">
                      {farm.amenities.map((a) => (
                        <Badge key={a.name} variant="secondary" className="text-xs">
                          {a.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pricing Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {Object.entries(farm.pricing.hourly).map(([dur, price]) => (
                      <div key={dur} className="rounded-lg border border-border p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">
                          {dur.replace("hr", " Hours")}
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          INR {price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                      <p className="text-xs text-primary mb-1">Full Day</p>
                      <p className="text-lg font-bold text-primary">
                        INR {farm.pricing.fullDay.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reviews Management */}
          {activeTab === "reviews" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm">Guest Reviews</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stats.totalReviews} total reviews - {stats.averageRating} average
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(stats.averageRating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const pct = stars === 5 ? 72 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 2 : 1;
                    return (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-8">{stars} star</span>
                        <Progress value={pct} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{pct}%</span>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {[
                  { guest: "Priya Sharma", rating: 5, date: "2 weeks ago", text: "Absolutely amazing experience! The pool and garden area were perfect for our family reunion." },
                  { guest: "Rahul Patel", rating: 5, date: "1 month ago", text: "Perfect venue for our corporate team outing. Great amenities and the food was excellent." },
                  { guest: "Ananya Desai", rating: 4, date: "1 month ago", text: "Beautiful property. Would have loved better WiFi connectivity, but everything else was perfect." },
                ].map((review) => (
                  <div key={review.guest} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                            {review.guest
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.guest}</p>
                          <span className="text-[10px] text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? "fill-accent text-accent" : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs gap-1">
                      <MessageCircle className="h-3 w-3" />
                      Reply
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Business Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Pricing Optimization",
                      desc: "Based on demand patterns, consider increasing weekend rates by 10%. Similar properties in your area charge 15-20% more on weekends.",
                      type: "revenue",
                    },
                    {
                      title: "Booking Pattern Analysis",
                      desc: "70% of your bookings happen for 8+ hour slots. Consider creating a special '8-hour party package' with included meals to increase average order value.",
                      type: "insight",
                    },
                    {
                      title: "Guest Feedback Summary",
                      desc: "Across 127 reviews, guests most praise your pool area (mentioned 89 times) and staff (67 times). The WiFi gets occasional complaints - consider upgrading.",
                      type: "feedback",
                    },
                    {
                      title: "Seasonal Forecast",
                      desc: "March-April bookings typically increase by 40% in your area. Consider running early-bird offers now to capture advance bookings.",
                      type: "forecast",
                    },
                  ].map((insight) => (
                    <div
                      key={insight.title}
                      className="flex items-start gap-3 rounded-lg border border-border p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{insight.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {insight.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI-Generated Action Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { text: "Update profile photos - last updated 3 months ago", priority: "high" },
                      { text: "Respond to 2 pending guest reviews", priority: "medium" },
                      { text: "Add seasonal pricing for March festival season", priority: "high" },
                      { text: "Enable instant booking for faster conversions", priority: "low" },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
                      >
                        <div
                          className={`h-2 w-2 rounded-full shrink-0 ${
                            item.priority === "high"
                              ? "bg-destructive"
                              : item.priority === "medium"
                              ? "bg-accent"
                              : "bg-primary"
                          }`}
                        />
                        <p className="text-sm text-foreground flex-1">{item.text}</p>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {item.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Owner Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Business Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Owner Name</label>
                      <Input defaultValue="Raj Mehta" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Business Email</label>
                      <Input defaultValue="raj@sunsetvalley.com" type="email" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
                      <Input defaultValue="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">GST Number</label>
                      <Input defaultValue="27AADCB2230M1ZT" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Payment Settings</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Bank Account</label>
                      <Input defaultValue="XXXX XXXX XXXX 4521" disabled />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">UPI ID</label>
                      <Input defaultValue="rajmehta@upi" />
                    </div>
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
