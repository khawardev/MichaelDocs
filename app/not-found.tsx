import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-muted-foreground mb-8">
                The YouTube video you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="rounded-lg">
                <Link href="/" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Return Home
                </Link>
            </Button>
        </div>
    )
}

