import { MainNavItem, SidebarNavItem } from "@/types/navTypes";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}
export const blocksConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "All Videos",
      href: "/about",
    },
  ],
  sidebarNav: []
};
