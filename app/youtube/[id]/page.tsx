'use client'
import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import { YoutubeDetail } from "@/components/youtube-detail/youtube-detail"
import { getYoutubeDataIDSwr } from "@/hooks/get-youtube-swr"
import Spinner from "@/components/spinner"

interface YoutubeDetailPageProps {
    params: {
        id: string
    }
}

export default  function YoutubeDetailPage({ params }: YoutubeDetailPageProps) {

    const { youtubeDataByID, isLoading, isError } = getYoutubeDataIDSwr(params.id)
    if (isError) return <div>Failed to load</div>;
    if (isLoading || !youtubeDataByID) return <Spinner/>;

    return (
        <div className="container relative mx-auto py-6 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <main className="w-full lg:w-2/3 ">
                    <YoutubeDetail data={youtubeDataByID} />
                </main>
                <aside className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start rounded-3xl  py-2">
                    <ChatInterface videoTitle={youtubeDataByID.videoTitle} sourceId={youtubeDataByID.source_id} />
                </aside>
            </div>
        </div>
    )
}

