// gemini Q&A and summarization with citations

import { GoogleGenerativeAI } from "@google/generative-ai";
import { type DocumentChunk } from "./documents";
import { type HybridSearchResult } from "./hybridSearch";
import { type RelatedDocument } from "./graphRag";

function getGeminiClient(): GoogleGenerativeAI {
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
}

export interface AnswerWithCitations {
  answer: string;
  citations: Citation[];
  confidence: number;
  searchMode: string;
}

export interface Citation {
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  excerpt: string;
  relevanceScore: number;
}

export interface SummaryResult {
  summary: string;
  keyPoints: string[];
  citations: Citation[];
  relatedDocuments: { id: string; title: string; relationship: string }[];
}

function buildContextFromResults(
  results: HybridSearchResult[],
  relatedDocs?: RelatedDocument[]
): string {
  let context = "";

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    context += `[Source ${i + 1}] Document: "${r.chunk.docTitle}" | Page ${r.chunk.pageNumber} | Category: ${r.chunk.category}\n`;
    context += `${r.chunk.content}\n\n`;
  }

  if (relatedDocs && relatedDocs.length > 0) {
    context += "\n--- Related Documents (from citation graph) ---\n";
    for (const rd of relatedDocs.slice(0, 5)) {
      const firstPage = rd.document.pages[0];
      if (firstPage) {
        context += `[Related] "${rd.document.title}" (${rd.relationship}, ${rd.direction})\n`;
        context += `${firstPage.content.slice(0, 500)}\n\n`;
      }
    }
  }

  return context;
}

function extractCitations(results: HybridSearchResult[]): Citation[] {
  return results.map((r) => ({
    documentId: r.chunk.docId,
    documentTitle: r.chunk.docTitle,
    pageNumber: r.chunk.pageNumber,
    excerpt:
      r.chunk.content.length > 200
        ? r.chunk.content.slice(0, 200) + "..."
        : r.chunk.content,
    relevanceScore: r.hybridScore,
  }));
}

export async function generateAnswer(
  query: string,
  searchResults: HybridSearchResult[],
  relatedDocs?: RelatedDocument[],
  searchMode: string = "hybrid"
): Promise<AnswerWithCitations> {
  const context = buildContextFromResults(searchResults, relatedDocs);
  const citations = extractCitations(searchResults);

  const systemPrompt = `You are a legal research assistant specializing in US tax law, federal statutes, and court decisions. Your role is to provide accurate, well-cited answers based on the provided legal documents.

Rules:
1. Only use information from the provided source documents. Do not rely on external knowledge.
2. Cite specific documents and page numbers when making claims. Use the format: (Document Title, Page X).
3. If the sources do not contain enough information to fully answer the question, say so clearly.
4. Use precise legal terminology appropriate for a professional audience.
5. Structure your answer logically, starting with the direct answer, then supporting details.
6. Do not use em dashes. Use commas, semicolons, or separate sentences instead.
7. Keep language clear and professional. Avoid filler phrases.`;

  const userPrompt = `Based on the following legal documents, answer this question:

Question: ${query}

Sources:
${context}

Provide a thorough, well-cited answer. Reference specific documents and page numbers.`;

  const model = getGeminiClient().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2000,
    },
  });

  const answer =
    result.response.text() || "Unable to generate an answer.";

  // rough confidence from search scores
  const avgScore =
    searchResults.length > 0
      ? searchResults.reduce((sum, r) => sum + r.hybridScore, 0) /
        searchResults.length
      : 0;
  const confidence = Math.min(avgScore * 50, 0.95); // clamp to 0-0.95

  return {
    answer,
    citations,
    confidence,
    searchMode,
  };
}

export async function generateSummary(
  documentId: string,
  chunks: DocumentChunk[],
  relatedDocs?: RelatedDocument[]
): Promise<SummaryResult> {
  if (chunks.length === 0) {
    return {
      summary: "No content found for the specified document.",
      keyPoints: [],
      citations: [],
      relatedDocuments: [],
    };
  }

  const docTitle = chunks[0].docTitle;
  const fullContent = chunks
    .sort((a, b) => a.pageNumber - b.pageNumber)
    .map((c) => `[Page ${c.pageNumber}]\n${c.content}`)
    .join("\n\n");

  const relatedContext =
    relatedDocs && relatedDocs.length > 0
      ? "\n\nRelated documents in the citation network:\n" +
        relatedDocs
          .slice(0, 5)
          .map((rd) => `- "${rd.document.title}" (${rd.relationship})`)
          .join("\n")
      : "";

  const systemPrompt = `You are a legal research assistant. Summarize the following legal document clearly and accurately.

Rules:
1. Provide a thorough summary covering all major provisions, holdings, or arguments.
2. Extract the key points as a list.
3. Reference specific page numbers when discussing particular provisions.
4. Use precise legal terminology.
5. Do not use em dashes. Use commas, semicolons, or separate sentences instead.
6. Keep the summary professional and concise while being thorough.`;

  const userPrompt = `Summarize this legal document:

Title: ${docTitle}

Content:
${fullContent}
${relatedContext}

Provide:
1. A full summary (2-4 paragraphs)
2. Key points (5-8 bullet points)`;

  const model = getGeminiClient().getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2000,
    },
  });

  const content = result.response.text() || "";

  // extract key points
  const keyPointsMatch = content.match(
    /(?:key points?|bullet points?)[\s\S]*?((?:[-*]\s+.+\n?)+)/i
  );
  const keyPoints = keyPointsMatch
    ? keyPointsMatch[1]
        .split(/[-*]\s+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
    : [];

  // summary text (before key points)
  const summaryPart =
    content
      .split(/(?:key points?|bullet points?)/i)[0]
      ?.trim() || content;

  const citations: Citation[] = chunks.map((c) => ({
    documentId: c.docId,
    documentTitle: c.docTitle,
    pageNumber: c.pageNumber,
    excerpt:
      c.content.length > 150 ? c.content.slice(0, 150) + "..." : c.content,
    relevanceScore: 1,
  }));

  const relatedDocuments = relatedDocs
    ? relatedDocs.slice(0, 10).map((rd) => ({
        id: rd.document.id,
        title: rd.document.title,
        relationship: rd.relationship,
      }))
    : [];

  return {
    summary: summaryPart,
    keyPoints,
    citations,
    relatedDocuments,
  };
}
