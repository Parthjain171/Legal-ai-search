// BM25 keyword search

import { type DocumentChunk } from "./documents";
import { getChunkedDocuments } from "./chunker";

export interface BM25Result {
  chunk: DocumentChunk;
  score: number;
}

interface TokenizedDoc {
  chunk: DocumentChunk;
  tokens: string[];
}

const K1 = 1.5; // tf saturation
const B = 0.75; // length normalization

// stop words filtered from legal text
const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "to", "of", "in", "for",
  "on", "with", "at", "by", "from", "as", "into", "through", "during",
  "before", "after", "above", "below", "between", "out", "off", "over",
  "under", "again", "further", "then", "once", "here", "there", "when",
  "where", "why", "how", "all", "both", "each", "few", "more", "most",
  "other", "some", "such", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "just", "or", "and", "but", "if", "it",
  "its", "this", "that", "these", "those", "i", "me", "my", "we", "our",
  "you", "your", "he", "him", "his", "she", "her", "they", "them", "their",
  "what", "which", "who", "whom", "about", "also", "any",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

class BM25Index {
  private docs: TokenizedDoc[] = [];
  private avgDocLength: number = 0;
  private docFrequency: Map<string, number> = new Map();
  private totalDocs: number = 0;

  build(chunks: DocumentChunk[]) {
    this.docs = chunks.map((chunk) => ({
      chunk,
      tokens: tokenize(chunk.content),
    }));

    this.totalDocs = this.docs.length;

    // avg doc length for normalization
    const totalTokens = this.docs.reduce((sum, d) => sum + d.tokens.length, 0);
    this.avgDocLength = totalTokens / this.totalDocs;

    // doc frequency per term
    this.docFrequency.clear();
    for (const doc of this.docs) {
      const uniqueTokens = new Set(doc.tokens);
      for (const token of uniqueTokens) {
        this.docFrequency.set(token, (this.docFrequency.get(token) || 0) + 1);
      }
    }
  }

  search(
    query: string,
    topK: number = 10,
    categoryFilter?: string
  ): BM25Result[] {
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    let candidates = this.docs;
    if (categoryFilter) {
      candidates = candidates.filter(
        (d) => d.chunk.category === categoryFilter
      );
    }

    const scores: BM25Result[] = candidates.map((doc) => {
      let score = 0;

      for (const queryToken of queryTokens) {
        const df = this.docFrequency.get(queryToken) || 0;
        if (df === 0) continue;

        // idf
        const idf = Math.log(
          (this.totalDocs - df + 0.5) / (df + 0.5) + 1
        );

        // tf in this doc
        const tf = doc.tokens.filter((t) => t === queryToken).length;

        // bm25 score
        const tfNorm =
          (tf * (K1 + 1)) /
          (tf + K1 * (1 - B + B * (doc.tokens.length / this.avgDocLength)));

        score += idf * tfNorm;
      }

      return { chunk: doc.chunk, score };
    });

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, topK);
  }
}

// singleton
let bm25Index: BM25Index | null = null;

export function buildBM25Index(): void {
  if (bm25Index) return;
  const chunks = getChunkedDocuments();
  bm25Index = new BM25Index();
  bm25Index.build(chunks);
}

export function bm25Search(
  query: string,
  topK: number = 10,
  categoryFilter?: string
): BM25Result[] {
  buildBM25Index();
  if (!bm25Index) return [];
  return bm25Index.search(query, topK, categoryFilter);
}

export function isBM25Ready(): boolean {
  return bm25Index !== null;
}
