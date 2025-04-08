import React from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const Loader = ({ isloadtext, actualtext, loadingstate, icon }:any) => {
    return (
        <>{loadingstate ? <div className='flex-center gap-1'> <span className=" text-muted-foreground animate-spin "><LuLoaderCircle size={4} /></span> {isloadtext}..</div> : <span className='flex-center gap-1'>{icon}{actualtext}</span>}</>
      
  )
}

export default Loader