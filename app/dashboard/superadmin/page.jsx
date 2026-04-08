"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Leaf,
  Home,
  Building2,
  Users,
  CalendarDays,
  IndianRupee,
  ShieldCheck,
  Bot,
  Sparkles,
  Settings,
  LogOut,
  Bell,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  ArrowUpRight,
  Globe,
  Headphones,
  BarChart3,
  Activity,
  FileText,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import {
  dashboardStats,
  recentBookings,
  monthlyRevenueData,
  adminsList,
  farmhouses,
} from "@/lib/data";

const platformGrowth = [
  { month: "Sep", users: 9500, bookings: 280, farmhouses: 120 },
  { month: "Oct", users: 10200, bookings: 320, farmhouses: 130 },
  { month: "Nov", users: 11000, bookings: 360, farmhouses: 138 },
  { month: "Dec", users: 11800, bookings: 410, farmhouses: 145 },
  { month: "Jan", users: 12200, bookings: 340, farmhouses: 150 },
  { month: "Feb", users: 12540, bookings: 365, farmhouses: 156 },
];

const bookingsByCity = [
  { name: "Lonavala", value: 34, color: "oklch(0.45 0.12 155)" },
  { name: "Karjat", value: 28, color: "oklch(0.65 0.17 55)" },
  { name: "Alibaug", value: 22, color: "oklch(0.55 0.08 200)" },
  { name: "Nashik", value: 25, color: "oklch(0.75 0.15 85)" },
  { name: "Others", value: 47, color: "oklch(0.60 0.10 30)" },
];

