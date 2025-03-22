"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { YoutubeData } from "@/lib/data"
import { getYoutubeVideoId, getYoutubeThumbnailUrl } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import getRelativeTime from "@/hooks/client-functions"

interface YoutubeCardProps {
    data: YoutubeData
}

export function YoutubeCard({ data }: YoutubeCardProps) {
    const videoId = getYoutubeVideoId(data.videoUrl)
    const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : "/placeholder.svg?height=720&width=1280"

    return (
        <Link href={`/youtube/${data.id}`} className="flex">
            <Card className=" flex flex-col md:p-2 p-0 rounded-2xl md:border md:bg-accent/70 md:hover:bg-accent  transition-all ease-linear space-y-4  w-full bg-none ">
                <CardHeader className="flex-grow ">
                    <div className="aspect-video bg-muted rounded-xl border  overflow-hidden relative">
                        <Image
                            src={thumbnailUrl || "/placeholder.svg"}
                            alt={data.videoTitle}
                            fill
                            className="object-cover rounded-xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-primary pt-2">{data.videoTitle}</CardTitle>
                    <CardDescription className="line-clamp-1 leading-2">{data.channelTitle}</CardDescription>
                </CardHeader>
                <CardFooter className="flex relative justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <span className="text-sm">{getRelativeTime(data?.date)}</span>
                    </div>
                    <Link target="_blank" className="absolute z-50 right-0 top-0" rel="noopener noreferrer" href={data.videoUrl}>
                        <Button
                            size={'sm'}
                            variant={'ghost'}
                            className="rounded-full text-muted-foreground"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <ExternalLink className="h-2 w-2" />
                            watch
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </Link>
    )
}

