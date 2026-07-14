"use client";

import { useState, useEffect } from "react";

interface DocumentInfo {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  datePublished: string;
  source: string;
  pageCount: number;
  metadata: {
    jurisdiction?: string;
    court?: string;
    caseNumber?: string;
    ircSection?: string;
    author?: string;
    citedDocuments?: string[];
  };
}

interface SummaryResult {
  summary: string;
  keyPoints: string[];
  citations: { pageNumber: number; excerpt: string }[];
  relatedDocuments: { id: string; title: string; relationship: string }[];
}

const categoryColors: Record<string, string> = {
  act: "bg-blue-100 text-blue-800 border-blue-200",
  judgment: "bg-purple-100 text-purple-800 border-purple-200",
  pov: "bg-amber-100 text-amber-800 border-amber-200",
  tax: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const categoryLabels: Record<string, string> = {
  act: "Act / Statute",
  judgment: "Court Judgment",
  pov: "Commentary",
  tax: "Tax Document",
};

export default function DocumentBrowser() {
  const [documents, setDocuments] = useState<DocumentInfo[]>([]);
  const [filteredDocs, setFilteredDocs] = useState<DocumentInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<DocumentInfo | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    let filtered = documents;
    if (selectedCategory) {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(term) ||
          d.source.toLowerCase().includes(term) ||
          d.subcategory.toLowerCase().includes(term)
      );
    }
    setFilteredDocs(filtered);
  }, [documents, selectedCategory, searchTerm]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/search");
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      console.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async (doc: DocumentInfo) => {
    setSelectedDoc(doc);
    setSummary(null);
    setSummarizing(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: doc.id }),
      });

      if (!res.ok) throw new Error("Failed to generate summary");
      const data: SummaryResult = await res.json();
      setSummary(data);
    } catch {
      console.error("Summarization failed");
    } finally {
      setSummarizing(false);
    }
  };

  const categoryCounts = documents.reduce(
    (acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse-subtle text-sm text-slate-500">
          Loading documents...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* filter controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              !selectedCategory
                ? "bg-[#1e3a5f] text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All ({documents.length})
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() =>
                setSelectedCategory(selectedCategory === key ? "" : key)
              }
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === key
                  ? "bg-[#1e3a5f] text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {label} ({categoryCounts[key] || 0})
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Filter by title or source..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ml-auto px-3 py-1.5 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 w-64"
        />
      </div>

      {/* document grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedDoc?.id === doc.id
                ? "border-[#1e3a5f] ring-1 ring-[#1e3a5f]/20"
                : "border-slate-200"
            }`}
            onClick={() => handleSummarize(doc)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                      categoryColors[doc.category] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {categoryLabels[doc.category]}
                  </span>
                  <span className="text-xs text-slate-400">
                    {doc.pageCount} pages
                  </span>
                </div>
                <h4 className="text-sm font-medium text-slate-800 truncate">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{doc.source}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {doc.datePublished}
                  {doc.metadata.jurisdiction &&
                    ` | ${doc.metadata.jurisdiction}`}
                </p>
              </div>
              {doc.metadata.citedDocuments &&
                doc.metadata.citedDocuments.length > 0 && (
                  <span className="text-xs text-slate-400 shrink-0">
                    {doc.metadata.citedDocuments.length} refs
                  </span>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* summary panel */}
      {selectedDoc && (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1e3a5f]">
              {selectedDoc.title}
            </h3>
            <button
              onClick={() => {
                setSelectedDoc(null);
                setSummary(null);
              }}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Close
            </button>
          </div>

          {summarizing ? (
            <div className="flex items-center gap-2 py-8 justify-center">
              <svg
                className="animate-spin h-5 w-5 text-[#1e3a5f]"
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
              <span className="text-sm text-slate-500">
                Generating summary...
              </span>
            </div>
          ) : summary ? (
            <div className="space-y-4">
              <div className="prose-legal text-sm text-slate-700 whitespace-pre-wrap">
                {summary.summary}
              </div>

              {summary.keyPoints.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Key Points
                  </h4>
                  <ul className="space-y-1">
                    {summary.keyPoints.map((point, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-600 flex items-start gap-2"
                      >
                        <span className="text-[#c9a84c] mt-0.5">*</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.relatedDocuments.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">
                    Related Documents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {summary.relatedDocuments.map((rd, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-600"
                      >
                        {rd.title}{" "}
                        <span className="text-slate-400">
                          ({rd.relationship})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
