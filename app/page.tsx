"use client";
import GetYoutubeData from "@/components/home/get-youtubeData";
import Banner from '@/components/home/banner';
import Loading from '@/components/loading-comp';
import { getYoutubeSwr } from '@/hooks/get-youtube-swr';

export default function HomePage() {

  const { youtubeData, isLoading, isError } = getYoutubeSwr()
  if (isError) return <div>Failed to load</div>;

  return (
    <div className="space-y-4 container mx-auto p-4">
      <Banner />
      {isLoading ? <div className='pt-10'><Loading /></div> : <GetYoutubeData more={true} youtubeData={youtubeData?.slice(0, 10)} />}
    </div>
  );
}