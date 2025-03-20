"use client";
import { fetchYoutubeData } from '@/actions/youtubeData-action';
import GetYoutubeData from "@/components/home/get-youtubeData";
import Banner from '@/components/home/banner';
import Loading from '@/components/loading-comp';
import { useYoutube } from '@/hooks/get-youtube-data';

export default function HomePage() {

  const { youtubeData, isLoading, isError } = useYoutube()
  if (isError) return <div>Failed to load</div>;

  return (
    <div className="space-y-4 container mx-auto p-4">
      <Banner />
      {isLoading ? <div className='pt-10'><Loading /></div>  : <GetYoutubeData more={true} youtubeData={youtubeData?.slice(0, 10)} />}
    </div>
  );
}