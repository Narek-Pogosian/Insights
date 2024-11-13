import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { getNavigationList } from "./navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Signout from "../signout";
import Logo from "@/components/logo";
import Link from "next/link";

function MobileSidebar() {
  const pathname = usePathname();
  const menuList = getNavigationList(pathname);

  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-72">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription></SheetDescription>
        <Logo />
        <nav>
          <ul className="my-8 grid gap-2">
            {menuList.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start gap-2",
                    {
                      "bg-neutral-100 dark:bg-white/10": item.active,
                    },
                  )}
                >
                  <item.icon /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Signout />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;
