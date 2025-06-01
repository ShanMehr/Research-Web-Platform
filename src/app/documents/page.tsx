"use client";

import { use, useState, useEffect } from "react";
import Search from "@/components/search/Search";
import { FileUpload } from "@/components/fileupload/FileUpload";

export default function Documents() {
  type Document = {
    paper_id: string;
    title: string;
    abstract: string;
    authors: string;
    url: string;
  };

  const dummyDocuments: Document[] = [
    {
      paper_id: "1234",
      title: "Title 1",
      abstract: "Abstract 1",
      authors: "Author 1",
      url: "https://arxiv.org/pdf/1234.pdf",
    },
    {
      paper_id: "5678",
      title: "Title 2",
      abstract: "Abstract 2",
      authors: "Author 2",
      url: "https://arxiv.org/pdf/5678.pdf",
    },
    {
      paper_id: "9012",
      title: "Title 3",
      abstract: "Abstract 3",
      authors: "Author 3",
      url: "https://arxiv.org/pdf/9012.pdf",
    },
  ];

  const [documents, setDocuments] = useState<Document[]>(dummyDocuments || []);
  useEffect(() => {
    fetch("http://192.168.0.229:8000/user-documents")
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      });
  }, []);


  async function upload(files: File[]) {
    const formData = new FormData();
    formData.append("user_id", "1234");
    for (const file of files) {
      formData.append("documents", file);
    }
    console.log(files.length)
    console.log(formData);
    await fetch(`${process.env.NEXT_PUBLIC_INFERENCE_SERVER_API}/user-documents`, {
      method: "POST",
      body: formData,
    });
  }

  function handleDocumentClick(paperId: string) {
    console.log(paperId);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-2/3">
        <Search />
      </div>
      <div className="w-1/10 ">
        <FileUpload callback={upload} />
      </div>
      <div className="flex">
        {documents.length > 0 && (
          <div className="flex flex-col big-red-500">
            {documents.map((document) => (
              <div
                key={document.paper_id}
                className="flex justify-center border"
              >
                <a
                  onClick={() => handleDocumentClick(document.paper_id)}
                  className="text-foreground"
                >
                  {document.paper_id}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}