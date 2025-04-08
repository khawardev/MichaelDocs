import { ChatInterface } from "@/components/youtube-detail/chat-interface"
import GoogleDrivePDFViewer from "@/components/pdf-uploads-chats/gdrive-pdf-viewer";
import { fetchPDFDataBySourceID } from "@/actions/pdf-actions";
import ChatPlaygorund from "../page";

export default async function PDFChatPage({ params }: any) {
    const resolvedParams = await params;
    const sourceId = await resolvedParams?.source_id;
    const pdfDataBySourceID: any = await fetchPDFDataBySourceID(sourceId);

    const extractGoogleDriveFileId = (url: string): string | null => {
        const match = url?.match(/\/file\/d\/([a-zA-Z0-9_-]{10,})/);
        return match ? match[1] : null;
    };

    const fileId = extractGoogleDriveFileId(pdfDataBySourceID[0]?.url);

    return (
        <ChatPlaygorund>
            {pdfDataBySourceID?.length !== 0 || pdfDataBySourceID[0]?.url || pdfDataBySourceID[0]?.sourceId ?
                <div className="md-flex-between gap-3 space-y7">
                    {pdfDataBySourceID[0]?.url &&
                        <GoogleDrivePDFViewer fileId={fileId as string} />
                    }
                    {pdfDataBySourceID[0]?.sourceId &&
                        <ChatInterface videoTitle={pdfDataBySourceID[0]?.name} sourceId={sourceId} />
                    }
                </div> :
                <main className=' flex-center h-[70vh] '>
                    <span className=" text-muted-foreground text-sm ">Sorry we can't able to Chat with this PDF !!</span>
                </main>
            }
        </ChatPlaygorund>
    )
}

