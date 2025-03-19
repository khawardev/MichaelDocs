"use server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.SECRET_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export async function fetchYoutubeData() {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        maxRecords: 15,
        view: "Grid view",
        sort: [{ field: "Date", direction: "desc" }],
        fields: [
          "Date",
          "Channel Title",
          "Video Thumbnail",
          "Video Title",
          "Video URL",
          "Video Transcript",
          "Video Summary",
          "PeopleDatabase",
          "ToolDatabase",
          "CaseStudies",
          "UseCases",
          "Summary",
          "Implications",
          "ArticleIdeas",
          "Opportunities",
          "Risks",
        ],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      date: record.fields["Date"] || "N/A",
      channelTitle: record.fields["Channel Title"] || "N/A",
      videoTitle: record.fields["Video Title"] || "N/A",
      videoThumbnail: record.fields["Video Thumbnail"] || "#",
      videoUrl: record.fields["Video URL"] || "#",
      videoTranscript: record.fields["Video Transcript"] || "N/A",
      videoSummary: record.fields["Video Summary"] || "N/A",
      peopleDatabase: record.fields["PeopleDatabase"] || "N/A",
      toolDatabase: record.fields["ToolDatabase"] || "N/A",
      caseStudies: record.fields["CaseStudies"] || "N/A",
      useCases: record.fields["UseCases"] || "N/A",
      summary: record.fields["Summary"] || "N/A",
      implications: record.fields["Implications"] || "N/A",
      articleIdeas: record.fields["ArticleIdeas"] || "N/A",
      opportunities: record.fields["Opportunities"] || "N/A",
      risks: record.fields["Risks"] || "N/A",
    }));
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return [];
  }
}
