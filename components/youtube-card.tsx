"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { YoutubeData } from "@/lib/data"
import { getYoutubeVideoId, getYoutubeThumbnailUrl } from "@/lib/utils"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from 'date-fns'
import { Button } from "./ui/button"

interface YoutubeCardProps {
    data: YoutubeData
}
const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    return formatDistanceToNow(date, { addSuffix: true }).replace('about ', '')
}
export function YoutubeCard({ data }: YoutubeCardProps) {
    const videoId = getYoutubeVideoId(data.videoUrl)
    const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : "/placeholder.svg?height=720&width=1280"

    return (
        <Link href={`/youtube/${data.id}`} className="flex">
            <Card className=" flex flex-col   md:p-2 p-0 rounded-xl space-y-4  w-full   md:hover:bg-accent  ">
                <CardHeader className="flex-grow ">
                    <div className="aspect-video bg-muted rounded-xl overflow-hidden relative">
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
                <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <span className="text-sm">{getRelativeTime(data.date)}</span>
                    </div>
                    <Link target="_blank" rel="noopener noreferrer" href={data.videoUrl}>
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

