"use client";

import MobileSidebar from "./mobile-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import Logo from "@/components/logo";
import Link from "next/link";
import Signout from "./signout";
import { getNavigationList } from "./navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Header() {
  const pathname = usePathname();
  const menuList = getNavigationList(pathname);

  return (
    <header className="relative border-b bg-white dark:bg-neutral-950">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex h-full items-center gap-12">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="h-full max-md:hidden">
            <ul className="flex h-full gap-2">
              {menuList.map((item) => (
                <li
                  key={item.href}
                  className={cn(
                    "relative flex items-center text-sm font-semibold",
                    {
                      "after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-full after:-translate-x-1/2 after:bg-primary":
                        item.active,
                    },
                  )}
                >
                  <Link
                    className="hover:bg-background-muted rounded px-3 py-1.5 transition-colors"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileSidebar />
          <Signout icon />
        </div>
      </div>
    </header>
  );
}

export default Header;
