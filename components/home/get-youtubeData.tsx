"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { YoutubeCard } from "./youtube-card";
import Loading from "../loading-comp";
import { Skeleton } from "../ui/skeleton";

const GetYoutubeData = ({ youtubeData, more, limit }: any) => {
    const dataToDisplay = limit ? youtubeData.slice(0, limit) : youtubeData;
    return (
        <div>
            {/* <Button disabled={loading} onClick={getData}>
                {loading ? 'Getting data' : 'Get'}
            </Button> */}
            {/* {youtubeData.length === 0 ? (
                <p>No data available</p>
            ) : (
                <ul>
                    {youtubeData.slice(0, 10).map((item) => (
                        <div key={item.id}>
                            <p>Date: {item.date || "N/A"}</p>
                            <p>Channel Title: {item.channelTitle || "N/A"}</p>
                            <p>Video Title: {item.videoTitle || "N/A"}</p>
                            <Link href={item.videoUrl || "#"} target="_blank">Video URL</Link>
                            <br />
                            <div className=" line-clamp-1">
                                <p >Video Transcript: {item.videoTranscript || "N/A"}</p>
                            </div>
                            <div className=" line-clamp-1">
                                <p>Summary: {item.videoSummary || "N/A"}</p>
                            </div>
                            <p>PeopleDatabase: {item.peopleDatabase || "N/A"}</p>
                            <p>ToolDatabase: {item.toolDatabase || "N/A"}</p>
                            <p>CaseStudies: {item.caseStudies || "N/A"}</p>
                            <p>UseCases: {item.useCases || "N/A"}</p>
                            <p>Summary: {item.summary || "N/A"}</p>
                            <p>Implications: {item.implications || "N/A"}</p>
                            <p>ArticleIdeas: {item.articleIdeas || "N/A"}</p>
                            <p>Opportunities: {item.opportunities || "N/A"}</p>
                            <p>Risks: {item.risks || "N/A"}</p>
                            <p>Source_id: {item.source_id || "N/A"}</p>
                            <br />
                        </div>
                    ))}
                </ul>
            )} */}

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