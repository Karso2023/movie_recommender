"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut, Settings, Film } from "lucide-react";

// TODO: Replace with your actual auth hook
// import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get Started", protected: true },
];

export function Navbar() {
  const pathname = usePathname();
  
  // TODO: Replace with actual auth state
  // const { user, isAdmin, logout } = useAuth();
  const user = null; // Placeholder - replace with actual auth
  const isAdmin = false;
  const logout = () => {}; // Placeholder

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="container flex h-16 items-center justify-between px-6">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Film className="h-6 w-6 text-violet-400" />
          <span>MovieRec</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            // Hide protected links from unauthenticated users
            if (link.protected && !user) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-400"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side - Auth */}
        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    {/* <AvatarImage src={user.image} alt={user.name} /> */}
                    <AvatarFallback className="bg-violet-600 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-white">User Name</p>
                    <p className="text-xs text-zinc-400">user@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  onClick={logout} 
                  className="cursor-pointer text-zinc-300 focus:text-white focus:bg-zinc-800"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-500 text-white" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-zinc-900 border-zinc-800">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => {
                  if (link.protected && !user) return null;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium",
                        pathname === link.href
                          ? "text-white"
                          : "text-zinc-400"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {!user && (
                  <>
                    <Link href="/login" className="text-lg font-medium text-zinc-400">
                      Sign in
                    </Link>
                    <Link href="/register" className="text-lg font-medium text-violet-400">
                      Sign up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}