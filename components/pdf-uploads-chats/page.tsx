import { Toaster } from "@/components/ui/toaster"
import { FileUploadArea } from "./file-upload-area"
import PdfsFiles from "./pdfs-files";
import Spinner from "../spinner";
import { getPDFsSwr } from "@/hooks/pdfs-swr";

export default function PDFUploadsChats() {
    const { pdfsData, isLoading, isError } = getPDFsSwr()

    return (
        <>
            <FileUploadArea />
            {isLoading ? <div className="h-48"><Spinner /></div> : 
                <div className="flex flex-col">
                    <p className="text-sm font-bold text-foreground">Uploaded files</p>
                    {pdfsData?.map((file: any, index: number) => (
                        <PdfsFiles key={index} file={file} />
                    ))}
                </div>
            }
            <Toaster />
        </>
    )
}

