"use client";
import { useState } from "react";
import { Settings2, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SearchResult } from "@/types/SearchResults";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const handlePaperClick = (paperId: string) => {
    router.push(`/read/${paperId}`);
  };

  async function handleSearch() {
    if (!searchTerm.trim()) {
      return; // Do not search if the input is empty
    }
    const response = await fetch("http://192.168.0.229:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchTerm,
      }),
    }); 
    const data = await response.json();
    setSearchResults(data);
  }

  return (
    <div className="h-1/6">
      <Card>
        <textarea
          className="px-4 text-sm font-semibold text-foreground border-0 border-transparent"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <div className="flex pr-2 justify-end">
          <Button
            className=""
            type="button"
            variant="outline"
            onClick={() => handleSearch()}
          >
            <SendHorizontal />
          </Button>
        </div>
      </Card>
      {searchResults.length > 0 && (
        <div className="flex flex-col">
          {searchResults.map((result) => (
            <div key={result.paper_id} className="flex justify-center border">
              <a
                onClick={() => handlePaperClick(result.paper_id)}
                className="text-foreground"
              >
                {result.paper_id}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

