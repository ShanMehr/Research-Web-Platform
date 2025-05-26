"use client";
import { useParams } from "next/navigation";
import Chatbot from "@/components/chatbot/Chatbot";
import { Reader } from "@/components/reader/Reader";
import Search from "@/components/search/Search";

export default function ReadPaper({ }) {
  const params = useParams();
  const paperLink = `https://arxiv.org/pdf/${params.paper}`;
  return (
    <div className="flex flex-col gap-4 items-center">
      <Search />
      <div className="flex justify-center">
        <Reader className="width-1/2">{paperLink}</Reader>
        <Chatbot />
      </div>
    </div>
  );
}