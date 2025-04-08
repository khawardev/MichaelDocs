'use client'
import { PineconeChatInterface } from '@/components/pinecone-chat/pinecone-chat-interface'
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem,  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from '@/components/ui/theme-switcher'

export function getCapitalizedLastPath() {
    const pathname = usePathname();
    const parts = pathname.split("/").filter(Boolean);
    const lastPart = parts[parts.length - 1] || "Admin";
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
}

const ChatPlaygorund = ({ children }:any) => {
    const capitalizedPath = getCapitalizedLastPath();
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16   justify-between items-center gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{capitalizedPath === 'Admin' ? 'Dashboard' : capitalizedPath}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <ThemeSwitcher />
                </header>
                <div className="md:p-8 p-4 pt-6 w-full">
                    {children ? children : <PineconeChatInterface />}
                </div>
            </SidebarInset>
        </SidebarProvider>


    )
}

export default ChatPlaygorund