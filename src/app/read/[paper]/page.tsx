"use client";
import { useParams } from "next/navigation";
import Chatbot from "@/components/chatbot/Chatbot";
import { Reader } from "@/components/reader/Reader";
import Search from "@/components/search/Search";
import {FileUpload} from "@/components/fileupload/FileUpload";

export default function ReadPaper({ }) {
  const params = useParams();
  const paperLink = `https://arxiv.org/pdf/${params.paper}`;
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <div className="w-2/3 h-1/5">
        <Search />
      </div>
      <div className="flex">
        <Reader >{paperLink}</Reader>
        <Chatbot />
      </div>
      <div className="w-2/3 h-1/5">
        <FileUpload />
      </div>
    </div>
  );
}