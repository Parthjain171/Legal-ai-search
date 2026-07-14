"use client";

import { useState } from "react";

interface Citation {
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  excerpt: string;
  relevanceScore: number;
}

interface SearchResult {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  category: string;
  pageNumber: number;
  content: string;
  scores: { hybrid: number; vector: number; bm25: number };
  ranks: { vector: number; bm25: number };
}

interface AskResponse {
  question: string;
  answer: string;
  confidence: number;
  searchMode: string;
  citations: Citation[];
  relatedDocuments: {
    documentId: string;
    title: string;
    relationship: string;
    direction: string;
  }[];
}

type Mode = "hybrid" | "vector" | "keyword";
type TabMode = "ask" | "search";

const categoryColors: Record<string, string> = {
  act: "bg-blue-100 text-blue-800",
  judgment: "bg-purple-100 text-purple-800",
  pov: "bg-amber-100 text-amber-800",
  tax: "bg-emerald-100 text-emerald-800",
};

const categoryLabels: Record<string, string> = {
  act: "Act / Statute",
  judgment: "Court Judgment",
  pov: "Commentary",
  tax: "Tax Document",
};

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("hybrid");
  const [category, setCategory] = useState("");
  const [tabMode, setTabMode] = useState<TabMode>("ask");
  const [loading, setLoading] = useState(false);
  const [askResult, setAskResult] = useState<AskResponse | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setAskResult(null);
    setSearchResults([]);

    try {
      if (tabMode === "ask") {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: query,
            mode,
            category: category || undefined,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to get answer");
        }

        const data: AskResponse = await res.json();
        setAskResult(data);
      } else {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            mode,
            topK: 15,
            category: category || undefined,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Search failed");
        }

        const data = await res.json();
        setSearchResults(data.results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTabMode("ask")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tabMode === "ask"
              ? "bg-[#1e3a5f] text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Ask a Question
        </button>
        <button
          onClick={() => setTabMode("search")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tabMode === "search"
              ? "bg-[#1e3a5f] text-white"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Search Documents
        </button>
      </div>

      {/* search form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              tabMode === "ask"
                ? "Ask a legal question, e.g., What are the requirements for a like-kind exchange under Section 1031?"
                : "Search for legal documents, e.g., transfer pricing arm's length standard"
            }
            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f] resize-none"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">
              Search Mode:
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
            >
              <option value="hybrid">Hybrid (Vector + BM25)</option>
              <option value="vector">Vector Search Only</option>
              <option value="keyword">Keyword (BM25) Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
            >
              <option value="">All Categories</option>
              <option value="act">Acts & Statutes</option>
              <option value="judgment">Court Judgments</option>
              <option value="pov">Commentaries</option>
              <option value="tax">Tax Documents</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="ml-auto px-6 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2a5080] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Processing...
              </span>
            ) : tabMode === "ask" ? (
              "Get Answer"
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {/* error display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* ask result */}
      {askResult && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1e3a5f]">Answer</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  Mode: {askResult.searchMode}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    askResult.confidence > 0.7
                      ? "bg-green-100 text-green-700"
                      : askResult.confidence > 0.4
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  Confidence: {(askResult.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="prose-legal text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {askResult.answer}
            </div>
          </div>

          {/* citations */}
          {askResult.citations.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">
                Sources ({askResult.citations.length})
              </h3>
              <div className="space-y-3">
                {askResult.citations.map((citation, i) => (
                  <div
                    key={i}
                    className="border border-slate-100 rounded-md p-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              categoryColors[
                                citation.documentId.split("-")[0]
                              ] || "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {categoryLabels[
                              citation.documentId.split("-")[0]
                            ] || citation.documentId.split("-")[0]}
                          </span>
                          <span className="text-xs text-slate-400">
                            Page {citation.pageNumber}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">
                          {citation.documentTitle}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {citation.excerpt}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0">
                        {(citation.relevanceScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* related documents from graph */}
          {askResult.relatedDocuments.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">
                Related Documents (Graph RAG)
              </h3>
              <div className="flex flex-wrap gap-2">
                {askResult.relatedDocuments.map((rd, i) => (
                  <div
                    key={i}
                    className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-600"
                  >
                    <span className="font-medium">{rd.title}</span>
                    <span className="text-slate-400 ml-1">
                      ({rd.relationship}, {rd.direction})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* search results */}
      {searchResults.length > 0 && (
        <div className="animate-fade-in space-y-3">
          <h3 className="text-sm font-semibold text-slate-600">
            {searchResults.length} results found
          </h3>
          {searchResults.map((result, i) => (
            <div
              key={result.chunkId}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-slate-400">
                      #{i + 1}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        categoryColors[result.category] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {categoryLabels[result.category] || result.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Page {result.pageNumber}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">
                    {result.documentTitle}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {result.content.length > 400
                      ? result.content.slice(0, 400) + "..."
                      : result.content}
                  </p>
                </div>
                <div className="shrink-0 text-right space-y-1">
                  <div className="text-xs text-slate-400">
                    <span className="font-medium text-[#1e3a5f]">
                      {(result.scores.hybrid * 100).toFixed(1)}
                    </span>{" "}
                    hybrid
                  </div>
                  {result.scores.vector > 0 && (
                    <div className="text-xs text-slate-400">
                      <span className="font-medium">
                        {(result.scores.vector * 100).toFixed(1)}
                      </span>{" "}
                      vector
                    </div>
                  )}
                  {result.scores.bm25 > 0 && (
                    <div className="text-xs text-slate-400">
                      <span className="font-medium">
                        {result.scores.bm25.toFixed(2)}
                      </span>{" "}
                      bm25
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* empty state */}
      {!loading && !askResult && searchResults.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            Start your legal research
          </h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Ask questions about US tax law, federal statutes, court decisions,
            or IRS publications. The system searches across 100 legal documents
            using hybrid retrieval with Graph RAG.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {[
              "What is gross income under Section 61?",
              "Like-kind exchange requirements",
              "Chevron deference doctrine",
              "FATCA reporting obligations",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  setTabMode("ask");
                }}
                className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
