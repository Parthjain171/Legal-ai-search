"use client";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "search", label: "Search & Ask" },
  { id: "documents", label: "Documents" },
  { id: "graph", label: "Citation Graph" },
  { id: "evaluate", label: "Evaluation" },
];

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-[#1e3a5f] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#c9a84c] rounded flex items-center justify-center font-bold text-[#1e3a5f] text-sm">
              LA
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                LegalAI Search
              </h1>
              <p className="text-xs text-blue-200 -mt-0.5">
                US Tax & Legal Intelligence
              </p>
            </div>
          </div>

          <nav className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white/20 text-white"
                    : "text-blue-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
