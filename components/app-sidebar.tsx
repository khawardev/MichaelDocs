'use client'
import * as React from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaDashcube } from "react-icons/fa6"
import { BreadcrumbSeparator } from "./ui/breadcrumb"
import Spinner from "./spinner"
import PdfsFiles from "./pdf-uploads-chats/pdfs-files"
import { getPDFsSwr } from "@/hooks/pdfs-swr"
import { FileUploadArea } from "./pdf-uploads-chats/file-upload-area"
import { Icons } from "./icons"
import { Separator } from "./ui/separator"
import { useTheme } from "next-themes"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const theme: any = useTheme()
    console.log(theme,'theme');
    
    const { pdfsData, isLoading, isError } = getPDFsSwr()
    const pathname = usePathname();
    return (
        <Sidebar {...props} variant='inset'>
            <SidebarHeader >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className=" rounded-lg" size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <FaDashcube className="size-4" />
                                </div>
                                <div className="flex flex-col  -leading-9">
                                    <p className=" font-bold">Michael Docs</p>
                                    <span className="font-medium  text-muted-foreground text-xs">Chat Playground</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === `/chat-playground`}>
                            <Link href={`/chat-playground`} className="flex-between">
                                <div className=" flex-center gap-2">
                                    {theme.theme === 'light' ? <Icons.darkpinecone /> : <Icons.lightpinecone /> }
                                   
                                    <span className="flex items-center gap-2"> Pinecone Playground</span>
                                </div>
                                {pathname === `/chat-playground` && <p><BreadcrumbSeparator /></p>}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <Separator />
                <FileUploadArea />
                {isLoading ? <div className="h-48 flex-center"><Spinner /></div> :
                    <>
                        {pdfsData && pdfsData?.length > 0 && (
                            <SidebarGroup key="pdf-files">
                                <SidebarGroupLabel >uploaded Chats</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {pdfsData.map((file: any, index: number) => (
                                            <SidebarMenuItem key={index}>
                                                <SidebarMenuButton asChild isActive={pathname === `/chat-playground/${file.sourceId}`}>
                                                    <Link href={`/chat-playground/${file.sourceId}`} className="flex-between">
                                                        <PdfsFiles file={file} />
                                                        {/* {pathname === `/chat-playground/${file.sourceId}` && <p><BreadcrumbSeparator /></p>} */}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        )}
                    </>
                }
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
