"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CloudUpload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod"; 
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const formUploadSchema = z.object({
  file: z.string().optional(),
});


export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formUploadSchema>>({
    resolver: zodResolver(formUploadSchema),
    defaultValues: {
      file: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formUploadSchema>) {
    const file = data.file;
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        const fileContents = e.target?.result;
        if (fileContents) {
          const fileArrayBuffer = fileContents.split(",")[1];
          const fileBuffer = fileArrayBuffer.split(";")[0];
          const fileBase64 = fileBuffer.split(":")[1];
          const fileData = atob(fileBase64);
          const fileObj = new File([fileData], "uploaded.pdf", { type: "application/pdf" });
          setFiles([...files, fileObj]);
        }
      };
      fileReader.readAsDataURL(file);
    }
  }

  return (
    <div className="">
      <Button>
        <CloudUpload />
        Upload PDF
      </Button>
    </div>
  );
}