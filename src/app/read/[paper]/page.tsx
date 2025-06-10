"use client";
import { useParams } from "next/navigation";
import Chatbot from "@/components/chatbot/Chatbot";
import { Reader } from "@/components/reader/Reader";
import Search from "@/components/search/Search";
import { FileUpload } from "@/components/fileupload/FileUpload";
import { useState, useEffect } from "react";
import { DocumentMetadata } from "@/types/Document";

export default function ReadPaper({}) {
  const params = useParams();
  const paperLink: string = params.paper;
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-2/3 h-1/5">
        <Search />
      </div>
      <div className="flex w-full justify-center">
        <Reader>{paperLink}</Reader>
        <Chatbot className="w-32">{paperLink}</Chatbot>
      </div>
      {/* <div className="w-2/3 h-1/5">
        <FileUpload />
      </div> */}
    </div>
  );
}
