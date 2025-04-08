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

interface PDFViewerProps {
    file: any;
    url: string;
    setFile?: any;
}

const PdfViewDialog = ({ file, url }: PDFViewerProps) => {
    const [open, setOpen] = useState(false);
    const getDirectLink = (driveUrl: string) => {
        const match = driveUrl.match(/\/d\/(.*?)\//);
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
        setuploading(false);
        setFile(null);
        toast.success('Pdf has been uploaded')
    };
    return (
        <div className="py-3   md:px-3 px-0 md:flex  space-y3 items-center justify-between  transition-colors">
            <div className="flex items-center space-x-3 ">
                <div className=" w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">{file?.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <span className="sr-only md:not-sr-only"></span> {formatDate(new Date())}
                        <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                        <span>{formatFileSize(file?.size)}</span>
                    </div>
                </div>
            </div>
            <div className="  md:flex items-center space-y2 gap-2">
                <PdfViewDialog file={file} url={url} />
                <Button
                    disabled={uploading}
                    onClick={handlePdfUpload}
                    className="rounded-full w-full "
                >
                    <Loader loadingstate={uploading} icon={<GrUploadOption size={4} />} actualtext={'Upload'} isloadtext={'Uploading'} />
                </Button>
                <Button variant="ghost" onClick={() => (setFile(null))}  className="h-8 w-8 ">
                    <X className="h-4 w-4" />
                </Button>
            </div>

        </div>
    );
}
