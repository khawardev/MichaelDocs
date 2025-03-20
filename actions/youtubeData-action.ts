"use server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export const fetchYoutubeData = (async function () {
  console.log('server starting...');
  
  try {
    console.log('getting records ...');
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        view: "Grid view",
        fields: ["Date", "Channel Title", "Video Title", "Video URL", "Video Transcript", "Video Summary", "PeopleDatabase",
          "ToolDatabase", "CaseStudies", "UseCases", "Summary", "Implications", "ArticleIdeas", "Opportunities",
          "Risks", "PDF Source ID",
        ],
      })
      .all();
    console.log('getted records');

    return records.map((record) => ({
      id: record.id, date: record.fields["Date"] || "N/A", channelTitle: record.fields["Channel Title"] || "N/A",
      videoTitle: record.fields["Video Title"] || "N/A", videoUrl: record.fields["Video URL"] || "#",
      videoTranscript: record.fields["Video Transcript"] || "N/A", videoSummary: record.fields["Video Summary"] || "N/A",
      peopleDatabase: record.fields["PeopleDatabase"] || "N/A", toolDatabase: record.fields["ToolDatabase"] || "N/A",
      caseStudies: record.fields["CaseStudies"] || "N/A", useCases: record.fields["UseCases"] || "N/A",
      summary: record.fields["Summary"] || "N/A", implications: record.fields["Implications"] || "N/A",
      articleIdeas: record.fields["ArticleIdeas"] || "N/A", opportunities: record.fields["Opportunities"] || "N/A",
      risks: record.fields["Risks"] || "N/A", source_id: record.fields["PDF Source ID"] || "N/A",
    })).reverse();
   

  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return [];
  }
});


// ... existing code ...

export const fetchYoutubeDataByID = (async function (id: string) {
  try {
    const record = await base(process.env.AIRTABLE_TABLE_NAME as string).find(id);

    return {
      id: record.id,
      date: record.fields["Date"] || "N/A",
      channelTitle: record.fields["Channel Title"] || "N/A",
      videoTitle: record.fields["Video Title"] || "N/A",
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
      source_id: record.fields["PDF Source ID"] || "N/A",
    };
  } catch (error) {
    console.error("Error fetching Airtable data by ID:", error);
    return null;
  }
});

// ... existing code ...