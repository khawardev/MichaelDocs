"use server";
import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID as string
);

export const fetchYoutubeData = (async function () {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        view: "Grid view",
        fields: ["Date", "Channel Title", "Video Title", "Video URL", "PDF Source ID",
        ],
      })
      .all();
    console.log('getted records');

    return records.map((record) => ({
      id: record.id, date: record.fields["Date"] || "N/A", channelTitle: record.fields["Channel Title"] || "N/A",
      videoTitle: record.fields["Video Title"] || "N/A", videoUrl: record.fields["Video URL"] || "#",
      source_id: record.fields["PDF Source ID"] || null,
    })).reverse();


  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return [];
  }
});


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
      source_id: record.fields["PDF Source ID"] || null,
    };
  } catch (error) {
    console.error("Error fetching Airtable data by ID:", error);
    return null;
  }
});


export const fetchYoutubeDataByTitle = async function (query: string) {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        view: "Grid view",
        fields: ["Channel Title", "Video URL", "Video Title",
        ],
      })
      .all();
    console.log('getted records');
    const lowerCaseQuery = query.toLowerCase();
    const filteredRecords = records.filter(record => {
      const videoTitleField = record.fields["Video Title"];
      const videoTitle = typeof videoTitleField === 'string' ? videoTitleField.toLowerCase() : '';
      return videoTitle.includes(lowerCaseQuery);
    });

    return filteredRecords.map((record) => ({
      id: record.id, channelTitle: record.fields["Channel Title"] || "N/A",
      videoUrl: record.fields["Video URL"] || "#",
      videoTitle: record.fields["Video Title"] || "N/A",
    })).reverse();

  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    return [];
  }
};



export const fetchYoutubeDataBySourceID = async function (query: string) {
  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME as string)
      .select({
        view: "Grid view",
        fields: ["Video Title", "PDF Source ID"],
      })
      .all();
    console.log('getted records');

    const lowerCaseQuery = query.toLowerCase();
    const filteredRecords = records.filter(record => {
      const sourceIdField = record.fields["PDF Source ID"];
      const sourceId = typeof sourceIdField === 'string' ? sourceIdField.toLowerCase() : '';
      return sourceId.includes(lowerCaseQuery);
    });

    return filteredRecords.map((record) => ({
      id: record.id,
      videoTitle: record.fields["Video Title"] || "N/A",
      sourceId: record.fields["PDF Source ID"] || null,
    })).reverse();

  } catch (error) {
    console.error("Error fetching Airtable data by PDF Source ID:", error);
    return [];
  }
};
