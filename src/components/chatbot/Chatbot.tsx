"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Chat } from "@/types/Chat";
import Markdown from "react-markdown";
import { useAtom } from "jotai";
import { userAtomLocalStorage } from "@/stores/auth";

export default function ChatBot(paperLink) {
  const dummyChatList: Chat[] = [];
  const [chatHistory, setChatHistory] = React.useState<Chat[]>(dummyChatList);
  const [chatOutput, setChatOutput] = React.useState<string>("");
  const [prompt, setPrompt] = React.useState<string>("");
  const [chatId, setChatId] = React.useState<number>(0);
  const paper_ids = [paperLink.children];
  const [user, setUser] = useAtom(userAtomLocalStorage);

  interface ChatRequest {
    input: string;
    chat_history: Chat[];
  }

  async function chat() {
    if (prompt.trim() === "") {
      return;
    }
    setChatOutput("");
    setChatHistory((prev) => [
      ...prev,
      {
        id: chatId.toString(),
        text: prompt,
        user: user?.fullName || "User",
        user_id: user?.id || "user",
        createdAt: new Date(),
        associatedContextId: chatId.toString(),
      },
    ]);
    setPrompt("");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/chat/papers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: prompt,
          paper_ids: paper_ids,
          // chat_history: chatHistory,
        }),
      }
    );
    if (!response.body) {
      console.error("No response body");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await reader.read();
      const chunk = decoder.decode(value, { stream: true });
      setChatOutput((prev) => prev + chunk);
      if (done) {
        break;
      }
    }
  }

  return (
    <Card className="w-100">
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 items-center">
            {chatHistory.map((message) =>
              message.user === "Latent Agent" ? (
                <div
                  key={message.id}
                  className="w-full flex flex-col items-end mb-2"
                >
                  <div className="rounded p-2">
                    <Markdown>{message.text}</Markdown>
                  </div>
                  <span className="text-xs text-gray-400">
                    {message.createdAt.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div
                  key={message.id}
                  className="w-full flex flex-col items-end mb-2"
                >
                  <Label className="font-semibold">{message.user}</Label>
                  <br></br>
                  <div className="rounded p-3 bg-gray-100">
                    <Markdown>{message.text}</Markdown>
                  </div>
                  <span className="text-xs text-gray-400">
                    {message.createdAt.toLocaleString()}
                  </span>
                </div>
              )
            )}
            {chatOutput && (
              <div className="w-full flex flex-col items-end mb-2">
                <Label className="font-semibold">Latent Agent</Label>
                <br></br>

                <div className="rounded p-3 bg-gray-100">
                  <Markdown>{chatOutput}</Markdown>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date().toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <Textarea
            placeholder="What would you like to know..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={chat} variant="outline">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
