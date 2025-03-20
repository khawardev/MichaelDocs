'use client';

import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import GetYoutubeData from '@/components/home/get-youtubeData';



const InfiniteScrollComponent = ({ allData }: any) => {
    const [youtubeData, setYoutubeData] = useState<any[]>(allData?.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const fetchData = () => {
        const currentLength = youtubeData.length;
        const isMore = currentLength < allData.length;
        const nextResults = isMore ? allData?.slice(currentLength, currentLength + limit) : [];
        setYoutubeData((prevData) => [...prevData, ...nextResults]);
        setHasMore(isMore);
    };

    return (
        <div >
            <InfiniteScroll
                dataLength={youtubeData.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more data to load</p>}
            >
                <GetYoutubeData more={false} youtubeData={youtubeData} />
            </InfiniteScroll>
        </div>
    );
};

export default InfiniteScrollComponent;