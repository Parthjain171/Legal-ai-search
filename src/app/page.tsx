"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchPanel from "@/components/SearchPanel";
import DocumentBrowser from "@/components/DocumentBrowser";
import GraphView from "@/components/GraphView";
import EvaluationPanel from "@/components/EvaluationPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="flex flex-col min-h-screen">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "search" && <SearchPanel />}
        {activeTab === "documents" && <DocumentBrowser />}
        {activeTab === "graph" && <GraphView />}
        {activeTab === "evaluate" && <EvaluationPanel />}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-slate-400">
          <p>
            LegalAI Search | US Tax & Legal Document Intelligence Platform
          </p>
          <p>
            Hybrid RAG (Vector + BM25 + Graph) | 100 Documents | Gemini 2.5 Flash
          </p>
        </div>
      </footer>
    </div>
  );
}
