'use client'
import { LuLoaderCircle } from 'react-icons/lu'

const Spinner = () => {
    return (
        <main className='absolute z-50  h-[87vh] w-full flex-center'>
            <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span>
        </main>
    )
}

export default Spinner