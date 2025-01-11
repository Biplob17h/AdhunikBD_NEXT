"use client";

import { navItems } from "@/data/nav-items.data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="bg-white py-4 2xl:py-8">
      <nav className="container_fluid flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="inline-block max-w-36">
          <img src="/logo.svg" alt="logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn("nav_link text-black", {
                  "text-active font-semibold": pathname === item.href,
                })}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/auth/login"
            className={cn(
              "nav_link inline-block rounded-lg bg-[#040404] px-8 py-3 font-bold text-white",
              {
                "bg-active": pathname === "/auth/login",
              },
            )}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-white/65 p-6 backdrop-blur transition-transform",
          {
            "-translate-x-full": !menuOpen,
            "translate-x-0": menuOpen,
          },
        )}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {/* Close Button and Logo */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" onClick={closeMenu} className="inline-block max-w-36">
            <img src="/logo.svg" alt="logo" />
          </Link>
          <button
            className="text-black"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="flex flex-col items-start gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className={cn("nav_link text-black", {
                  "text-active font-semibold": pathname === item.href,
                })}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <div className="mt-6">
          <Link
            href="/auth/login"
            onClick={closeMenu}
            className={cn(
              "nav_link inline-block w-full rounded-lg bg-[#040404] px-8 py-3 font-bold text-white md:w-auto",
              {
                "bg-active": pathname === "/auth/login",
              },
            )}
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
