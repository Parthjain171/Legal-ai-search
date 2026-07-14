// vector embeddings + cosine similarity search via gemini-embedding-001

import { type DocumentChunk } from "./documents";
import { getChunkedDocuments } from "./chunker";

const EMBED_API = "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001";

function getApiKey(): string {
  return process.env.GEMINI_API_KEY || "";
}

export interface EmbeddedChunk extends DocumentChunk {
  embedding: number[];
}

export interface VectorSearchResult {
  chunk: DocumentChunk;
  score: number;
}

// in-memory store
let embeddingCache: EmbeddedChunk[] | null = null;
let isBuilding = false;
let buildPromise: Promise<void> | null = null;

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch(`${EMBED_API}:embedContent?key=${getApiKey()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "models/gemini-embedding-001",
      content: { parts: [{ text: text.slice(0, 8000) }] },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Embedding error: ${err}`);
  }

  const data = await response.json();
  return data.embedding.values;
}

async function generateEmbeddingsBatch(
  texts: string[]
): Promise<number[][]> {
  // batch in groups of 100
  const batchSize = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize).map((t) => t.slice(0, 8000));

    const response = await fetch(
      `${EMBED_API}:batchEmbedContents?key=${getApiKey()}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: batch.map((text) => ({
            model: "models/gemini-embedding-001",
            content: { parts: [{ text }] },
          })),
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Batch embedding error: ${err}`);
    }

    const data = await response.json();
    allEmbeddings.push(...data.embeddings.map((e: { values: number[] }) => e.values));
  }

  return allEmbeddings;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;
  return dotProduct / denominator;
}

export async function buildVectorIndex(): Promise<void> {
  if (embeddingCache) return;
  if (isBuilding && buildPromise) {
    await buildPromise;
    return;
  }

  isBuilding = true;
  buildPromise = (async () => {
    const chunks = getChunkedDocuments();
    const texts = chunks.map((c) => c.content);
    const embeddings = await generateEmbeddingsBatch(texts);

    embeddingCache = chunks.map((chunk, i) => ({
      ...chunk,
      embedding: embeddings[i],
    }));

    isBuilding = false;
  })();

  await buildPromise;
}

export async function vectorSearch(
  query: string,
  topK: number = 10,
  categoryFilter?: string
): Promise<VectorSearchResult[]> {
  await buildVectorIndex();

  if (!embeddingCache) {
    return [];
  }

  const queryEmbedding = await generateEmbedding(query);

  let candidates = embeddingCache;
  if (categoryFilter) {
    candidates = candidates.filter((c) => c.category === categoryFilter);
  }

  const scored = candidates.map((chunk) => ({
    chunk: {
      chunkId: chunk.chunkId,
      docId: chunk.docId,
      docTitle: chunk.docTitle,
      category: chunk.category,
      pageNumber: chunk.pageNumber,
      content: chunk.content,
      tokenCount: chunk.tokenCount,
    } as DocumentChunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export function isIndexReady(): boolean {
  return embeddingCache !== null;
}

export function getIndexSize(): number {
  return embeddingCache ? embeddingCache.length : 0;
}
