"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Home, Compass, Brain, User, LogIn, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useAppStore } from "@/store";

const MenuOptions: { key: string; title: string; href: string; icon: React.ReactNode }[] = [
  {
    key: "home",
    title: "Home",
    href: "/",
    icon: <Home className="w-4 h-4" />,
  },
  { 
    key: "map", 
    title: "Map", 
    href: "/map",
    icon: <MapPin className="w-4 h-4" />,
  },
  { 
    key: "explore", 
    title: "Explore", 
    href: "/explore",
    icon: <Compass className="w-4 h-4" />,
  },
  { 
    key: "trip", 
    title: "Jhar-AI", 
    href: "/plan",
    icon: <Brain className="w-4 h-4" />,
  },
];

export default function MenuBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(pathname !== "/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const storeUser = useAppStore((s) => s.user);
  const role = useAppStore((s) => s.role);
  const logout = useAppStore((s) => s.logout);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const scrolling = () => {
      setScrolled(window.scrollY > 100 || pathname !== "/");
    };

    window.addEventListener("scroll", scrolling);
    return () => window.removeEventListener("scroll", scrolling);
  }, [pathname]);

  // Sync with global store user
  useEffect(() => {
    if (storeUser) {
      setUser({ name: storeUser.name, role });
    } else {
      setUser(null);
    }
  }, [storeUser, role]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.user-menu')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'user': return '/dashboard';
      case 'provider': return '/provider-dashboard';
      case 'admin':
      case 'admin_state':
        return '/admin-dashboard';
      case 'admin_district':
        return '/admin-district';
      case 'admin_zonal':
        return '/admin-zonal';
      default: return '/dashboard';
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-bold ${
                scrolled ? "text-gray-900" : "text-white"
              }`}>
                Jhar-Safar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {MenuOptions.map((option) => (
                <Button
                  key={option.key}
                  asChild
                  variant={pathname === option.href ? "outline" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    scrolled 
                      ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
                      : "text-white bg-transparent hover:text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <Link href={option.href}>
                    {option.icon}
                    <span>{option.title}</span>
                  </Link>
                </Button>
              ))}
              
              {/* User Menu */}
              {user ? (
                <div className="relative user-menu">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`flex items-center space-x-2 ${
                      scrolled 
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
                        : "text-white bg-transparent hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>{user.name || 'User'}</span>
                  </Button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link
                        href={getDashboardLink()}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    scrolled 
                      ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
                      : "text-white bg-transparent hover:text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <Link href="/login">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={scrolled ? "text-gray-700" : "text-white"}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {MenuOptions.map((option) => (
                <Button
                  key={option.key}
                  asChild
                  variant={pathname === option.href ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start space-x-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href={option.href}>
                    {option.icon}
                    <span>{option.title}</span>
                  </Link>
                </Button>
              ))}
              
              {/* Mobile User Menu */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="px-2 py-1">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start space-x-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href={getDashboardLink()}>
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start space-x-2 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/profile">
                      <Settings className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start space-x-2 text-gray-700"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start space-x-2 text-gray-700 border-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/login" className="">
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
