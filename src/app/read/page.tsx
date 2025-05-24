"use client";
import Chatbot from "@/components/chatbot/Chatbot";
import {Reader} from "@/components/reader/Reader";

export default function Read() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Reader />
      <Chatbot />
    </div>
  );
}