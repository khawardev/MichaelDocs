'use client'
import { fetchYoutubeData, fetchYoutubeDataByID } from "@/actions/youtubeData-action";
import useSWR from "swr";

const youtubeDatafetcher = async () => {
    const data = await fetchYoutubeData();
    return data;
};
const youtubeDataIDfetcher = async (id: string) => {
    const data = await fetchYoutubeDataByID(id);
    return data;
};

export function getYoutubeSwr() {
    const { data: allData, error, isLoading } = useSWR('youtubeData', youtubeDatafetcher);

    return {
        youtubeData: allData,
        isLoading,
        isError: error
    }
}


export function getYoutubeDataIDSwr(id: string) {
    const { data: allData, error, isLoading } = useSWR(['youtubeDataID', id], () => youtubeDataIDfetcher(id));
    return {
        youtubeDataByID: allData,
        isLoading,
        isError: error
    }
}