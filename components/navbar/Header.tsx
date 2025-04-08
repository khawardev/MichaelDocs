"use client";
import { CommandMenu } from "@/components/navbar/command-menu";
import { DesktopNav } from "@/components/navbar/desktop-nav";
import { MobileNav } from "@/components/navbar/mobile-nav";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import Blur from '../blur';
import { usePathname } from 'next/navigation';
export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/chat")) {
    return null;
  }
  return (
    <Blur className="sticky top-0  z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-[68px] container  px-4  m-auto   justify-center   items-center">
        <DesktopNav />
        <MobileNav />
        <div className="md:hidden flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <ThemeSwitcher />
        </div>
      </div>
    </Blur>
  );
}
