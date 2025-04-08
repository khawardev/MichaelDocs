import { FileText } from 'lucide-react'
import React from 'react'
import { Separator } from '@/components/ui/separator';
import { PiFilePdfFill } from 'react-icons/pi';

const PdfsFiles = ({ file, key }: any) => {
    return (
        <div key={key} className=" flex  space-x-1 items-center justify-between  ">
            <div className=" w-10 h-10  flex items-center justify-center">
                <PiFilePdfFill size={17} />
            </div>
            <div className='w-full' >
                <p className="text-xs font-medium text-foreground     line-clamp-1">{file?.name}</p>
                <div className="flex items-center space-x-5 w-full  text-xs text-muted-foreground ">
                    <p className="text-xs">{file?.date}</p>
                    <p className='text-xs pr-1'>{file?.size}</p>
                </div>
            </div>
        </div>
    )
}

export default PdfsFiles