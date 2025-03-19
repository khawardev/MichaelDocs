import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const apiKey = process.env.PINECONE_API_KEY;
        if (!apiKey) {
            throw new Error('Pinecone API key is missing. Set PINECONE_API_KEY in environment variables.');
        }

        const pc = new Pinecone({ apiKey });
        const assistantName = 'michaelpineconeassistant';
        const assistant:any = pc.assistant(assistantName);

        if (!assistant) {
            throw new Error(`Assistant '${assistantName}' not found.`);
        }

        const fileUrl = 'https://drive.google.com/file/d/12X6E2Y4DPpMYjgbVxA_KQ5mA8SptlwEt/view?usp=drivesdk';
        const metadata = { published: '2025-03-18', document_type: 'manuscript' };

        const response = await assistant.uploadFile({ url: fileUrl, metadata });

        if (!response || response.error) {
            throw new Error(response?.error || 'Unknown error during file upload.');
        }

        console.log('Upload successful:', response);
        return NextResponse.json({ message: 'File uploaded successfully', data: response });
    } catch (error: any) {
        console.error('Upload failed:', error.message || error);
        return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
    }
}
