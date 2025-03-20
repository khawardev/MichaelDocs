'use client'
import { LuLoaderCircle } from 'react-icons/lu'

const Spinner = ({ height }: any) => {
    return (
        <main className={`absolute z-50 ${height} w-full flex-center`}>
            <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span>
        </main>
    )
}

export default Spinner