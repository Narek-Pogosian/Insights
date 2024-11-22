import { Library, SquarePen } from "lucide-react";

export function getNavigationList(pathname: string) {
  return [
    {
      href: "/",
      label: "Surveys",
      active: pathname === "/",
      icon: Library,
      submenus: [],
    },
    {
      href: "/create",
      label: "Create",
      active: pathname.includes("/create"),
      icon: SquarePen,
      submenus: [],
    },
  ];
}
