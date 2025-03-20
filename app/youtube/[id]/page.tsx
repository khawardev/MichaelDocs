import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import { Button } from "@/components/ui/button"
import { YoutubeDetail } from "@/components/youtube-detail/youtube-detail"
import { fetchYoutubeDataById } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface YoutubeDetailPageProps {
    params: {
        id: string
    }
}

export default async function YoutubeDetailPage({ params }: YoutubeDetailPageProps) {
    const data = await fetchYoutubeDataById(params.id)
    if (!data) {
        notFound()
    }

    const chatContext = `
    Video: ${data.videoTitle}
    Channel: ${data.channelTitle}
    Date: ${data.date}
    Transcript: ${data.videoTranscript}
    Summary: ${data.summary}
  `

    return (
        <div className="container relative mx-auto py-6 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <main className="w-full lg:w-2/3 ">
                    <YoutubeDetail data={data} />
                </main>

                <aside className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start rounded-3xl  py-2">
                    <ChatInterface sourceId={'src_ycexNHY5tKgHbwiVKiYAN'} />
                </aside>
            </div>
        </div>
    )
}

