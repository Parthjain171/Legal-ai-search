// citation graph data for visualization

import { type NextRequest } from "next/server";
import {
  getGraphForVisualization,
  getGraphStats,
  getRelatedDocuments,
} from "@/lib/graphRag";
import { getDocumentById } from "@/lib/documents";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const docId = searchParams.get("docId");

  try {
    if (docId) {
      // single doc relationships
      const document = getDocumentById(docId);
      if (!document) {
        return Response.json(
          { error: `Document not found: ${docId}` },
          { status: 404 }
        );
      }

      const related = getRelatedDocuments(docId, 2);
      return Response.json({
        document: {
          id: document.id,
          title: document.title,
          category: document.category,
        },
        relatedDocuments: related.map((r) => ({
          id: r.document.id,
          title: r.document.title,
          category: r.document.category,
          relationship: r.relationship,
          direction: r.direction,
          depth: r.depth,
        })),
      });
    }

    // full graph
    const graph = getGraphForVisualization();
    const stats = getGraphStats();

    return Response.json({
      stats,
      graph,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
