"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/authContext";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  Menu,
  Search,
  Leaf,
  User,
  LayoutDashboard,
  LogOut,
  Heart,
  CalendarDays,
  ShieldCheck,
  Bot,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { label: "Explore", href: "/search" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Categories", href: "/#categories" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            FunFarm
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/search">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          <Link href="/ai-assistant">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Bot className="h-4 w-4" />
              <span className="text-sm">AI Help</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-accent text-accent-foreground">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-full border-border pl-2 pr-1"
                >
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2 w-fit text-[10px]" variant="secondary">
                    {user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? 'Owner' : 'Guest'}
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user" className="gap-2">
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user" className="gap-2">
                    <CalendarDays className="h-4 w-4" />
                    My Bookings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                {(user.role === 'admin' || user.role === 'superadmin') && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin" className="gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.role === 'superadmin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/superadmin" className="gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Super Admin
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
                  {isLoggingOut ? "Logging out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-full border-border pl-3 pr-1"
                >
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/auth/login" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/register" className="gap-2">
                    <User className="h-4 w-4" />
                    Create Account
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/ai-assistant">
            <Button variant="ghost" size="icon">
              <Bot className="h-5 w-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 pt-8">
                <div className="flex items-center gap-2 px-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Leaf className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-foreground">FunFarm</span>
                </div>

                {isAuthenticated && user && (
                  <>
                    <div className="px-2 py-2 rounded-lg bg-secondary/50">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <Badge className="mt-2 text-[10px]" variant="secondary">
                        {user.role === 'superadmin' ? 'Super Admin' : user.role === 'admin' ? 'Owner' : 'Guest'}
                      </Badge>
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1 pt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <>
                      <Link
                        href="/dashboard/user"
                        className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                      >
                        My Dashboard
                      </Link>
                      {(user?.role === 'admin' || user?.role === 'superadmin') && (
                        <Link
                          href="/dashboard/admin"
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                        >
                          Admin Panel
                        </Link>
                      )}
                      {user?.role === 'superadmin' && (
                        <Link
                          href="/dashboard/superadmin"
                          className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary"
                        >
                          Super Admin
                        </Link>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  {isAuthenticated ? (
                    <Button onClick={handleLogout} disabled={isLoggingOut} className="w-full gap-2">
                      <LogOut className="h-4 w-4" />
                      {isLoggingOut ? "Signing out..." : "Sign Out"}
                    </Button>
                  ) : (
                    <>
                      <Link href="/auth/login">
                        <Button className="w-full">Sign In</Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button variant="outline" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
