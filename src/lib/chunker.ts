// chunk docs into searchable segments, keep page refs

import { v4 as uuidv4 } from "uuid";
import {
  type LegalDocument,
  type DocumentChunk,
  type DocCategory,
  getAllDocuments,
} from "./documents";

const TARGET_CHUNK_SIZE = 300; // tokens per chunk
const CHUNK_OVERLAP = 50; // overlap for context

function estimateTokenCount(text: string): number {
  // ~4 chars per token
  return Math.ceil(text.length / 4);
}

function splitTextIntoSentences(text: string): string[] {
  // split on sentence boundaries, keep citation patterns intact
  const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) || [text];
  return sentences.map((s) => s.trim()).filter((s) => s.length > 0);
}

export function chunkDocument(doc: LegalDocument): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  for (const page of doc.pages) {
    const sentences = splitTextIntoSentences(page.content);
    let currentChunk = "";
    let previousOverlap = "";

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const combined = currentChunk
        ? currentChunk + " " + sentence
        : previousOverlap
          ? previousOverlap + " " + sentence
          : sentence;

      if (estimateTokenCount(combined) > TARGET_CHUNK_SIZE && currentChunk) {
        // flush chunk
        chunks.push({
          chunkId: uuidv4(),
          docId: doc.id,
          docTitle: doc.title,
          category: doc.category,
          pageNumber: page.pageNumber,
          content: currentChunk,
          tokenCount: estimateTokenCount(currentChunk),
        });

        // overlap from tail of current chunk
        const overlapSentences = currentChunk.split(/[.!?]+\s*/);
        const overlapParts = overlapSentences.slice(-2);
        previousOverlap = overlapParts.join(". ").trim();
        if (previousOverlap && !previousOverlap.endsWith(".")) {
          previousOverlap += ".";
        }

        currentChunk = previousOverlap + " " + sentence;
      } else {
        currentChunk = combined;
      }
    }

    // last chunk for this page
    if (currentChunk.trim()) {
      chunks.push({
        chunkId: uuidv4(),
        docId: doc.id,
        docTitle: doc.title,
        category: doc.category,
        pageNumber: page.pageNumber,
        content: currentChunk.trim(),
        tokenCount: estimateTokenCount(currentChunk.trim()),
      });
    }
  }

  return chunks;
}

export function chunkAllDocuments(): DocumentChunk[] {
  const documents = getAllDocuments();
  const allChunks: DocumentChunk[] = [];

  for (const doc of documents) {
    const docChunks = chunkDocument(doc);
    allChunks.push(...docChunks);
  }

  return allChunks;
}

// cache, only chunk once
let cachedChunks: DocumentChunk[] | null = null;

export function getChunkedDocuments(): DocumentChunk[] {
  if (!cachedChunks) {
    cachedChunks = chunkAllDocuments();
  }
  return cachedChunks;
}

export function getChunksByDocId(docId: string): DocumentChunk[] {
  return getChunkedDocuments().filter((c) => c.docId === docId);
}

export function getChunksByCategory(category: DocCategory): DocumentChunk[] {
  return getChunkedDocuments().filter((c) => c.category === category);
}
