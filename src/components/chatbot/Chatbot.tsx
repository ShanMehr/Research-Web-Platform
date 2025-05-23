"use client";
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Chat } from "@/types/Chat"
import Markdown from "react-markdown"

export default function ChatBot() {
  const dummyChatList: Chat[] = [
    {
      id: "1",
      message: "Hello, how can I help you today?",
      user: "Human",
      createdAt: new Date(),
    },
    {
      id: "2",
      message: "I am looking for information about your services",
      user: "Robot",
      createdAt: new Date(),
    },
  ]
  const [messages, setMessages] = React.useState<Chat[]>(dummyChatList);
  const [chatOutput, setChatOutput] = React.useState<string>("");
  const [prompt, setPrompt] = React.useState<string>("");

  async function chat() {
    console.log("Chat function called", prompt);
    if (prompt.trim() === "") {
      return;
    } 
    if (chatOutput.trim() !== "") {
      setMessages((prev) => [...prev, { id: Math.random().toString(), message: chatOutput, user: "Robot", createdAt: new Date() }]);
      setChatOutput("");
    }


    const response = await fetch(`http://192.168.0.229:8000/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: prompt,
      }),
    });
    setPrompt("");
    if(!response.body) {
      console.error("No response body");
      return;
    }

    console.log("Response: ", response);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      // chat_output += chunk;
      setChatOutput((prev) => prev + chunk);
    }
  }
  
  return (
    <Card className="flex flex-col gap-4 items-center">
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 items-center">
            {messages.map((message) =>
              message.user === "Robot" ? (
                <div key={message.id} className="w-full flex flex-col items-end mb-2">
                  <div className="rounded p-2">
                    <Markdown>
                      {message.message}
                    </Markdown>
                  </div>
                  <span className="text-xs text-gray-400">{message.createdAt.toLocaleString()}</span>
                </div>
              ) : (
                <div key={message.id} className="w-full flex flex-col items-end mb-2">
                  <Label className="font-semibold">{message.user}</Label>
                  <div className="rounded p-2 bg-gray-100">
                    <Markdown>
                      {message.message}
                    </Markdown>
                  </div>
                  <span className="text-xs text-gray-400">{message.createdAt.toLocaleString()}</span>
                </div>
              )
            )}
            {chatOutput && (
              <div className="w-full flex flex-col items-end mb-2">
                <Label className="font-semibold">Robot</Label>
                <div className="rounded p-2 bg-gray-100">
                  <Markdown>
                    {chatOutput}
                  </Markdown>
                </div>
                <span className="text-xs text-gray-400">{new Date().toLocaleString()}</span>
              </div>
            )}
          </div>
          <Textarea placeholder="What would you like to know..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button onClick={chat} variant="outline">Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
