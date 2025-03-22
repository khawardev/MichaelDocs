'use server'
import { Pinecone } from '@pinecone-database/pinecone'
import { OpenAI } from 'openai'
import { ChatOpenAI } from "@langchain/openai";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string })
const openai: any = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string })

export const queryPinecone = async function (input: string) {

    try {
        const queryResponse: any = await queryDatabaseEmbeddings(input)
        if (!queryResponse.matches.length) {
            return { result: "No relevant information found in Database." };
        }
        const bestMatch: any = queryResponse.matches.reduce((prev: any, current: any) =>
            (prev.score > current.score ? prev : current)
        );

        const bestContent = bestMatch.metadata?.content || "No content available.";
        const bestTitle = bestMatch.metadata?.title || "No title available.";
        return await generateResponse(input, bestTitle as string, bestContent as string);

    } catch (error) {
        console.error("Error fetching Pinecone data:", error);
        return [];
    }
};

const queryDatabaseEmbeddings = async (input: string) => {
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: input
        });
        const queryEmbedding = embeddingResponse.data[0].embedding;
        const namespace = pc.index("michaelchatbot", "michaelchatbot-k1ircms.svc.aped-4627-b74a.pinecone.io").namespace("make_automations");
        const queryResponse = await namespace.query({
            topK: 3,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true,
        });
        return queryResponse;
    } catch (error) {
        return { result: "Error generating response from Database." };
    }
};


const generateResponse = async (query: string, title: string, content: string) => {
    try {
        const QA_TEMPLATE = `You are an AI assistant that strictly answers questions based on the provided content, you have to analyse the content, check the related question in the content , make an asnswer based on the content .
                            
                              Instructions:
                              1. **Only use the provided content** to answer the question.
                              2. **Do not generate or infer answers** that are not explicitly stated in the content.
                              3. If the question is **not related** to the content, reply with: "I am only trained to answer questions related to the provided content."
                              4. Your response must be **concise, factual, and directly relevant** to the question.
                                  
                              Content:  
                              ${content}
                                  
                              Question:  
                              ${query}
                                  
                              Answer in markdown format, but keep in mind that don't include precontext like markdown in begning of output, just give me only output`;
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: QA_TEMPLATE },
            ],
            temperature: 0,
        });

        return {
            result: response.choices[0].message.content,
        };
    } catch (error) {
        console.error("Error generating response:", error);
        return { result: "Error generating response." };
    }
};