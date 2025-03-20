'use client'
import InfiniteScrollComponent from '@/components/home/InfiniteScrollComponent';
import Loading from '@/components/loading-comp';
import { useYoutube } from '@/hooks/get-youtube-data';

const YoutubePage =  () => {
    const { youtubeData, isLoading, isError } = useYoutube()
    if (isError) return <div>Failed to load</div>;

    return (
        <div className="space-y-4 container mx-auto p-4">
            {isLoading ? <Loading /> : <InfiniteScrollComponent allData={youtubeData} />}
        </div>
    );
}

export default YoutubePage;