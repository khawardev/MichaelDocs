import { fetchYoutubeData } from "@/actions/youtubeData-action";
import useSWR from "swr";

const fetcher = async () => {
    const data = await fetchYoutubeData();
    return data;
};

export function useYoutube() {
    const { data: allData, error, isLoading } = useSWR('youtubeData', fetcher);

    return {
        youtubeData: allData,
        isLoading,
        isError: error
    }
}