"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Socrator", href: "/main" },
  { name: "Code Analyzer", href: "/analyzer" },
  {
    category: "Features",
    items: [
      { name: "DSA's Roadmap", href: "/roadmap" },
      { name: "Algorithms", href: "/algovisualise" },
      { name: "LLM's", href: "/visualizer" },
    ],
  },
  {
    category: "More",
    items: [
      { name: "Dashboard", href: "/u/dashboard" },
      { name: "About", href: "/aboutus" },
    ],
  },
];

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const { loading } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setTimeout(() => {
      router.replace(`/`);
      router.refresh();
    }, 1000);
  };

  const NavLink: React.FC<{ item: any; onClick?: () => void }> = ({
    item,
    onClick,
  }) => (
    <Link
      href={item.href}
      className="px-3 py-2 text-sm tracking-wide text-gray-200 hover:text-white transition-colors duration-200"
      onClick={onClick}
      style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
    >
      {item.name}
    </Link>
  );

  const NavDropdown: React.FC<{ category: string; items: any[] }> = ({
    category,
    items,
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="px-3 py-2 text-sm tracking-wide text-gray-200 hover:text-white font-normal"
        >
          {category} <ChevronDown className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-black/90 backdrop-blur-lg border border-white/10"
        style={{zIndex: 100}} // Add higher z-index
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.name} className="hover:bg-white/5">
            <NavLink item={item} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const AuthButton: React.FC<{
    href: string;
    onClick?: () => void;
    children: React.ReactNode;
  }> = ({ href, onClick, children }) => (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-2 text-sm tracking-wide text-white border border-white/20 hover:bg-white hover:text-black transition-all duration-200 rounded-none"
      style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
    >
      {children}
    </Link>
  );

  const isNavCategory = (
    item: any
  ): item is { category: string; items: any[] } => {
    return "category" in item && "items" in item;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 border-b ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-white/10"
          : "bg-transparent border-transparent"
      }`}
      style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
    >
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-lg tracking-tight text-white">
            Socrates
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) =>
              isNavCategory(item) ? (
                <NavDropdown
                  key={index}
                  category={item.category}
                  items={item.items}
                />
              ) : (
                <NavLink key={index} item={item} />
              )
            )}

            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <AuthButton href="/u/profile">Profile</AuthButton>
                <AuthButton href="#" onClick={handleLogout}>
                  Logout
                </AuthButton>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <AuthButton href="/sign-in">Login</AuthButton>
                <AuthButton href="/sign-up">Register</AuthButton>
              </div>
            )}
          </div>

          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-64 bg-black border-l border-white/10 shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              {navItems.map((item, index) =>
                isNavCategory(item) ? (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400">
                      {item.category}
                    </h3>
                    {item.items.map((subItem) => (
                      <NavLink
                        key={subItem.name}
                        item={subItem}
                        onClick={() => setIsSidebarOpen(false)}
                      />
                    ))}
                  </div>
                ) : (
                  <NavLink
                    key={index}
                    item={item}
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )
              )}

              {loading ? (
                <span className="text-sm text-gray-400">Loading...</span>
              ) : session ? (
                <div className="space-y-3">
                  <AuthButton href="/u/profile">Profile</AuthButton>
                  <AuthButton href="#" onClick={handleLogout}>
                    Logout
                  </AuthButton>
                </div>
              ) : (
                <div className="space-y-3">
                  <AuthButton href="/sign-in">Login</AuthButton>
                  <AuthButton href="/sign-up">Register</AuthButton>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
