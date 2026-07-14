// OKF export: converts docs to typed entities + relations

import { type LegalDocument, type DocCategory, getAllDocuments } from "./documents";
import { buildDocumentGraph, type GraphEdge } from "./graphRag";

// entity types
export interface OKFEntity {
  entityId: string;
  entityType: OKFEntityType;
  name: string;
  description: string;
  attributes: Record<string, string | string[]>;
  sourceDocuments: string[];
}

export type OKFEntityType =
  | "statute"
  | "case_law"
  | "regulation"
  | "commentary"
  | "legal_concept"
  | "jurisdiction"
  | "court"
  | "agency";

export interface OKFRelation {
  relationId: string;
  sourceEntity: string;
  targetEntity: string;
  relationType: OKFRelationType;
  confidence: number;
  evidence: string;
}

export type OKFRelationType =
  | "interprets"
  | "amends"
  | "supersedes"
  | "implements"
  | "cites"
  | "contradicts"
  | "supports"
  | "applies"
  | "defines";

export interface OKFKnowledgeBase {
  version: string;
  domain: string;
  entityCount: number;
  relationCount: number;
  entities: OKFEntity[];
  relations: OKFRelation[];
  metadata: {
    generatedAt: string;
    documentCount: number;
    categories: Record<string, number>;
  };
}

function categoryToEntityType(category: DocCategory): OKFEntityType {
  switch (category) {
    case "act":
      return "statute";
    case "judgment":
      return "case_law";
    case "tax":
      return "regulation";
    case "pov":
      return "commentary";
  }
}

function edgeToRelationType(relationship: string): OKFRelationType {
  switch (relationship) {
    case "interprets":
      return "interprets";
    case "relies_on":
      return "cites";
    case "analyzes":
      return "interprets";
    case "discusses":
      return "cites";
    case "implements":
      return "implements";
    case "interpreted_in":
      return "interprets";
    case "references":
      return "cites";
    case "supplements":
      return "supports";
    default:
      return "cites";
  }
}

export function documentToOKFEntity(doc: LegalDocument): OKFEntity {
  const attributes: Record<string, string | string[]> = {
    datePublished: doc.datePublished,
    source: doc.source,
    subcategory: doc.subcategory,
    pageCount: String(doc.pages.length),
  };

  if (doc.metadata.jurisdiction) {
    attributes.jurisdiction = doc.metadata.jurisdiction;
  }
  if (doc.metadata.court) {
    attributes.court = doc.metadata.court;
  }
  if (doc.metadata.caseNumber) {
    attributes.caseNumber = doc.metadata.caseNumber;
  }
  if (doc.metadata.ircSection) {
    attributes.ircSection = doc.metadata.ircSection;
  }
  if (doc.metadata.author) {
    attributes.author = doc.metadata.author;
  }

  // description from first page
  const firstPageContent = doc.pages[0]?.content || "";
  const description =
    firstPageContent.length > 300
      ? firstPageContent.slice(0, 300) + "..."
      : firstPageContent;

  return {
    entityId: doc.id,
    entityType: categoryToEntityType(doc.category),
    name: doc.title,
    description,
    attributes,
    sourceDocuments: [doc.id],
  };
}

export function buildOKFKnowledgeBase(): OKFKnowledgeBase {
  const documents = getAllDocuments();
  const graph = buildDocumentGraph();

  // docs -> entities
  const entities = documents.map(documentToOKFEntity);

  // edges -> relations
  const relations: OKFRelation[] = graph.edges.map(
    (edge: GraphEdge, index: number) => ({
      relationId: `rel-${String(index + 1).padStart(4, "0")}`,
      sourceEntity: edge.source,
      targetEntity: edge.target,
      relationType: edgeToRelationType(edge.relationship),
      confidence: 0.95, // explicit citation data
      evidence: `${edge.sourceTitle} ${edge.relationship} ${edge.targetTitle}`,
    })
  );

  // counts per category
  const categories: Record<string, number> = {};
  for (const doc of documents) {
    categories[doc.category] = (categories[doc.category] || 0) + 1;
  }

  return {
    version: "1.0.0",
    domain: "US Tax and Legal",
    entityCount: entities.length,
    relationCount: relations.length,
    entities,
    relations,
    metadata: {
      generatedAt: new Date().toISOString(),
      documentCount: documents.length,
      categories,
    },
  };
}
