"use client";

import { useState, useEffect } from "react";

interface GraphNode {
  id: string;
  label: string;
  category: string;
  connections: number;
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  avgConnections: number;
  mostCited: { id: string; title: string; count: number }[];
  relationshipCounts: Record<string, number>;
}

const categoryColorMap: Record<string, { bg: string; border: string; text: string }> = {
  act: { bg: "#dbeafe", border: "#3b82f6", text: "#1e40af" },
  judgment: { bg: "#ede9fe", border: "#8b5cf6", text: "#5b21b6" },
  pov: { bg: "#fef3c7", border: "#f59e0b", text: "#92400e" },
  tax: { bg: "#d1fae5", border: "#10b981", text: "#065f46" },
};

const categoryLabels: Record<string, string> = {
  act: "Acts & Statutes",
  judgment: "Court Judgments",
  pov: "Commentaries",
  tax: "Tax Documents",
};

export default function GraphView() {
  const [stats, setStats] = useState<GraphStats | null>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [relatedDocs, setRelatedDocs] = useState<
    {
      id: string;
      title: string;
      category: string;
      relationship: string;
      direction: string;
      depth: number;
    }[]
  >([]);

  useEffect(() => {
    fetchGraph();
  }, []);

  const fetchGraph = async () => {
    try {
      const res = await fetch("/api/graph");
      const data = await res.json();
      setStats(data.stats);
      setNodes(data.graph.nodes);
      setEdges(data.graph.edges);
    } catch {
      console.error("Failed to fetch graph");
    } finally {
      setLoading(false);
    }
  };

  const handleNodeClick = async (nodeId: string) => {
    setSelectedNode(nodeId);
    try {
      const res = await fetch(`/api/graph?docId=${nodeId}`);
      const data = await res.json();
      setRelatedDocs(data.relatedDocuments || []);
    } catch {
      console.error("Failed to fetch related docs");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-pulse-subtle text-sm text-slate-500">
          Loading citation graph...
        </div>
      </div>
    );
  }

  // group nodes by category
  const groupedNodes = nodes.reduce(
    (acc, node) => {
      if (!acc[node.category]) acc[node.category] = [];
      acc[node.category].push(node);
      return acc;
    },
    {} as Record<string, GraphNode[]>
  );

  return (
    <div className="space-y-6">
      {/* graph stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {stats.totalNodes}
            </p>
            <p className="text-xs text-slate-500">Documents</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {stats.totalEdges}
            </p>
            <p className="text-xs text-slate-500">Citation Links</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {stats.avgConnections.toFixed(1)}
            </p>
            <p className="text-xs text-slate-500">Avg Connections</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-2xl font-bold text-[#1e3a5f]">
              {Object.keys(stats.relationshipCounts).length}
            </p>
            <p className="text-xs text-slate-500">Relationship Types</p>
          </div>
        </div>
      )}

      {/* relationship type breakdown */}
      {stats && (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Relationship Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.relationshipCounts)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <span
                  key={type}
                  className="text-xs px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-slate-600"
                >
                  {type}: {count}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* most cited documents */}
      {stats && stats.mostCited.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Most Cited Documents
          </h3>
          <div className="space-y-2">
            {stats.mostCited
              .filter((d) => d.count > 0)
              .map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-2 py-1 rounded transition-colors"
                  onClick={() => handleNodeClick(doc.id)}
                >
                  <span className="text-sm text-slate-700 truncate flex-1">
                    {doc.title}
                  </span>
                  <span className="text-xs bg-[#1e3a5f] text-white px-2 py-0.5 rounded-full ml-2">
                    {doc.count} citations
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* interactive node explorer */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Document Network Explorer
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Click any document to explore its citation relationships
        </p>

        {Object.entries(groupedNodes).map(([category, catNodes]) => (
          <div key={category} className="mb-4">
            <h4
              className="text-xs font-semibold mb-2 px-2 py-1 rounded"
              style={{
                backgroundColor:
                  categoryColorMap[category]?.bg || "#f1f5f9",
                color: categoryColorMap[category]?.text || "#475569",
              }}
            >
              {categoryLabels[category] || category} ({catNodes.length})
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {catNodes
                .sort((a, b) => b.connections - a.connections)
                .map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node.id)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      selectedNode === node.id
                        ? "ring-2 ring-[#1e3a5f] shadow-sm"
                        : "hover:shadow-sm"
                    }`}
                    style={{
                      backgroundColor:
                        categoryColorMap[node.category]?.bg || "#f1f5f9",
                      borderColor:
                        categoryColorMap[node.category]?.border || "#cbd5e1",
                      color:
                        categoryColorMap[node.category]?.text || "#475569",
                    }}
                    title={`${node.label} (${node.connections} connections)`}
                  >
                    {node.label.length > 40
                      ? node.label.slice(0, 40) + "..."
                      : node.label}
                    {node.connections > 0 && (
                      <span className="ml-1 opacity-60">
                        ({node.connections})
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* selected node details */}
      {selectedNode && relatedDocs.length > 0 && (
        <div className="animate-fade-in bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#1e3a5f]">
              Citation Network for:{" "}
              {nodes.find((n) => n.id === selectedNode)?.label}
            </h3>
            <button
              onClick={() => {
                setSelectedNode(null);
                setRelatedDocs([]);
              }}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>

          <div className="space-y-2">
            {relatedDocs.map((rd, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded border border-slate-100"
              >
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    rd.direction === "cites"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {rd.direction === "cites" ? "Cites" : "Cited by"}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor:
                      categoryColorMap[rd.category]?.bg || "#f1f5f9",
                    borderColor:
                      categoryColorMap[rd.category]?.border || "#cbd5e1",
                    color:
                      categoryColorMap[rd.category]?.text || "#475569",
                  }}
                >
                  {categoryLabels[rd.category]}
                </span>
                <span className="text-sm text-slate-700 flex-1 truncate">
                  {rd.title}
                </span>
                <span className="text-xs text-slate-400">
                  {rd.relationship}
                </span>
                {rd.depth > 1 && (
                  <span className="text-xs text-slate-300">
                    depth {rd.depth}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
