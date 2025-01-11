"use client";
import { navItems } from "@/data/nav-items.data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <section className="bg-white py-4 2xl:py-8">
      <nav className="container_fluid flex items-center justify-between gap-2">
        <Link href="/" className="inline-block max-w-36">
          <img src="/logo.svg" alt="logo" />
        </Link>
        <ul className="flex items-center gap-8">
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
        <div>
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
      </nav>
    </section>
  );
};

export default Navbar;
