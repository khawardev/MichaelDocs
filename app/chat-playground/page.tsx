import { PineconeChatInterface } from '@/components/pinecone-chat/pinecone-chat-interface'

const page = () => {
    return (
        <div className="flex flex-col md:mt-10 mt-2 px-4">
            <main className="flex items-center justify-center">
                <PineconeChatInterface />
            </main>
        </div>

    )
}

export default page