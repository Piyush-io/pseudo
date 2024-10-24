/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Import a cool font from Google Fonts
import '@fontsource/jetbrains-mono'; // Or any other font suitable to your theme

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Socrator', href: '/main' },
  { name: 'Code Analyzer', href: '/analyzer' },
  { name: 'PseudoBot', href: '/pseudobot' },
  { name: "DSA's Roadmap", href: '/roadmap' },
  { name: "What's Different?", href: '/visualizer' },
  { name: 'User Dashboard', href: '/u/dashboard' },
];

const SpecialNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false); // Control background color on scroll
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle scroll effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setTimeout(() => {
      router.replace(`/`);
      router.refresh();
    }, 1000);
  };

  const NavLink: React.FC<{ item: any; onClick?: () => void }> = ({ item, onClick }) => (
    <Link
      href={item.href}
      className="px-4 py-2 text-sm font-medium text-white hover:text-cyan-300 transition-colors duration-300"
      onClick={onClick}
    >
      {item.name}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo on the left side */}
        <Link href="/" className="font-bold text-xl text-white">
          Socrates
        </Link>

        {/* Hamburger Menu button (right side) */}
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="text-cyan-200 hover:text-cyan-300"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar for navigation items and auth buttons */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeSidebar}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <div className="flex justify-end p-4">
            <Button onClick={closeSidebar} variant="ghost" size="icon">
              <X className="h-6 w-6 text-cyan-200" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item, index) => (
              <NavLink key={index} item={item} onClick={closeSidebar} />
            ))}

            {/* Authentication Links */}
            {status === 'loading' ? (
              <span>Loading...</span>
            ) : session ? (
              <>
                <NavLink item={{ name: 'User Profile', href: '/u/profile' }} onClick={closeSidebar} />
                <NavLink item={{ name: 'Logout', href: '#' }} onClick={handleLogout} />
              </>
            ) : (
              <>
                <NavLink item={{ name: 'Login', href: '/sign-in' }} onClick={closeSidebar} />
                <NavLink item={{ name: 'Register', href: '/sign-up' }} onClick={closeSidebar} />
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default SpecialNavbar;
