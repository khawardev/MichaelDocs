"use server";

import { z } from "zod";

const YoutubeUrlSchema = z
  .string()
  .url()
  .refine(
    (url) => {
      try {
        const urlObj = new URL(url);
        return (
          urlObj.hostname.includes("youtube.com") ||
          urlObj.hostname.includes("youtu.be")
        );
      } catch {
        return false;
      }
    },
    { message: "Invalid YouTube URL" }
  );

export type ConversionResult = {
  success: boolean;
  data?: {
    title: string;
    duration: string;
    filesize: string;
    url: string;
  };
  error?: string;
};

export async function convertYoutubeToMp3(
  formData: FormData
): Promise<ConversionResult> {
  const youtubeUrl = formData.get("youtubeUrl");

  try {
    const parsedUrl = YoutubeUrlSchema.parse(youtubeUrl);

    // Encode the YouTube URL
    const encodedUrl = encodeURIComponent(parsedUrl);
    const apiUrl = `https://youtube-mp310.p.rapidapi.com/download/mp3?url=${encodedUrl}`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c536acb0fbmshbd2520ef7921196p1ce318jsndaaabf65aed4",
        "x-rapidapi-host": "youtube-mp310.p.rapidapi.com",
      },
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();

    return {
      success: true,
      data: {
        title: result.title || "Unknown Title",
        duration: result.duration || "Unknown Duration",
        filesize: result.filesize || "Unknown Size",
        url: result.link || "",
      },
    };
  } catch (error) {
    console.error("Conversion error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
