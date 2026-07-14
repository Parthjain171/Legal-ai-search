// hybrid search: vector + BM25 merged via reciprocal rank fusion

import { type DocumentChunk } from "./documents";
import { vectorSearch, type VectorSearchResult } from "./embeddings";
import { bm25Search, type BM25Result } from "./bm25";

export interface HybridSearchResult {
  chunk: DocumentChunk;
  hybridScore: number;
  vectorScore: number;
  bm25Score: number;
  vectorRank: number;
  bm25Rank: number;
}

export type SearchMode = "hybrid" | "vector" | "keyword";

// RRF constant (from the original paper)
const RRF_K = 60;

function reciprocalRankFusion(
  vectorResults: VectorSearchResult[],
  bm25Results: BM25Result[]
): HybridSearchResult[] {
  const scoreMap = new Map<
    string,
    {
      chunk: DocumentChunk;
      vectorScore: number;
      bm25Score: number;
      vectorRank: number;
      bm25Rank: number;
      rrfScore: number;
    }
  >();

  // rrf scores from vector results
  vectorResults.forEach((result, rank) => {
    const key = result.chunk.chunkId;
    const existing = scoreMap.get(key);
    const rrfContribution = 1 / (RRF_K + rank + 1);

    if (existing) {
      existing.vectorScore = result.score;
      existing.vectorRank = rank + 1;
      existing.rrfScore += rrfContribution;
    } else {
      scoreMap.set(key, {
        chunk: result.chunk,
        vectorScore: result.score,
        bm25Score: 0,
        vectorRank: rank + 1,
        bm25Rank: 0,
        rrfScore: rrfContribution,
      });
    }
  });

  // rrf scores from bm25 results
  bm25Results.forEach((result, rank) => {
    const key = result.chunk.chunkId;
    const existing = scoreMap.get(key);
    const rrfContribution = 1 / (RRF_K + rank + 1);

    if (existing) {
      existing.bm25Score = result.score;
      existing.bm25Rank = rank + 1;
      existing.rrfScore += rrfContribution;
    } else {
      scoreMap.set(key, {
        chunk: result.chunk,
        vectorScore: 0,
        bm25Score: result.score,
        vectorRank: 0,
        bm25Rank: rank + 1,
        rrfScore: rrfContribution,
      });
    }
  });

  // sort by fused score
  const results: HybridSearchResult[] = Array.from(scoreMap.values()).map(
    (entry) => ({
      chunk: entry.chunk,
      hybridScore: entry.rrfScore,
      vectorScore: entry.vectorScore,
      bm25Score: entry.bm25Score,
      vectorRank: entry.vectorRank,
      bm25Rank: entry.bm25Rank,
    })
  );

  results.sort((a, b) => b.hybridScore - a.hybridScore);
  return results;
}

export async function hybridSearch(
  query: string,
  mode: SearchMode = "hybrid",
  topK: number = 10,
  categoryFilter?: string
): Promise<HybridSearchResult[]> {
  const fetchCount = topK * 3; // overfetch for better fusion

  if (mode === "vector") {
    try {
      const vectorResults = await vectorSearch(query, topK, categoryFilter);
      return vectorResults.map((r, i) => ({
        chunk: r.chunk,
        hybridScore: r.score,
        vectorScore: r.score,
        bm25Score: 0,
        vectorRank: i + 1,
        bm25Rank: 0,
      }));
    } catch {
      // fall back to BM25 if vector search fails
      const bm25Results = bm25Search(query, topK, categoryFilter);
      return bm25Results.map((r, i) => ({
        chunk: r.chunk,
        hybridScore: r.score,
        bm25Score: r.score,
        vectorScore: 0,
        vectorRank: 0,
        bm25Rank: i + 1,
      }));
    }
  }

  if (mode === "keyword") {
    const bm25Results = bm25Search(query, topK, categoryFilter);
    return bm25Results.map((r, i) => ({
      chunk: r.chunk,
      hybridScore: r.score,
      bm25Score: r.score,
      vectorScore: 0,
      vectorRank: 0,
      bm25Rank: i + 1,
    }));
  }

  // hybrid: combine via RRF (falls back to BM25-only if vector search fails)
  const bm25Results = bm25Search(query, fetchCount, categoryFilter);

  let vectorResults: VectorSearchResult[] = [];
  try {
    vectorResults = await vectorSearch(query, fetchCount, categoryFilter);
  } catch {
    // vector search failed (rate limit, timeout, etc.), use BM25 only
    console.warn("Vector search unavailable, falling back to BM25-only");
    return bm25Results.slice(0, topK).map((r, i) => ({
      chunk: r.chunk,
      hybridScore: r.score,
      bm25Score: r.score,
      vectorScore: 0,
      vectorRank: 0,
      bm25Rank: i + 1,
    }));
  }

  const fused = reciprocalRankFusion(vectorResults, bm25Results);
  return fused.slice(0, topK);
}