export default function SuperAdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isSuperAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Protect route - only superadmin can access
  useEffect(() => {
    if (!isAuthenticated || !isSuperAdmin) {
      toast.error("Access denied. Super Admin privileges required.");
      router.push("/");
    }
  }, [isAuthenticated, isSuperAdmin, router]);

  if (!isAuthenticated || !isSuperAdmin || !user) {
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

  const stats = dashboardStats.superAdmin;

  const sidebarItems = [
    { icon: Home, label: "Overview", id: "overview" },
    { icon: Building2, label: "Farmhouses", id: "farmhouses" },
    { icon: Users, label: "Users & Admins", id: "users" },
    { icon: CalendarDays, label: "All Bookings", id: "bookings" },
    { icon: IndianRupee, label: "Revenue", id: "revenue" },
    { icon: ShieldCheck, label: "Approvals", id: "approvals" },
    { icon: Bot, label: "AI Analytics", id: "ai" },
    { icon: Headphones, label: "Support", id: "support" },
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
        <Badge className="mx-2 mb-6 w-fit text-xs bg-accent text-accent-foreground border-0">
          Super Admin
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
              {id === "approvals" && stats.pendingApprovals > 0 && (
                <Badge className="ml-auto h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground">
                  {stats.pendingApprovals}
                </Badge>
              )}
              {id === "support" && stats.supportTickets > 0 && (
                <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">
                  {stats.supportTickets}
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
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Platform Command Center
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time overview of the FunFarm ecosystem
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search platform..."
                className="text-sm bg-transparent border-none outline-none w-40 placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-destructive border-2 border-card" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-accent text-accent-foreground text-sm font-bold">
                SA
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="p-6">
          {/* Mobile Nav */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {sidebarItems.slice(0, 6).map(({ label, id }) => (
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

          {/* AI Platform Alert */}
          <Card className="mb-6 border-accent/30 bg-accent/5">
            <CardContent className="flex items-start gap-3 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20">
                <Activity className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Platform Health: Excellent</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  All systems operational. 7 new farmhouse approvals pending. Platform growth is up 18% MoM.
                  AI flagged 2 listings for quality review.
                </p>
              </div>
              <Badge className="shrink-0 bg-primary text-primary-foreground border-0">Live</Badge>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          {(activeTab === "overview" || activeTab === "revenue") && (
            <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
              {[
                {
                  label: "Total Farmhouses",
                  value: stats.totalFarmhouses,
                  sub: `${stats.activeFarmhouses} active`,
                  icon: Building2,
                },
                {
                  label: "Total Bookings",
                  value: stats.totalBookings.toLocaleString("en-IN"),
                  sub: "+365 this month",
                  icon: CalendarDays,
                },
                {
                  label: "Monthly Revenue",
                  value: `INR ${(stats.monthlyRevenue / 100000).toFixed(1)}L`,
                  sub: "+18% vs last month",
                  icon: IndianRupee,
                },
                {
                  label: "Total Users",
                  value: stats.totalUsers.toLocaleString("en-IN"),
                  sub: `${stats.activeAdmins} admin owners`,
                  icon: Users,
                },
              ].map(({ label, value, sub, icon: Icon }) => (
                <Card key={label}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Charts Row */}
          {(activeTab === "overview" || activeTab === "revenue") && (
            <div className="grid gap-6 mb-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm">Platform Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={platformGrowth}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                        <Area
                          type="monotone"
                          dataKey="users"
                          name="Users"
                          stroke="oklch(0.45 0.12 155)"
                          fill="oklch(0.45 0.12 155 / 0.1)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="bookings"
                          name="Bookings"
                          stroke="oklch(0.65 0.17 55)"
                          fill="oklch(0.65 0.17 55 / 0.1)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Bookings by City</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={bookingsByCity}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {bookingsByCity.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2 justify-center">
                    {bookingsByCity.map((city) => (
                      <div key={city.name} className="flex items-center gap-1.5">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: city.color }}
                        />
                        <span className="text-[10px] text-muted-foreground">{city.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Revenue Chart */}
          {(activeTab === "overview" || activeTab === "revenue") && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Revenue Trend</CardTitle>
                <Select defaultValue="6m">
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3 Months</SelectItem>
                    <SelectItem value="6m">6 Months</SelectItem>
                    <SelectItem value="1y">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenueData}>
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
                        formatter={(v) => [`INR ${(v / 100000).toFixed(1)}L`, "Revenue"]}
                      />
                      <Bar dataKey="revenue" fill="oklch(0.45 0.12 155)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Farmhouses Management */}
          {(activeTab === "farmhouses" || activeTab === "overview") && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">
                  {activeTab === "farmhouses" ? "All Farmhouses" : "Top Farmhouses"}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border px-3 py-1">
                    <Search className="h-3 w-3 text-muted-foreground" />
                    <input
                      placeholder="Search farmhouses..."
                      className="text-xs bg-transparent border-none outline-none w-32 placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Farmhouse</TableHead>
                      <TableHead className="text-xs">City</TableHead>
                      <TableHead className="text-xs">Owner</TableHead>
                      <TableHead className="text-xs">Bookings</TableHead>
                      <TableHead className="text-xs">Rating</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmhouses.map((farm) => {
                      const admin = adminsList.find((a) => a.id === farm.adminId);
                      return (
                        <TableRow key={farm.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-10 rounded overflow-hidden shrink-0">
                                <img
                                  src={farm.images[0]}
                                  alt={farm.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <span className="text-xs font-medium">{farm.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {farm.location.city}
                            </span>
                          </TableCell>
                          <TableCell className="text-xs">{admin?.name}</TableCell>
                          <TableCell className="text-xs font-medium">{farm.totalBookings}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              {farm.rating.average}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-primary/10 text-primary border-0"
                            >
                              {farm.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Users & Admins */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">
                      {stats.totalUsers.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Total Users</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">{stats.activeAdmins}</p>
                    <p className="text-xs text-muted-foreground mt-1">Active Owners</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-foreground">45%</p>
                    <p className="text-xs text-muted-foreground mt-1">Repeat Users</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Farmhouse Owners</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Owner</TableHead>
                        <TableHead className="text-xs">Farmhouse</TableHead>
                        <TableHead className="text-xs">Plan</TableHead>
                        <TableHead className="text-xs">Bookings</TableHead>
                        <TableHead className="text-xs">Rating</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminsList.map((admin) => (
                        <TableRow key={admin.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                                  {admin.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">{admin.name}</p>
                                <p className="text-[10px] text-muted-foreground">{admin.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{admin.farmhouse}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`text-[10px] capitalize ${
                                admin.plan === "enterprise"
                                  ? "border-accent text-accent"
                                  : admin.plan === "premium"
                                  ? "border-primary text-primary"
                                  : ""
                              }`}
                            >
                              {admin.plan}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs">{admin.bookings}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3 fill-accent text-accent" />
                              {admin.rating}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="text-[10px] bg-primary/10 text-primary border-0"
                            >
                              {admin.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* All Bookings */}
          {activeTab === "bookings" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Platform Bookings</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                    <FileText className="h-3 w-3" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">ID</TableHead>
                      <TableHead className="text-xs">Farmhouse</TableHead>
                      <TableHead className="text-xs">Guest</TableHead>
                      <TableHead className="text-xs">Date</TableHead>
                      <TableHead className="text-xs">Amount</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-xs font-mono">{booking.id}</TableCell>
                        <TableCell className="text-xs font-medium">{booking.farmhouse}</TableCell>
                        <TableCell className="text-xs">{booking.guest}</TableCell>
                        <TableCell className="text-xs">{booking.date}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Approvals */}
          {activeTab === "approvals" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Card className="flex-1">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</p>
                      <p className="text-xs text-muted-foreground">Pending Approvals</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">142</p>
                      <p className="text-xs text-muted-foreground">Approved This Month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Pending Farmhouse Approvals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Mountain Breeze Cottage", owner: "Anil Kumar", city: "Mahabaleshwar", submitted: "Feb 15, 2026" },
                    { name: "Lakeview Paradise", owner: "Deepa Joshi", city: "Lavasa", submitted: "Feb 16, 2026" },
                    { name: "Golden Fields Farmhouse", owner: "Ravi Desai", city: "Pune", submitted: "Feb 17, 2026" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 rounded-lg border border-border p-4"
                    >
                      <div className="h-14 w-18 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          by {item.owner} - {item.city}
                        </p>
                        <p className="text-[10px] text-muted-foreground">Submitted: {item.submitted}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs gap-1">
                          <Eye className="h-3 w-3" />
                          Review
                        </Button>
                        <Button size="sm" className="h-8 text-xs gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs gap-1 text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="h-3 w-3" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* AI Analytics */}
          {activeTab === "ai" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Growth Prediction",
                      desc: "Based on current trends, FunFarm is projected to reach 15,000 users and 200 farmhouses by June 2026. Consider expanding to Goa and Rajasthan for maximum growth.",
                    },
                    {
                      title: "Revenue Optimization",
                      desc: "Platform take rate of 5% is below industry average (8-12%). Increasing to 7% would generate additional INR 3.5L/month without significant booking drop-off based on price elasticity analysis.",
                    },
                    {
                      title: "Quality Score Insights",
                      desc: "3 farmhouses have received quality scores below 3.5 in the past month. AI recommends sending improvement notices with specific actionable feedback.",
                    },
                    {
                      title: "Fraud Detection",
                      desc: "AI detected 12 suspicious booking patterns this month. 10 were confirmed false positives, 2 were blocked. Detection accuracy: 98.4%.",
                    },
                    {
                      title: "Seasonal Demand Forecast",
                      desc: "Holi season (March 14-15) expected to see 3x normal demand. Only 40% of farmhouses have updated their seasonal pricing. Auto-remind pending owners.",
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
            </div>
          )}

          {/* Support */}
          {activeTab === "support" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">Support Tickets ({stats.supportTickets})</CardTitle>
                <Select defaultValue="open">
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="all">All</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { id: "TK-001", user: "Priya Sharma", subject: "Refund not processed", priority: "high", date: "Feb 17" },
                  { id: "TK-002", user: "Raj Mehta", subject: "Unable to update listing photos", priority: "medium", date: "Feb 17" },
                  { id: "TK-003", user: "Ananya D.", subject: "Booking calendar showing wrong dates", priority: "high", date: "Feb 16" },
                  { id: "TK-004", user: "Vikram S.", subject: "Payment gateway error", priority: "low", date: "Feb 15" },
                ].map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center gap-4 rounded-lg border border-border p-4"
                  >
                    <div
                      className={`h-2 w-2 rounded-full shrink-0 ${
                        ticket.priority === "high"
                          ? "bg-destructive"
                          : ticket.priority === "medium"
                          ? "bg-accent"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {ticket.id}
                        </span>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {ticket.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {ticket.subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {ticket.user} - {ticket.date}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 text-xs">
                      Respond
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Platform Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">Commission Settings</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Platform Fee (%)</label>
                      <Input defaultValue="5" type="number" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Service Tax (%)</label>
                      <Input defaultValue="18" type="number" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Min Booking Amount</label>
                      <Input defaultValue="3000" type="number" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-3">AI Configuration</h3>
                  <div className="space-y-3">
                    {[
                      "AI-powered search recommendations",
                      "Automatic fraud detection",
                      "Smart pricing suggestions for owners",
                      "AI chatbot for guest support",
                      "Automated review moderation",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{feature}</span>
                        <button className="relative h-5 w-9 rounded-full bg-primary transition-colors">
                          <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground transition-transform" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Platform Settings</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
