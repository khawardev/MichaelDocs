"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function SearchBar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(initialQuery)

    // Update the URL when the search query changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (pathname === "/") {
                const params = new URLSearchParams(searchParams)
                if (query) {
                    params.set("q", query)
                } else {
                    params.delete("q")
                }

                const newUrl = params.toString() ? `/?${params.toString()}` : "/"
                router.push(newUrl)
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [query, router, pathname, searchParams])

    return (
        <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                type="text"
                placeholder="Search videos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 rounded-lg border border-input bg-background"
            />
        </div>
    )
}

