// golden set eval: measures retrieval accuracy + faithfulness

import { hybridSearch, type SearchMode } from "./hybridSearch";
import { generateAnswer } from "./llm";
import { getRelatedDocuments } from "./graphRag";

export interface GoldenSetEntry {
  id: number;
  question: string;
  expectedDocumentIds: string[];
  expectedAnswer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface EvaluationResult {
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

export interface EvaluationSummary {
  totalQueries: number;
  avgRetrievalAccuracy: number;
  avgFaithfulness: number;
  searchMode: string;
  results: EvaluationResult[];
  breakdown: {
    easy: { count: number; avgAccuracy: number; avgFaithfulness: number };
    medium: { count: number; avgAccuracy: number; avgFaithfulness: number };
    hard: { count: number; avgAccuracy: number; avgFaithfulness: number };
  };
}

// test queries
export const GOLDEN_SET: GoldenSetEntry[] = [
  {
    id: 1,
    question: "What is the definition of gross income under Section 61 of the Internal Revenue Code?",
    expectedDocumentIds: ["act-001"],
    expectedAnswer: "Section 61 defines gross income as all income from whatever source derived, including compensation for services, business income, gains from property, interest, rents, royalties, dividends, and other enumerated categories.",
    category: "act",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What standard did the Supreme Court establish in Welch v. Helvering for ordinary business expenses?",
    expectedDocumentIds: ["judgment-004", "act-002"],
    expectedAnswer: "The Supreme Court established that an ordinary expense is one that is common and accepted in the taxpayer's field of business, not necessarily one that the specific taxpayer incurs habitually.",
    category: "judgment",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "How does the economic substance doctrine apply to tax shelters?",
    expectedDocumentIds: ["pov-002", "act-001"],
    expectedAnswer: "The economic substance doctrine requires transactions to have meaningful economic purpose beyond tax benefits. It was codified under Section 7701(o) and applies a two-prong test: the transaction must change the taxpayer's economic position in a meaningful way and the taxpayer must have a substantial non-tax business purpose.",
    category: "pov",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "What are the requirements for a like-kind exchange under Section 1031?",
    expectedDocumentIds: ["act-004", "judgment-007"],
    expectedAnswer: "Section 1031 allows deferral of gain on exchanges of real property held for productive use in trade or business or for investment. After the Tax Cuts and Jobs Act, only real property qualifies. The exchange must involve like-kind properties and meet specific timing requirements.",
    category: "act",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "How did the Supreme Court in Commissioner v. Banks address the taxation of contingent attorney fees?",
    expectedDocumentIds: ["judgment-003", "act-001"],
    expectedAnswer: "In Banks, the Supreme Court held that the portion of a litigation recovery paid to an attorney under a contingent fee arrangement is included in the plaintiff's gross income. The anticipatory assignment of income doctrine applies because the plaintiff retains dominion over the underlying claim.",
    category: "judgment",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "What is the Section 199A qualified business income deduction and who qualifies for it?",
    expectedDocumentIds: ["act-007", "pov-003", "tax-010"],
    expectedAnswer: "Section 199A provides a deduction of up to 20% of qualified business income from pass-through entities for eligible taxpayers. It applies to sole proprietorships, partnerships, and S corporations, subject to taxable income limitations and restrictions for specified service trades or businesses.",
    category: "tax",
    difficulty: "medium",
  },
  {
    id: 7,
    question: "What did the Altera Corp v. Commissioner case decide about stock-based compensation in cost-sharing arrangements?",
    expectedDocumentIds: ["judgment-009", "act-008"],
    expectedAnswer: "The Ninth Circuit upheld the Treasury regulation requiring that stock-based compensation costs be included in the pool of costs shared under qualified cost-sharing arrangements between related parties under Section 482.",
    category: "judgment",
    difficulty: "hard",
  },
  {
    id: 8,
    question: "How does FATCA affect US taxpayers with foreign financial accounts?",
    expectedDocumentIds: ["act-014", "pov-008", "tax-013"],
    expectedAnswer: "FATCA requires foreign financial institutions to report accounts held by US taxpayers to the IRS. US taxpayers must report specified foreign financial assets exceeding threshold amounts on Form 8938, separate from the FBAR requirement.",
    category: "act",
    difficulty: "medium",
  },
  {
    id: 9,
    question: "What is the arm's length standard in transfer pricing under Section 482?",
    expectedDocumentIds: ["act-008", "pov-014", "judgment-010"],
    expectedAnswer: "The arm's length standard requires that transactions between related parties reflect prices that would be charged between unrelated parties in comparable circumstances. Section 482 authorizes the IRS to reallocate income among related entities to prevent tax avoidance.",
    category: "tax",
    difficulty: "hard",
  },
  {
    id: 10,
    question: "What changes did the SECURE 2.0 Act make to retirement savings?",
    expectedDocumentIds: ["act-025"],
    expectedAnswer: "The SECURE 2.0 Act expanded automatic enrollment in employer retirement plans, increased catch-up contribution limits, modified required minimum distribution ages, created emergency savings provisions, and enhanced small employer incentives for establishing retirement plans.",
    category: "act",
    difficulty: "medium",
  },
  {
    id: 11,
    question: "How does the IRS treat cryptocurrency transactions for tax purposes?",
    expectedDocumentIds: ["pov-004", "tax-019", "tax-020"],
    expectedAnswer: "The IRS treats cryptocurrency as property. Gains and losses from sales or exchanges are subject to capital gains taxation. Mining income and cryptocurrency received as payment for services constitute ordinary income. Taxpayers must track cost basis and holding periods for each transaction.",
    category: "tax",
    difficulty: "medium",
  },
  {
    id: 12,
    question: "What is the Chevron deference doctrine and how has its relevance changed?",
    expectedDocumentIds: ["judgment-002", "pov-001"],
    expectedAnswer: "Chevron deference required courts to defer to a federal agency's reasonable interpretation of an ambiguous statute it administers. The doctrine has faced increasing judicial skepticism, with courts applying it less broadly and some calling for its reconsideration or overruling.",
    category: "judgment",
    difficulty: "hard",
  },
  {
    id: 13,
    question: "What are the tax implications of partnership distributions involving hot assets under Section 751?",
    expectedDocumentIds: ["pov-009", "tax-025"],
    expectedAnswer: "Under Section 751, distributions of partnership interests that include unrealized receivables or inventory items (hot assets) can trigger ordinary income recognition rather than capital gains treatment, even if the overall transaction would otherwise qualify for capital gain treatment.",
    category: "tax",
    difficulty: "hard",
  },
  {
    id: 14,
    question: "How does the Sarbanes-Oxley Act address corporate financial reporting and compliance?",
    expectedDocumentIds: ["act-012", "pov-007"],
    expectedAnswer: "SOX established requirements for internal controls over financial reporting, CEO/CFO certification of financial statements, auditor independence, enhanced disclosure requirements, and created the PCAOB to oversee audit firms. It imposes criminal penalties for securities fraud.",
    category: "act",
    difficulty: "easy",
  },
  {
    id: 15,
    question: "What is the substantial authority standard for tax return positions under the penalty provisions?",
    expectedDocumentIds: ["tax-017"],
    expectedAnswer: "The substantial authority standard under Section 6662 is an objective test that evaluates whether the weight of authorities supporting a tax position is substantial in relation to the weight of authorities opposing it. It is less stringent than the more likely than not standard but more stringent than the reasonable basis standard.",
    category: "tax",
    difficulty: "hard",
  },
  {
    id: 16,
    question: "What did the Supreme Court hold in Commissioner v. Glenshaw Glass about the scope of taxable income?",
    expectedDocumentIds: ["judgment-001", "act-001"],
    expectedAnswer: "The Supreme Court held that punitive damages are includable in gross income, confirming that income under Section 61 encompasses all undeniable accessions to wealth, clearly realized, over which the taxpayer has complete dominion, regardless of the source.",
    category: "judgment",
    difficulty: "easy",
  },
  {
    id: 17,
    question: "What are the charitable contribution deduction rules under Section 170?",
    expectedDocumentIds: ["act-005", "tax-007"],
    expectedAnswer: "Section 170 allows deductions for contributions to qualifying charitable organizations, subject to percentage limitations based on the type of property donated and the type of recipient organization. Cash contributions are generally limited to 60% of adjusted gross income, with lower limits for capital gain property.",
    category: "act",
    difficulty: "medium",
  },
  {
    id: 18,
    question: "How does the Dodd-Frank Act regulate financial institutions?",
    expectedDocumentIds: ["act-018", "pov-011"],
    expectedAnswer: "Dodd-Frank established the Financial Stability Oversight Council, created the Consumer Financial Protection Bureau, implemented the Volcker Rule restricting proprietary trading, enhanced derivatives regulation, and created an orderly liquidation authority for systemically important financial institutions.",
    category: "act",
    difficulty: "medium",
  },
  {
    id: 19,
    question: "What test determines whether a taxpayer is in a trade or business under the tax code?",
    expectedDocumentIds: ["judgment-016", "act-002"],
    expectedAnswer: "In Groetzinger, the Supreme Court held that a taxpayer is engaged in a trade or business if the activity is conducted with continuity and regularity, and the primary purpose is income or profit. Sporadic or occasional activities do not constitute a trade or business.",
    category: "judgment",
    difficulty: "medium",
  },
  {
    id: 20,
    question: "What are the implications of the global minimum tax (Pillar Two) for multinational corporations?",
    expectedDocumentIds: ["pov-021"],
    expectedAnswer: "The global minimum tax under Pillar Two establishes a 15% minimum effective tax rate for multinational enterprises with consolidated revenues above 750 million euros. It includes the Income Inclusion Rule and the Undertaxed Profits Rule to ensure minimum taxation across jurisdictions.",
    category: "pov",
    difficulty: "hard",
  },
];

// recall@k
function calculateRetrievalAccuracy(
  retrievedDocIds: string[],
  expectedDocIds: string[]
): number {
  if (expectedDocIds.length === 0) return 1;
  const found = expectedDocIds.filter((id) => retrievedDocIds.includes(id));
  return found.length / expectedDocIds.length;
}

// token overlap between generated and expected answer
function estimateFaithfulness(
  generatedAnswer: string,
  expectedAnswer: string
): number {
  // tokenize + compute overlap
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((t) => t.length > 3);

  const generatedTokens = new Set(normalize(generatedAnswer));
  const expectedTokens = normalize(expectedAnswer);

  if (expectedTokens.length === 0) return 0;

  let matches = 0;
  for (const token of expectedTokens) {
    if (generatedTokens.has(token)) {
      matches++;
    }
  }

  return matches / expectedTokens.length;
}

export async function runEvaluation(
  mode: SearchMode = "hybrid",
  entries?: GoldenSetEntry[]
): Promise<EvaluationSummary> {
  const testSet = entries || GOLDEN_SET;
  const results: EvaluationResult[] = [];

  for (const entry of testSet) {
    try {
      // search
      const searchResults = await hybridSearch(entry.question, mode, 10);
      const retrievedDocIds = [
        ...new Set(searchResults.map((r) => r.chunk.docId)),
      ];

      // graph context
      const allRelated = [];
      const seenDocs = new Set<string>();
      for (const result of searchResults.slice(0, 3)) {
        if (seenDocs.has(result.chunk.docId)) continue;
        seenDocs.add(result.chunk.docId);
        const related = getRelatedDocuments(result.chunk.docId, 1);
        allRelated.push(...related);
      }

      // answer
      const answer = await generateAnswer(
        entry.question,
        searchResults,
        allRelated,
        mode
      );

      // metrics
      const retrievalAccuracy = calculateRetrievalAccuracy(
        retrievedDocIds,
        entry.expectedDocumentIds
      );
      const faithfulness = estimateFaithfulness(
        answer.answer,
        entry.expectedAnswer
      );

      results.push({
        entryId: entry.id,
        question: entry.question,
        retrievalAccuracy,
        faithfulness,
        retrievedDocIds,
        expectedDocIds: entry.expectedDocumentIds,
        generatedAnswer: answer.answer,
        expectedAnswer: entry.expectedAnswer,
        searchMode: mode,
      });
    } catch (error) {
      // record failure, keep going
      results.push({
        entryId: entry.id,
        question: entry.question,
        retrievalAccuracy: 0,
        faithfulness: 0,
        retrievedDocIds: [],
        expectedDocIds: entry.expectedDocumentIds,
        generatedAnswer: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        expectedAnswer: entry.expectedAnswer,
        searchMode: mode,
      });
    }
  }

  // breakdown by difficulty
  const difficultyGroups = { easy: [] as EvaluationResult[], medium: [] as EvaluationResult[], hard: [] as EvaluationResult[] };
  for (let i = 0; i < testSet.length; i++) {
    const difficulty = testSet[i].difficulty;
    difficultyGroups[difficulty].push(results[i]);
  }

  const computeGroupStats = (group: EvaluationResult[]) => ({
    count: group.length,
    avgAccuracy:
      group.length > 0
        ? group.reduce((s, r) => s + r.retrievalAccuracy, 0) / group.length
        : 0,
    avgFaithfulness:
      group.length > 0
        ? group.reduce((s, r) => s + r.faithfulness, 0) / group.length
        : 0,
  });

  const avgRetrievalAccuracy =
    results.reduce((s, r) => s + r.retrievalAccuracy, 0) / results.length;
  const avgFaithfulness =
    results.reduce((s, r) => s + r.faithfulness, 0) / results.length;

  return {
    totalQueries: results.length,
    avgRetrievalAccuracy: Number(avgRetrievalAccuracy.toFixed(4)),
    avgFaithfulness: Number(avgFaithfulness.toFixed(4)),
    searchMode: mode,
    results,
    breakdown: {
      easy: computeGroupStats(difficultyGroups.easy),
      medium: computeGroupStats(difficultyGroups.medium),
      hard: computeGroupStats(difficultyGroups.hard),
    },
  };
}
