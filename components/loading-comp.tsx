'use client'
import { LuLoaderCircle } from "react-icons/lu";
import { Skeleton } from "./ui/skeleton";

const Loading = () => {
    return (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
            <Skeleton className="h-[341px] w-full rounded-2xl border flex-center" > <span className=" text-muted-foreground animate-spin "><LuLoaderCircle /></span> </Skeleton>
        </div>
    )
}

export default Loading