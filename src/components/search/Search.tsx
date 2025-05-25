"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { SearchResult } from "@/types/SearchResults";
import { useRouter } from "next/navigation";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const handlePaperClick = (paperId: string) => {
    router.push(`/read/${paperId}`);
  };

  async function handleSearch() {
    console.log("Search term:", searchTerm);
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
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-2xl font-bold text-foreground">
        What Would You Like to Know?
      </h1>
      <Input
        type="text"
        className="w-full rounded-md bg-background px-4 py-2 text-sm font-semibold text-foreground"
        value={searchTerm}
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-4">
          {searchResults.map((result) => (
            <div key={result.paper_id} className="flex flex-col gap-2">
              <a onClick={() => handlePaperClick(result.paper_id)} className="text-foreground">
                {result.paper_id}
              </a>
            </div>
          ))}
        </div>
      )}
      <Button type="button" variant="outline" onClick={() => handleSearch()}>
        Search
      </Button>
    </div>
  );
}