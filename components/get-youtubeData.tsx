"use client";

import { useEffect, useState } from "react";
import { fetchYoutubeData } from "@/actions/airtable";
import Link from "next/link";
import { Button } from "./ui/button";

const GetYoutubeData = () => {
    const [youtubeData, setYoutubeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        const data = await fetchYoutubeData();
        setYoutubeData(data);
        setLoading(false);
    };

    console.log(youtubeData, '--youtubeData')

    return (
        <div>
            <h1>Youtube Table Data</h1>
            <Button disabled={loading} onClick={getData}>
                {loading ? 'Getting data' : 'Get'}
            </Button>
            {youtubeData.length === 0 ? (
                <p>No data available</p>
            ) : (
                <ul>
                    {youtubeData.map((item) => (
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
                            <br />
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GetYoutubeData;