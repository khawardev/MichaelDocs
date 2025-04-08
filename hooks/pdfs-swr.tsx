'use client'
import { fetchAirtablePdfData } from "@/actions/pdf-actions";
import useSWR from "swr";


const pdfsDatafetcher = async () => {
    const data = await fetchAirtablePdfData();
    return data;
};
export function getPDFsSwr() {
    const { data: allData, error, isLoading } = useSWR('pdfsData', pdfsDatafetcher);
    return {
        pdfsData: allData,
        isLoading,
        isError: error
    }
}
