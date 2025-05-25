"use client";
import { useParams } from "next/navigation";
import Chatbot from "@/components/chatbot/Chatbot";
import { Reader } from "@/components/reader/Reader";

export default function ReadPaper({ }) {
  const params = useParams();
  console.log(params)
  const paperLink = `https://arxiv.org/pdf/${params.paper}`;
  return (
    <div className="flex flex-col gap-4 items-center">
      <Reader >{paperLink}</Reader>
      <Chatbot />
    </div>
  );
}