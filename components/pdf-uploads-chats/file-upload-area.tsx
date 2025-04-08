'use client'
import { useState, useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import PDFViewer from "./pdf-viewer";
import { MdOutlineFileUpload } from "react-icons/md";


export function FileUploadArea() {
    const [file, setFile] = useState<File | any>(null);
    const [dragError, setDragError] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles.length > 1) {
            toast.warning("Only one file can be uploaded at a time!");
            return;
        }
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setDragError(null);
    }, []);

    const onDropRejected = useCallback(() => {
        setDragError("Only 1 PDF file is supported");
        setTimeout(() => setDragError(null), 5000);
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { "application/pdf": [".pdf"] },
        maxFiles: 1,
    });


    return (
        <div className="space-y-3">
            {file && (
                <Card className="p-0">
                    <PDFViewer
                        url={URL.createObjectURL(file)}
                        file={file}
                        setFile={setFile}
                    />
                </Card>
            )}
            <div {...getRootProps()} className={`rounded-xl   p-4 duration-200 ease-in-out ${isDragActive && !isDragReject ? "border-primary " : "border-border hover:border-primary/30 cursor-pointer  bg-destructive"} ${isDragReject ? "border-red-800/50 bg-destructive text-primary-foreground " : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col   items-center justify-center text-center">
                    <MdOutlineFileUpload className="w-7 h-7 mb-1  text-muted-foreground" />
                    <div>
                        <p className="text-sm font-medium text-background">
                            {isDragActive ? "Drop file here" : (
                                <>
                                    <span className=" mb-1 ">drag a file here</span>
                                </>
                            )}
                        </p>
                        <p className="text-xs text-muted-foreground">only PDF files are supported</p>
                    </div>
                </div>
            </div>

            {dragError && (
                <Alert variant="destructive" className="animate-inflex-center fade-in duration-300">
                    <AlertDescription>{dragError}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
