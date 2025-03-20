import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import { fetchYoutubeDataBySourceID } from "@/actions/youtubeData-action"

export default async function ChatPage({ params }: any) {
  const youtubeDataBySourceID: any = await fetchYoutubeDataBySourceID(params?.source_id)
  return (
    <div className="flex flex-col md:mt-10 mt-2 px-4">
      <main className="flex items-center justify-center">
        {youtubeDataBySourceID?.length !== 0 ? <ChatInterface videoTitle={youtubeDataBySourceID[0]?.videoTitle} sourceId={params?.source_id} /> :
          <main className=' flex-center h-[60vh]'>
            <span className=" text-muted-foreground text-sm ">Sorry we can't able to Chat with this video !!</span>
          </main>
        }
      </main>
    </div>
  )
}

