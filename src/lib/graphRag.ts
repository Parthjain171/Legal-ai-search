// citation graph for cross-document traversal

import {
  type LegalDocument,
  type DocCategory,
  getAllDocuments,
  getDocumentById,
} from "./documents";

export interface GraphNode {
  id: string;
  title: string;
  category: DocCategory;
  citedBy: string[]; // documents that cite this one
  cites: string[]; // documents this one cites
}

export interface GraphEdge {
  source: string;
  target: string;
  sourceTitle: string;
  targetTitle: string;
  relationship: string;
}

export interface DocumentGraph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

export interface RelatedDocument {
  document: LegalDocument;
  relationship: string;
  direction: "cites" | "cited_by";
  depth: number;
}

// singleton
let documentGraph: DocumentGraph | null = null;

function inferRelationship(
  source: LegalDocument,
  target: LegalDocument
): string {
  if (source.category === "judgment" && target.category === "act") {
    return "interprets";
  }
  if (source.category === "judgment" && target.category === "judgment") {
    return "relies_on";
  }
  if (source.category === "pov" && target.category === "judgment") {
    return "analyzes";
  }
  if (source.category === "pov" && target.category === "act") {
    return "discusses";
  }
  if (source.category === "tax" && target.category === "act") {
    return "implements";
  }
  if (source.category === "act" && target.category === "judgment") {
    return "interpreted_in";
  }
  if (source.category === "act" && target.category === "act") {
    return "references";
  }
  if (source.category === "tax" && target.category === "tax") {
    return "supplements";
  }
  return "references";
}

export function buildDocumentGraph(): DocumentGraph {
  if (documentGraph) return documentGraph;

  const documents = getAllDocuments();
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];

  // init nodes
  for (const doc of documents) {
    nodes.set(doc.id, {
      id: doc.id,
      title: doc.title,
      category: doc.category,
      citedBy: [],
      cites: doc.metadata.citedDocuments || [],
    });
  }

  // edges from citation metadata
  for (const doc of documents) {
    const cited = doc.metadata.citedDocuments || [];
    for (const targetId of cited) {
      const target = getDocumentById(targetId);
      if (!target) continue;

      // add edge
      edges.push({
        source: doc.id,
        target: targetId,
        sourceTitle: doc.title,
        targetTitle: target.title,
        relationship: inferRelationship(doc, target),
      });

      // update citedBy on target
      const targetNode = nodes.get(targetId);
      if (targetNode && !targetNode.citedBy.includes(doc.id)) {
        targetNode.citedBy.push(doc.id);
      }
    }
  }

  documentGraph = { nodes, edges };
  return documentGraph;
}

export function getRelatedDocuments(
  docId: string,
  maxDepth: number = 2
): RelatedDocument[] {
  const graph = buildDocumentGraph();
  const results: RelatedDocument[] = [];
  const visited = new Set<string>();
  visited.add(docId);

  function traverse(currentId: string, depth: number) {
    if (depth > maxDepth) return;

    const node = graph.nodes.get(currentId);
    if (!node) return;

    // outgoing citations
    for (const citedId of node.cites) {
      if (visited.has(citedId)) continue;
      visited.add(citedId);

      const citedDoc = getDocumentById(citedId);
      if (!citedDoc) continue;

      const sourceDoc = getDocumentById(currentId);
      const relationship = sourceDoc
        ? inferRelationship(sourceDoc, citedDoc)
        : "references";

      results.push({
        document: citedDoc,
        relationship,
        direction: "cites",
        depth,
      });

      traverse(citedId, depth + 1);
    }

    // incoming citations
    for (const citerId of node.citedBy) {
      if (visited.has(citerId)) continue;
      visited.add(citerId);

      const citerDoc = getDocumentById(citerId);
      if (!citerDoc) continue;

      const currentDoc = getDocumentById(currentId);
      const relationship = currentDoc
        ? inferRelationship(citerDoc, currentDoc)
        : "references";

      results.push({
        document: citerDoc,
        relationship,
        direction: "cited_by",
        depth,
      });

      traverse(citerId, depth + 1);
    }
  }

  traverse(docId, 1);
  return results;
}

export function getGraphStats(): {
  totalNodes: number;
  totalEdges: number;
  avgConnections: number;
  mostCited: { id: string; title: string; count: number }[];
  relationshipCounts: Record<string, number>;
} {
  const graph = buildDocumentGraph();

  const relationshipCounts: Record<string, number> = {};
  for (const edge of graph.edges) {
    relationshipCounts[edge.relationship] =
      (relationshipCounts[edge.relationship] || 0) + 1;
  }

  const citedCounts: { id: string; title: string; count: number }[] = [];
  for (const [id, node] of graph.nodes) {
    citedCounts.push({ id, title: node.title, count: node.citedBy.length });
  }
  citedCounts.sort((a, b) => b.count - a.count);

  const totalConnections = Array.from(graph.nodes.values()).reduce(
    (sum, node) => sum + node.cites.length + node.citedBy.length,
    0
  );

  return {
    totalNodes: graph.nodes.size,
    totalEdges: graph.edges.length,
    avgConnections: totalConnections / graph.nodes.size,
    mostCited: citedCounts.slice(0, 10),
    relationshipCounts,
  };
}

export function getGraphForVisualization(): {
  nodes: { id: string; label: string; category: string; connections: number }[];
  edges: { source: string; target: string; label: string }[];
} {
  const graph = buildDocumentGraph();

  const nodes = Array.from(graph.nodes.values()).map((node) => ({
    id: node.id,
    label: node.title,
    category: node.category,
    connections: node.cites.length + node.citedBy.length,
  }));

  const edges = graph.edges.map((edge) => ({
    source: edge.source,
    target: edge.target,
    label: edge.relationship,
  }));

  return { nodes, edges };
}
