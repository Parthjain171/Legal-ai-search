// search endpoint: hybrid, vector, or keyword mode

import { type NextRequest } from "next/server";
import {
  hybridSearch,
  type SearchMode,
} from "@/lib/hybridSearch";
import { getRelatedDocuments } from "@/lib/graphRag";
import { getAllDocuments, getDocumentsByCategory } from "@/lib/documents";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query,
      mode = "hybrid",
      topK = 10,
      category,
      includeGraph = true,
    } = body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return Response.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const validModes: SearchMode[] = ["hybrid", "vector", "keyword"];
    if (!validModes.includes(mode)) {
      return Response.json(
        { error: "Mode must be one of: hybrid, vector, keyword" },
        { status: 400 }
      );
    }

    // search
    const results = await hybridSearch(
      query.trim(),
      mode as SearchMode,
      Math.min(topK, 50),
      category
    );

    // enrich with graph relationships if requested
    let graphRelations: Record<string, unknown[]> = {};
    if (includeGraph) {
      const seenDocs = new Set<string>();
      for (const result of results.slice(0, 5)) {
        if (seenDocs.has(result.chunk.docId)) continue;
        seenDocs.add(result.chunk.docId);

        const related = getRelatedDocuments(result.chunk.docId, 1);
        if (related.length > 0) {
          graphRelations[result.chunk.docId] = related.map((r) => ({
            documentId: r.document.id,
            title: r.document.title,
            category: r.document.category,
            relationship: r.relationship,
            direction: r.direction,
          }));
        }
      }
    }

    return Response.json({
      query: query.trim(),
      mode,
      totalResults: results.length,
      results: results.map((r) => ({
        chunkId: r.chunk.chunkId,
        documentId: r.chunk.docId,
        documentTitle: r.chunk.docTitle,
        category: r.chunk.category,
        pageNumber: r.chunk.pageNumber,
        content: r.chunk.content,
        scores: {
          hybrid: Number(r.hybridScore.toFixed(6)),
          vector: Number(r.vectorScore.toFixed(6)),
          bm25: Number(r.bm25Score.toFixed(4)),
        },
        ranks: {
          vector: r.vectorRank,
          bm25: r.bm25Rank,
        },
      })),
      graphRelations,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Search error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}

// GET: browse documents
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  try {
    const documents = category
      ? getDocumentsByCategory(category as "act" | "judgment" | "pov" | "tax")
      : getAllDocuments();

    return Response.json({
      totalDocuments: documents.length,
      documents: documents.map((doc) => ({
        id: doc.id,
        title: doc.title,
        category: doc.category,
        subcategory: doc.subcategory,
        datePublished: doc.datePublished,
        source: doc.source,
        pageCount: doc.pages.length,
        metadata: doc.metadata,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
