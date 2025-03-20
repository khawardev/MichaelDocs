import { MainNavItem, SidebarNavItem } from "@/types/navTypes";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}
export const blocksConfig: DocsConfig = {
  mainNav: [
    {
      title: "home",
      href: "/",
    },
    {
      title: "youtube videos",
      href: "/all-youtube-videos",
    },
  ],
  sidebarNav: []
};
