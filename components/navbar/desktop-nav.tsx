import * as React from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { CommandMenu } from "./command-menu";
import Link from 'next/link'
import { blocksConfig } from "@/config/blocks";
import { usePathname } from "next/navigation";
import { FaDashcube } from "react-icons/fa6";
import BackgroundAnimation from "../bg-animation";



export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="md:flex  hidden w-full justify-between  items-center  ">
      <Link href="/" className="mr-6   flex items-center space-x-2">
        <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <FaDashcube className="size-3" />
        </div>
        <p className="hidden text-xl font-extrabold tracking-tighter sm:inline-block">
          {siteConfig.name}
        </p>
      </Link>
      <div className="flex   items-center gap-4 text-sm lg:gap-6">
        {blocksConfig.mainNav.map((item, index) => (
          <Link
            key={index}
            href={item.href ?? ""}
            className={cn(
              "transition-colors hover:text-foreground/80 text-foreground",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex  items-center justify-between space-x-2 ">
        <ThemeSwitcher />
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <CommandMenu />
        </div>
      </div>
    </div>
  );
}


