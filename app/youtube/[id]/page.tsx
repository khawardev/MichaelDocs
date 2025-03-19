import { ChatInterface } from "@/components/chat-interface"
import { YoutubeDetail } from "@/components/youtube-detail"
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

    // Create context for the chatbot
    const chatContext = `
    Video: ${data.videoTitle}
    Channel: ${data.channelTitle}
    Date: ${data.date}
    Transcript: ${data.videoTranscript}
    Summary: ${data.summary}
  `

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <main className="w-full lg:w-2/3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to all videos
                    </Link>

                    <YoutubeDetail data={data} />
                </main>

                <aside className="w-full lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
                    <div className="w-full border p-4 rounded-2xl">
                        <ChatInterface sourceId={'src_ycexNHY5tKgHbwiVKiYAN'} />
                    </div>
                </aside>
            </div>

        </div>
    )
}

