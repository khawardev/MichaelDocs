'use client'
import InfiniteScrollComponent from '@/components/home/InfiniteScrollComponent';
import Loading from '@/components/loading-comp';
import StaticBanner from '@/components/staticBanner';
import {getYoutubeSwr} from '@/hooks/youtube-swr';

const YoutubePage =  () => {
    const { youtubeData, isLoading, isError } = getYoutubeSwr()
    if (isError) return <div>Failed to load</div>;

    return (
        <section className='container-c md:space-y-14 space-y-7 '>
            <StaticBanner title="All Youtube Videos" badge={'Youtube'} />
            <div className="space-y-4 ">
                {isLoading ? <Loading /> : <InfiniteScrollComponent allData={youtubeData} />}
            </div>
        </section>
    );
}

export default YoutubePage;