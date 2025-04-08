import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes";
import Providers from "@/components/progressBarProvider";
import { Header } from "@/components/navbar/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Michael Docs ",
  description: "Chat with your PDF documents",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers> 
        </ThemeProvider>
      </body>
    </html>
  );
}

