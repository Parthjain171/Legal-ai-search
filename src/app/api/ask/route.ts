// Q&A endpoint: question in, cited answer out

import { type NextRequest } from "next/server";
import { hybridSearch } from "@/lib/hybridSearch";
import { getRelatedDocuments } from "@/lib/graphRag";
import { generateAnswer } from "@/lib/llm";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, mode = "hybrid", topK = 8, category } = body;

    if (
      !question ||
      typeof question !== "string" ||
      question.trim().length === 0
    ) {
      return Response.json(
        { error: "Question parameter is required" },
        { status: 400 }
      );
    }

    // retrieve relevant chunks
    const searchResults = await hybridSearch(
      question.trim(),
      mode,
      topK,
      category
    );

    // pull related docs from citation graph
    const seenDocs = new Set<string>();
    const allRelated = [];
    for (const result of searchResults.slice(0, 3)) {
      if (seenDocs.has(result.chunk.docId)) continue;
      seenDocs.add(result.chunk.docId);
      const related = getRelatedDocuments(result.chunk.docId, 1);
      allRelated.push(...related);
    }

    // generate answer with retrieved context
    const answer = await generateAnswer(
      question.trim(),
      searchResults,
      allRelated,
      mode
    );

    return Response.json({
      question: question.trim(),
      answer: answer.answer,
      confidence: Number(answer.confidence.toFixed(3)),
      searchMode: answer.searchMode,
      citations: answer.citations.map((c) => ({
        documentId: c.documentId,
        documentTitle: c.documentTitle,
        pageNumber: c.pageNumber,
        excerpt: c.excerpt,
        relevanceScore: Number(c.relevanceScore.toFixed(4)),
      })),
      relatedDocuments: allRelated.slice(0, 5).map((r) => ({
        documentId: r.document.id,
        title: r.document.title,
        relationship: r.relationship,
        direction: r.direction,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Ask error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
