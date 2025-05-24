"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    console.log("Search term:", searchTerm);
    const response = fetch("http://192.168.0.229:8000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: searchTerm,
      }),
    }); 
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
      <Button type="button" variant="outline" onClick={() => handleSearch()}>
        Search
      </Button>

      <div>
        <a href="/read/">Read</a>
      </div>
    </div>
  );
}