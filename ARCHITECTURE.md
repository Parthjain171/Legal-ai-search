# LegalAI Search: System Architecture

## Overview

RAG platform for US tax and legal docs. Combines hybrid search, a citation graph, and Gemini 2.5 Flash to answer legal questions with proper citations.

## Architecture diagram

```
                    User Query
                        |
                        v
               +----------------+
               |   Next.js UI   |
               |  (React + TW)  |
               +-------+--------+
                       |
                       v
               +----------------+
               |  API Routes    |
               | /search /ask   |
               | /summarize     |
               | /evaluate      |
               +-------+--------+
                       |
          +------------+------------+
          |            |            |
          v            v            v
   +----------+  +----------+  +----------+
   |  Vector  |  | BM25     |  | Graph    |
   |  Search  |  | Keyword  |  |   RAG    |
   | (Gemini  |  | Search   |  | (Citation|
   | Embed.)  |  | (TF-IDF) |  |  Network)|
   +----+-----+  +----+-----+  +----+-----+
        |              |              |
        +------+-------+              |
               |                      |
               v                      |
        +-----------+                 |
        | Reciprocal|                 |
        |   Rank    |                 |
        |  Fusion   |                 |
        +-----+-----+                |
              |                       |
              +-----------+-----------+
                          |
                          v
                  +--------------+
                  |   Context    |
                  |  Assembly    |
                  +--------------+
                          |
                          v
                  +--------------+
                  | Gemini 2.0   |
                  |    Flash     |
                  +--------------+
                          |
                          v
                  +--------------+
                  |   Answer +   |
                  |  Citations   |
                  +--------------+
```

## Data flow

### Document ingestion

1. **Source docs**: 100 legal documents in TypeScript (25 acts, 25 judgments, 25 commentaries, 25 tax docs). Each has page-level content for citation tracking.

2. **Chunking**: Split into ~300 token chunks with 50-token overlap at sentence boundaries. Each chunk keeps its doc ID, page number, and category.

3. **Embeddings**: Chunks are batch-embedded with `gemini-embedding-001` (768 dims). Stored in an in-memory vector index for cosine similarity search.

4. **BM25 index**: Chunks get tokenized and indexed with BM25 (k1=1.5, b=0.75). Legal stop words are stripped. DF/IDF scores are precomputed.

5. **Citation graph**: Cross-doc citation links come from document metadata. A directed graph tracks which docs cite, interpret, rely on, or implement other docs.

### Search

Three modes:

- **Hybrid** (default): Runs both vector and BM25, merges via Reciprocal Rank Fusion (k=60). Each result gets an RRF score of `1/(k + rank)` from each list, scores are summed and sorted.

- **Vector**: Cosine similarity between query and chunk embeddings. Good for conceptual / natural language queries.

- **Keyword**: BM25 lexical matching. Good for specific section numbers, case names, legal terms.

### Q&A pipeline

1. User asks a question
2. Hybrid search pulls top relevant chunks
3. Graph RAG walks the citation network from top results to find related docs
4. Context is assembled from search results + graph-connected docs
5. Gemini generates a cited answer using only the provided context
6. Response includes doc names and page numbers

### Summarization

1. All chunks for a doc are gathered and sorted by page
2. Related docs are pulled from the citation graph
3. Gemini writes a summary with key points, referencing specific pages
4. Cross-references to related docs are included

## Key components

| Component | File | What it does |
|-----------|------|--------------|
| Documents | `src/lib/documents.ts` | 100-doc dataset with page tracking |
| Chunker | `src/lib/chunker.ts` | sentence-aware chunking, keeps page refs |
| Embeddings | `src/lib/embeddings.ts` | vector embedding + cosine search |
| BM25 | `src/lib/bm25.ts` | keyword search with legal-tuned tokenization |
| Hybrid Search | `src/lib/hybridSearch.ts` | RRF combining vector + BM25 |
| Graph RAG | `src/lib/graphRag.ts` | citation graph traversal |
| LLM | `src/lib/llm.ts` | Gemini for Q&A and summaries |
| OKF | `src/lib/okf.ts` | Open Knowledge Format export |
| Evaluation | `src/lib/evaluation.ts` | golden set eval (retrieval accuracy + faithfulness) |

## Tech stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes (serverless)
- **LLM**: Google Gemini 2.5 Flash (answers, summaries)
- **Embeddings**: Google gemini-embedding-001 (768 dims)
- **Search**: custom hybrid retrieval (vector + BM25 + RRF)
- **Graph**: in-memory citation network with relationship inference
- **Deploy**: Vercel (serverless)

## Evaluation

The golden set has 20 queries across four categories (acts, judgments, commentaries, tax docs) at three difficulty levels (easy, medium, hard). Two metrics:

- **Retrieval Accuracy**: Recall@K, what fraction of expected source docs show up in the results.
- **Faithfulness**: Token overlap between generated answer and expected answer, checks if the response aligns with ground truth.

## OKF (Open Knowledge Format)

Exports the knowledge base as typed entities (statute, case_law, regulation, commentary) and typed relations (interprets, cites, implements, supports). Meant for interop with other legal knowledge systems.
