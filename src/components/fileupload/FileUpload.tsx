"use client";

import { useState } from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";

export function FileUpload(
  {callback}: { callback?: (files: File[]) => void }
) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  async function saveFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    if (callback) {
      callback(files);
    }
  }

  async function handleSubmit() {
    fileInput.current?.click();
  }
  
  return (
    <Button className="w-full" onClick={() => handleSubmit()}>
      <CloudUpload />
      <input className="hidden" type="file" ref={fileInput} onChange={(e) => saveFiles(e)} />
    </Button>
  );
} 

