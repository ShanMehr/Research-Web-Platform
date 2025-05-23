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
  
  return (
    <Card className="w-[500px] flex flex-col gap-4 items-center">
      <CardContent>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 items-center">
            {messages.map((message) =>
              message.user === "Robot" ? (
                <div key={message.id} className="w-full flex flex-col items-end mb-2">
                  <div className="rounded p-2">{message.message}</div>
                  <span className="text-xs text-gray-400">{message.createdAt.toLocaleString()}</span>
                </div>
              ) : (
                <div key={message.id} className="w-full flex flex-col items-end mb-2">
                  <Label className="font-semibold">{message.user}</Label>
                  <div className="rounded p-2 bg-gray-100">{message.message}</div>
                  <span className="text-xs text-gray-400">{message.createdAt.toLocaleString()}</span>
                </div>
              )
            )}
          </div>
          <Textarea placeholder="What would you like to know..." />
          <Button variant="outline">Send</Button>
        </div>
      </CardContent>
    </Card>

    
  );
}
