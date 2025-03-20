"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { YoutubeCard } from "./youtube-card";

const GetYoutubeData = ({ youtubeData, more, limit }: any) => {
    const dataToDisplay = limit ? youtubeData.slice(0, limit) : youtubeData;
    return (
        <div>
            {youtubeData?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <p className="text-xl text-muted-foreground mb-2">No videos found</p>
                    <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
                </div>
            ) : (
                <section className="space-y-4 " >
                    {more && <div className=" flex-row-reverse flex">
                        <Link href={'/all-youtube-videos'} ><Button size={'sm'} className=" rounded-full " >more <ExternalLink /> </Button></Link>
                    </div>
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {dataToDisplay?.map((item: any) => (
                            <YoutubeCard key={item.id} data={item} />
                        ))}
                    </div>
                </section>
            )}
        </div>

    );
};

export default GetYoutubeData;