'use client'
import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import { YoutubeDetail } from "@/components/youtube-detail/youtube-detail"
import { getYoutubeDataIDSwr } from "@/hooks/youtube-swr"
import Spinner from "@/components/spinner"


export default  function  YoutubeDetailPage({ params }: any) {
    const { youtubeDataByID, isLoading, isError } = getYoutubeDataIDSwr(params?.id)
    if (isError) return <div>Failed to load</div>;
    if (isLoading || !youtubeDataByID) return <Spinner height={'h-[87vh]'}/>;

    return (
        <div className="container relative mx-auto md:py-6 pt-6 md:px-6 px-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <main className="w-full lg:w-2/3 ">
                    <YoutubeDetail data={youtubeDataByID} />
                </main>
                <aside className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start rounded-3xl  py-2">
                    {youtubeDataByID?.source_id ? <ChatInterface videoTitle={youtubeDataByID.videoTitle} sourceId={youtubeDataByID.source_id} /> :
                        <main className=' flex-center h-[80vh]'>
                            <span className=" text-muted-foreground text-sm ">Sorry we can't able to Chat with this video !!</span>
                        </main>
                    }
                </aside>
            </div>
        </div>
    )
}

