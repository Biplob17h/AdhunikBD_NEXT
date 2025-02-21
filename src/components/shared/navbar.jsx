"use client";

import { navItems } from "@/data/nav-items.data";
import useUser from "@/hooks/UserHook";
import { cn } from "@/lib/utils";
import { LogOut, MapPin, Menu, Mic, Search, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const router = useRouter();

  const { user } = useUser();

  return (
    <nav className="group sticky top-0 z-10 h-16 border-b backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1250px] items-center justify-between px-5">
        <logo className="text-2xl font-medium text-green-400">Adhunik BD</logo>
        <div className="mt-2 flex items-center gap-3 transition-all duration-300 ease-in-out">
          <div className="relative">
            <MapPin className="absolute left-2 top-[10px] opacity-70" size={18} />
            <Input
              className="w-[150px] border-black py-2 pl-8 focus:border-green-500"
              placeholder="Select location"
            />
          </div>
          <div className="relative">
            <div className="right absolute bottom-0 right-2 top-0 flex items-center gap-2">
              <Mic size={18} />
              <div className="flex size-7 items-center justify-center rounded bg-green-500">
                <Search size={16} className="text-white" />
              </div>
            </div>
            <Input
              className="w-[350px] border-black py-2 focus:border-green-500"
              placeholder="Search for services"
            />
          </div>
        </div>
        <ul className="flex items-center gap-5 text-sm font-medium">
          <li>About Us</li>
          <li>All Services</li>
          <li>Blogs</li>
          <li>Our Team</li>
          <li>
            <Button variant="outline">Dashboard</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
