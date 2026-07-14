// golden set eval endpoint

import { type NextRequest } from "next/server";
import {
  runEvaluation,
  GOLDEN_SET,
  type GoldenSetEntry,
} from "@/lib/evaluation";
import { type SearchMode } from "@/lib/hybridSearch";
import { getGraphStats } from "@/lib/graphRag";
import { getChunkedDocuments } from "@/lib/chunker";
import { getAllDocuments } from "@/lib/documents";
import { buildOKFKnowledgeBase } from "@/lib/okf";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode = "hybrid", subset } = body;

    const validModes: SearchMode[] = ["hybrid", "vector", "keyword"];
    if (!validModes.includes(mode)) {
      return Response.json(
        { error: "Mode must be one of: hybrid, vector, keyword" },
        { status: 400 }
      );
    }

    // optional subset
    let entries: GoldenSetEntry[] | undefined;
    if (subset && Array.isArray(subset)) {
      entries = GOLDEN_SET.filter((e) => subset.includes(e.id));
    }

    const evaluation = await runEvaluation(mode as SearchMode, entries);

    return Response.json(evaluation);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Evaluation error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}

// GET: system stats + golden set definition
export async function GET() {
  try {
    const documents = getAllDocuments();
    const chunks = getChunkedDocuments();
    const graphStats = getGraphStats();
    const okf = buildOKFKnowledgeBase();

    return Response.json({
      system: {
        totalDocuments: documents.length,
        totalChunks: chunks.length,
        categories: {
          acts: documents.filter((d) => d.category === "act").length,
          judgments: documents.filter((d) => d.category === "judgment").length,
          povs: documents.filter((d) => d.category === "pov").length,
          taxDocs: documents.filter((d) => d.category === "tax").length,
        },
        graph: graphStats,
        okf: {
          entities: okf.entityCount,
          relations: okf.relationCount,
          version: okf.version,
        },
      },
      goldenSet: GOLDEN_SET.map((e) => ({
        id: e.id,
        question: e.question,
        expectedDocumentIds: e.expectedDocumentIds,
        category: e.category,
        difficulty: e.difficulty,
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
