import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import { fetchYoutubeDataBySourceID } from "@/actions/youtube-actions"

export default async function ChatPage({ params }: any) {

  const resolvedParams = await params;
  const sourceId = await resolvedParams?.source_id;
  const youtubeDataBySourceID: any = await fetchYoutubeDataBySourceID(sourceId);
  

  return (
    <div className="flex flex-col md:mt-10 mt-2 px-4">
      <main className="flex items-center justify-center">
        {youtubeDataBySourceID?.length !== 0 ? <ChatInterface videoTitle={youtubeDataBySourceID[0]?.videoTitle} sourceId={sourceId} /> :
          <main className=' flex-center '>
            <span className=" text-muted-foreground text-sm ">Sorry we can't able to Chat with this video !!</span>
          </main>
        }
      </main>
    </div>
  )
}

