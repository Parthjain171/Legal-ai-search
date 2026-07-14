import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LegalAI Search - US Tax & Legal Document Intelligence",
  description:
    "Legal research platform with hybrid search, Graph RAG, and document summarization for US tax and legal docs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
