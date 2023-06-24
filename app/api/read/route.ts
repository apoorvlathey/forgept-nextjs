import { NextRequest, NextResponse } from "next/server";
import { PineconeClient } from "@pinecone-database/pinecone";
import { queryPineconeVectorStore } from "../../../utils";
import { indexName } from "../../../config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || "",
    environment: process.env.PINECONE_ENVIRONMENT || "",
  });

  const text = await queryPineconeVectorStore(
    client,
    indexName,
    body.question,
    body.queryEmbedding
  );

  return NextResponse.json({
    data: text,
  });
}
