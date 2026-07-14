// summarize a legal doc with key points + cross-refs

import { type NextRequest } from "next/server";
import { getDocumentById } from "@/lib/documents";
import { getChunksByDocId } from "@/lib/chunker";
import { getRelatedDocuments } from "@/lib/graphRag";
import { generateSummary } from "@/lib/llm";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId } = body;

    if (
      !documentId ||
      typeof documentId !== "string"
    ) {
      return Response.json(
        { error: "documentId parameter is required" },
        { status: 400 }
      );
    }

    const document = getDocumentById(documentId);
    if (!document) {
      return Response.json(
        { error: `Document not found: ${documentId}` },
        { status: 404 }
      );
    }

    // chunks for this doc
    const chunks = getChunksByDocId(documentId);

    // related docs from citation graph
    const relatedDocs = getRelatedDocuments(documentId, 1);

    // generate summary
    const summary = await generateSummary(documentId, chunks, relatedDocs);

    return Response.json({
      documentId,
      documentTitle: document.title,
      category: document.category,
      source: document.source,
      summary: summary.summary,
      keyPoints: summary.keyPoints,
      citations: summary.citations.map((c) => ({
        pageNumber: c.pageNumber,
        excerpt: c.excerpt,
      })),
      relatedDocuments: summary.relatedDocuments,
      metadata: {
        pageCount: document.pages.length,
        chunkCount: chunks.length,
        datePublished: document.datePublished,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Summarize error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
