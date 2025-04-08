import { FileText } from 'lucide-react'
import React from 'react'
import { Separator } from '@/components/ui/separator';

const PdfsFiles = ({ file, key }: any) => {
    return (
        <>
            <div key={key} className="py-3   md:flex  space-y3 items-center justify-between  transition-colors">
                <div className="flex items-center space-x-3 ">
                    <div className=" w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{file?.name}</p>
                        <div className="flex items-center text-xs text-muted-foreground space-x-2">
                            <span className="sr-only md:not-sr-only"></span> {file?.date}
                            <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                            <span>{file?.size}</span>
                        </div>
                    </div>
                </div>

            </div>
            <Separator />
        </>
    )
}

export default PdfsFiles