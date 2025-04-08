'use client'
import { useState, useCallback } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import PDFViewer from "./pdf-viewer";


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
                    <CardContent className="p-0">
                        <PDFViewer
                            url={URL.createObjectURL(file)}
                            file={file}
                            setFile={setFile}
                        />
                    </CardContent>
                </Card>
            )}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 transition-colors duration-200 ease-in-out
                ${isDragActive && !isDragReject ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 cursor-pointer hover:bg-accent/50"}
                ${isDragReject ? "border-red-800/50 bg-destructive/5" : ""}`}
                >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center text-center">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" strokeWidth={1.5} />
                    <p className="text-lg font-medium text-foreground">
                        {isDragActive ? "Drop file here" : (
                            <>
                                <span className="sr-only md:not-sr-only">Drag a PDF file here or</span> click to upload
                            </>
                        )}
                    </p>
                    <p className="text-sm text-muted-foreground">Only PDF files are supported</p>
                </div>
            </div>

            {dragError && (
                <Alert variant="destructive" className="animate-in pb-2 fade-in duration-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{dragError}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
