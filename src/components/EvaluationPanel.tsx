"use client";

import { useState, useEffect } from "react";

interface GoldenSetEntry {
  id: number;
  question: string;
  expectedDocumentIds: string[];
  category: string;
  difficulty: string;
}

interface EvaluationResult {
  entryId: number;
  question: string;
  retrievalAccuracy: number;
  faithfulness: number;
  retrievedDocIds: string[];
  expectedDocIds: string[];
  generatedAnswer: string;
  expectedAnswer: string;
  searchMode: string;
}

interface SystemInfo {
  totalDocuments: number;
  totalChunks: number;
  categories: Record<string, number>;
  graph: {
    totalNodes: number;
    totalEdges: number;
    avgConnections: number;
  };
  okf: {
    entities: number;
    relations: number;
    version: string;
  };
}

export default function EvaluationPanel() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [goldenSet, setGoldenSet] = useState<GoldenSetEntry[]>([]);
  const [results, setResults] = useState<EvaluationResult[]>([]);
  const [avgAccuracy, setAvgAccuracy] = useState(0);
  const [avgFaithfulness, setAvgFaithfulness] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [mode, setMode] = useState("hybrid");
  const [selectedResult, setSelectedResult] = useState<EvaluationResult | null>(
    null
  );
  const [breakdown, setBreakdown] = useState<
    Record<string, { count: number; avgAccuracy: number; avgFaithfulness: number }>
  >({});

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = async () => {
    try {
      const res = await fetch("/api/evaluate");
      const data = await res.json();
      setSystemInfo(data.system);
      setGoldenSet(data.goldenSet || []);
    } catch {
      console.error("Failed to fetch system info");
    } finally {
      setLoadingInfo(false);
    }
  };

  const runEvaluation = async () => {
    setLoading(true);
    setResults([]);
    setSelectedResult(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });

      if (!res.ok) throw new Error("Evaluation failed");
      const data = await res.json();
      setResults(data.results || []);
      setAvgAccuracy(data.avgRetrievalAccuracy || 0);
      setAvgFaithfulness(data.avgFaithfulness || 0);
      setBreakdown(data.breakdown || {});
    } catch {
      console.error("Evaluation failed");
    } finally {
      setLoading(false);
    }
  };

  if (loadingInfo) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse-subtle text-sm text-slate-500">
          Loading system information...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* system stats */}
      {systemInfo && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {systemInfo.totalDocuments}
            </p>
            <p className="text-xs text-slate-500">Total Documents</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {systemInfo.totalChunks}
            </p>
            <p className="text-xs text-slate-500">Text Chunks</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {systemInfo.graph.totalEdges}
            </p>
            <p className="text-xs text-slate-500">Citation Links</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {systemInfo.okf.entities}
            </p>
            <p className="text-xs text-slate-500">OKF Entities</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {systemInfo.okf.relations}
            </p>
            <p className="text-xs text-slate-500">OKF Relations</p>
          </div>
        </div>
      )}

      {/* golden set overview */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-[#1e3a5f]">
              Golden Set Evaluation
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {goldenSet.length} test queries measuring Retrieval Accuracy and
              Faithfulness
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="px-3 py-1.5 text-sm border border-slate-200 rounded-md bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
            >
              <option value="hybrid">Hybrid Search</option>
              <option value="vector">Vector Only</option>
              <option value="keyword">Keyword Only</option>
            </select>

            <button
              onClick={runEvaluation}
              disabled={loading}
              className="px-4 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#2a5080] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  Running...
                </span>
              ) : (
                "Run Evaluation"
              )}
            </button>
          </div>
        </div>

        {/* golden set entries */}
        <div className="space-y-2">
          {goldenSet.map((entry) => {
            const result = results.find((r) => r.entryId === entry.id);
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-3 px-3 py-2 rounded border cursor-pointer transition-colors ${
                  selectedResult?.entryId === entry.id
                    ? "bg-[#1e3a5f]/5 border-[#1e3a5f]/20"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
                onClick={() => result && setSelectedResult(result)}
              >
                <span className="text-xs font-mono text-slate-400 w-6">
                  Q{entry.id}
                </span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                    entry.difficulty === "easy"
                      ? "bg-green-100 text-green-700"
                      : entry.difficulty === "medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {entry.difficulty}
                </span>
                <span className="text-sm text-slate-700 flex-1 truncate">
                  {entry.question}
                </span>
                {result && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        result.retrievalAccuracy >= 0.8
                          ? "bg-green-100 text-green-700"
                          : result.retrievalAccuracy >= 0.5
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      Ret: {(result.retrievalAccuracy * 100).toFixed(0)}%
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        result.faithfulness >= 0.7
                          ? "bg-green-100 text-green-700"
                          : result.faithfulness >= 0.4
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      Faith: {(result.faithfulness * 100).toFixed(0)}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* aggregate results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">
              Overall Metrics
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600">
                    Retrieval Accuracy
                  </span>
                  <span className="text-sm font-semibold text-[#1e3a5f]">
                    {(avgAccuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1e3a5f] rounded-full transition-all"
                    style={{ width: `${avgAccuracy * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600">Faithfulness</span>
                  <span className="text-sm font-semibold text-[#c9a84c]">
                    {(avgFaithfulness * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c9a84c] rounded-full transition-all"
                    style={{ width: `${avgFaithfulness * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">
              By Difficulty
            </h4>
            <div className="space-y-3">
              {Object.entries(breakdown).map(([level, stats]) => (
                <div key={level} className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium w-16 text-center ${
                      level === "easy"
                        ? "bg-green-100 text-green-700"
                        : level === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {level}
                  </span>
                  <span className="text-xs text-slate-400 w-8">
                    ({stats.count})
                  </span>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-12">
                      Ret: {(stats.avgAccuracy * 100).toFixed(0)}%
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1e3a5f] rounded-full"
                        style={{ width: `${stats.avgAccuracy * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs text-slate-500 w-12">
                      Faith: {(stats.avgFaithfulness * 100).toFixed(0)}%
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c9a84c] rounded-full"
                        style={{ width: `${stats.avgFaithfulness * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* selected result detail */}
      {selectedResult && (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#1e3a5f]">
              Q{selectedResult.entryId}: {selectedResult.question}
            </h3>
            <button
              onClick={() => setSelectedResult(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Generated Answer
              </h4>
              <p className="text-sm text-slate-700 whitespace-pre-wrap">
                {selectedResult.generatedAnswer}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Expected Answer
              </h4>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">
                {selectedResult.expectedAnswer}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>
                Retrieved docs: {selectedResult.retrievedDocIds.join(", ")}
              </span>
              <span>
                Expected docs: {selectedResult.expectedDocIds.join(", ")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
