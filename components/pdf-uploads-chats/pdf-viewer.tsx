"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CrossIcon, DeleteIcon, FileText, Trash2, X } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";
import Loader from "../loader";
import { uploadPDF } from "@/actions/pdf-actions";
import { GrUploadOption } from "react-icons/gr";
import { PiFilePdfFill } from "react-icons/pi";
import { toast } from "sonner";
import { mutate } from "swr";

interface PDFViewerProps {
    file: any;
    url: string;
    setFile?: any;
}

const PdfViewDialog = ({ file, url }: PDFViewerProps) => {
    const [open, setOpen] = useState(false);
    const getDirectLink = (driveUrl: string) => {
        const match = driveUrl?.match(/\/d\/(.*?)\//);
        return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : driveUrl;
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button

                    className="rounded-full md:w-20 w-full"
                >
                    <PiFilePdfFill size={8} />
                    View
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl  max-h-[95vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="flex flex-row items-center justify-between p-3 border-b">
                    <DialogTitle className="truncate text-sm font-medium">{file.name}</DialogTitle>
                </DialogHeader>

                {/* PDF Viewer Section */}
                <div className="flex-1 overflow-auto bg-muted/30 relative flex items-center justify-center ">
                    <iframe
                        src={getDirectLink(url)}
                        width="100%"
                        height="500px"
                        style={{
                            border: "none",
                            transformOrigin: "center",
                        }}
                    ></iframe>
                </div>
            </DialogContent>
        </Dialog>
    );
}


export default function PDFViewer({ file, url, setFile }: PDFViewerProps) {
    const [uploading, setuploading] = useState(false);
    const handlePdfUpload = async () => {
        setuploading(true);
        await uploadPDF(file, formatDate(new Date()), formatFileSize(file?.size));
        mutate('pdfsData');
        setuploading(false);
        setFile(null);
        toast.success('Pdf has been uploaded')
    };
    return (
        <div className=" w-full px-1 items-center justify-between transition-colors">
            <div className="flex items-center space-x-2 ">
                <div className=" w-10 h-10  flex items-center justify-center">
                    <PiFilePdfFill size={17} />
                </div>
                <div  >
                    <p className="text-xs font-medium text-foreground w-full  line-clamp-1">{file?.name}</p>
                    <div className="flex items-center justify-between space-x-5 text-xs text-muted-foreground ">
                        <p className="sr-only md:not-sr-only text-xs">{formatDate(new Date())}</p>
                        <p className=' text-xs'>{formatFileSize(file?.size)}</p>
                    </div>
                </div>
            </div>

            <div className=" flex items-center justify-bewteen space-y2 gap-2 mt-1">
                <PdfViewDialog file={file} url={url} />
                <Button
                    disabled={uploading}
                    onClick={handlePdfUpload}
                    className="rounded-full w-full "
                >
                    <Loader loadingstate={uploading} icon={<GrUploadOption size={4} />} actualtext={'Upload'} isloadtext={'Uploading'} />
                </Button>
                {!uploading &&
                    <Button variant="ghost" onClick={() => (setFile(null))} >
                        <X className="h-4 w-4" />
                    </Button>
                }
            </div>

        </div>
    );
}
