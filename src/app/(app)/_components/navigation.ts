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
    // {
    //   href: "/surveys",
    //   label: "Surveys",
    //   active: pathname.startsWith("/surveys"),
    //   icon: Library,
    //   submenus: [],
    // },
    {
      href: "/create",
      label: "Create",
      active: pathname.includes("/create"),
      icon: SquarePen,
      submenus: [],
    },
  ];
}
