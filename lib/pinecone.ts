import { OpenAI } from 'openai';
import { loadQAStuffChain } from 'langchain/chains';

export async function queryLLM(queryResponse: any, input: string) {
    const llm:any = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY as string,
    });

    const chain = loadQAStuffChain(llm);

    // Extract relevant content from Pinecone query response
    const concatenatedPageContent = queryResponse.matches
        .map((match: any) => match.metadata.content) // Using metadata.content directly
        .join('\n\n'); // Separate entries for better context

    // If no relevant content is found, return a default response
    if (!concatenatedPageContent) {
        return {
            result: "No relevant information available.",
            sources: []
        };
    }

    // Call LLM with processed content
    const result = await chain.call({
        input_documents: [{ pageContent: concatenatedPageContent }],
        question: input,
    }, {
        // Pass any additional configuration or callbacks if needed
    });

    return {
        result: result.text,
        sources: queryResponse.matches.map((match: any) => ({
            pageContent: match.metadata.content,
            score: match.score,
            title: match.metadata.title, 
        })),
    };
}
