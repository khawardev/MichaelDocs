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
      title: "Youtube Videos",
      href: "/all-youtube-videos",
    },
    {
      title: "Chat Playground",
      href: "/chat-playground",
    },
  ],
  sidebarNav: []
};
