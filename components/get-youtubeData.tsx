"use client";

import { useEffect, useState } from "react";
import { fetchYoutubeData } from "@/actions/airtable";

const GetYoutubeData = () => {
    const [youtubeData, setYoutubeData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            const data = await fetchYoutubeData(); // Fetch once when component mounts
            setYoutubeData(data);
            setLoading(false);
        };

        getData();
    }, []); // Empty dependency array ensures it runs only once

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Youtube Table Data</h1>
            <ul>
                {youtubeData.map((item) => (
                    <li key={item.id}>
                        <strong>{item.fields["Date"]}</strong> -{" "}
                        <strong>{item.fields["Video Title"]}</strong> -{" "}
                        <a href={item.fields["Video URL"]} target="_blank">
                            Watch Video
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetYoutubeData;
