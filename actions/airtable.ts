"use server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.SECRET_API_TOKEN }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export async function fetchYoutubeData() {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        maxRecords: 1000, // Limit to 10 records, adjust as needed
        view: "Grid view",
        fields: [
          "Date",
          "Channel Title",
          "Channel Url",
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
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return [];
  }
}
