"use server";

import Airtable from "airtable";
import { getDriveClient } from '@/lib/googleDrive';
import { Readable } from 'stream';
import { revalidatePath } from "next/cache";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID as string
);

export const insertPdfDataIntoAirtable = async (name: any, sourceId: any, size: any, date: any, url: any) => {
   
    let createdRecord:any;
    try {
         createdRecord = await base("Upload Pdfs Table").create({
            "Name": name,
            "Source ID": sourceId,
            "Size": size,
            "Date": date,
            "PDF File Url": url,
        });
     
    } catch (error) {
        console.error("Error inserting PDF data:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        };
    }
    revalidatePath('/pinecone-assistant')
    return createdRecord;
};



export async function uploadToGoogleDrive(file: File) {
    let folderId = process.env.GDRIVE_FOLDER_ID
    const drive = getDriveClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    const uploadedFile = await drive.files.create({
        requestBody: {
            name: file.name,
            mimeType: file.type,
            parents: folderId ? [folderId] : [],
        },
        media: {
            mimeType: file.type,
            body: stream,
        },
        fields: 'id, webViewLink, webContentLink',
    }) as { data: { id: string; webViewLink: string; webContentLink: string } };

    const fileId = uploadedFile.data.id;

    await drive.permissions.create({
        fileId: fileId!,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    const fileMeta = await drive.files.get({
        fileId: fileId!,
        fields: 'webViewLink, webContentLink',
    });

    return fileMeta.data.webViewLink;
}



export async function uploadPDF(file: File, date: string, fileSize: string) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://api.chatpdf.com/v1/sources/add-file', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.NEXT_PUBLIC_CHATPDF_API_KEY!,
            },
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || 'Upload failed');

        const driveFileUrl = await uploadToGoogleDrive(file);
        insertPdfDataIntoAirtable(file.name, data.sourceId, fileSize, date, driveFileUrl);
    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, message: error.message };
    }
}


export const fetchAirtablePdfData = (async function () {
    try {
        const records = await base("Upload Pdfs Table")
            .select({
                view: "Grid view",
                fields: [
                    "Name",
                    "Source ID",
                    "Size",
                    "Date",
                    "PDF File Url",
                ],
            })
            .all();

        return records.map((record) => ({
            id: record.id,
            name: record.fields["Name"] || "N/A",
            sourceId: record.fields["Source ID"] || "N/A",
            size: record.fields["Size"] || "N/A",
            date: record.fields["Date"] || "N/A",
            url: record.fields["PDF File Url"] || "#",
        })).reverse();

    } catch (error) {
        console.error("Error fetching PDF data:", error);
        return [];
    }
});
