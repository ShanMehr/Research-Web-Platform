"use client";
import Search from "@/components/search/Search";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchResults() {
  interface SearchResult {
    paper_id: string;
    title: string;
    abstract: string;
    doi: string;
    report_number: string;
    url: string;
    owner_id: string;
    group_id: string;
    file_name: string;
    created_at: string;
  }
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  async function getSearchResults() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      }
    );
    const data = await response.json();
    setSearchResults(data);
    console.log(data);
  }

  useEffect(() => {
    getSearchResults();
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <div className="w-1/2">
        <Search />
      </div>
      <br></br>
      <h1 className="text-2xl font-bold text-foreground p-4">Search Results</h1>
      <div className="w-3/4">
        {searchResults.length > 0 && (
          <>
            {searchResults.map((result) => (
              <Card key={result.paper_id}>
                <CardHeader>
                  <CardTitle>{result.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.abstract}</p>
                  <br />
                  <Link href={`/read/${result.paper_id}`}>
                    {result.paper_id}
                  </Link>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
