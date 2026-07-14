# LegalAI Search

Search across 100 US tax and legal documents using hybrid retrieval (vector + BM25 + graph RAG). Ask questions in plain language, get answers with page-level citations.

## What it does

- **Hybrid search**: vector search (Gemini embeddings) + BM25 keyword search, fused with Reciprocal Rank Fusion
- **Graph RAG**: citation graph connecting statutes, case law, commentaries, and tax docs
- **Q&A**: ask questions, get cited answers from Gemini 2.5 Flash grounded in the corpus
- **Summarization**: per-document summaries with key points and cross-refs
- **Eval harness**: golden set of 20 test queries, measures retrieval accuracy and faithfulness at three difficulty levels
- **OKF export**: Open Knowledge Format for interop with other legal knowledge systems
- **100 docs**: 25 acts, 25 judgments, 25 commentaries, 25 tax docs with page tracking

## Tech stack

- Next.js 16 (App Router, TypeScript)
- React 19, Tailwind CSS 4
- Google Gemini 2.5 Flash + gemini-embedding-001
- Custom hybrid search (vector + BM25 + RRF)
- In-memory citation graph

## Getting started

### Prerequisites

- Node.js 18+
- Google Gemini API key (free at https://aistudio.google.com/apikey)

### Install

```bash
git clone https://github.com/Parthjain171/Legal-AI-search.git
cd Legal-AI-search
npm install
```

### Config

```bash
cp .env.example .env.local
```

Set your key in `.env.local`:

```
GEMINI_API_KEY=your-gemini-key-here
```

### Dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    api/
      search/route.ts    # hybrid search endpoint
      ask/route.ts        # Q&A with citations
      summarize/route.ts  # doc summarization
      evaluate/route.ts   # golden set eval
      graph/route.ts      # citation graph data
    page.tsx              # main page
    layout.tsx            # root layout
  components/
    Header.tsx            # nav header
    SearchPanel.tsx       # search + Q&A UI
    DocumentBrowser.tsx   # doc listing + summaries
    GraphView.tsx         # citation graph explorer
    EvaluationPanel.tsx   # eval dashboard
  lib/
    documents.ts          # 100-doc legal dataset
    chunker.ts            # sentence-aware chunking
    embeddings.ts         # vector embedding + search
    bm25.ts               # BM25 keyword search
    hybridSearch.ts       # reciprocal rank fusion
    graphRag.ts           # citation graph traversal
    llm.ts                # Gemini integration
    okf.ts                # open knowledge format
    evaluation.ts         # golden set eval engine
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design, data flow, and component details.

## Deploy

Works on Vercel out of the box:

```bash
npm i -g vercel
vercel
```

Set `GEMINI_API_KEY` in your Vercel project settings.

## License

MIT
