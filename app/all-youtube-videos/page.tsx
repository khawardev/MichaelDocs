'use client'
import InfiniteScrollComponent from '@/components/home/InfiniteScrollComponent';
import Loading from '@/components/loading-comp';
import {getYoutubeSwr} from '@/hooks/get-youtube-swr';

const YoutubePage =  () => {
    const { youtubeData, isLoading, isError } = getYoutubeSwr()
    if (isError) return <div>Failed to load</div>;

    return (
        <div className="space-y-4 container mx-auto p-4">
            {isLoading ? <Loading /> : <InfiniteScrollComponent allData={youtubeData} />}
        </div>
    );
}

export default YoutubePage;