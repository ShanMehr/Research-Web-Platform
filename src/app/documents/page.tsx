"use client";

import { use, useState, useEffect } from "react";
import Search from "@/components/search/Search";
import { FileUpload } from "@/components/fileupload/FileUpload";
import { useAtom } from "jotai";
import { userAtomLocalStorage } from "@/stores/auth";
import { DocumentMetadata } from "@/types/Document";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader
} from "@/components/ui/card";


export default function Documents() {
  const [user, setUser] = useAtom(userAtomLocalStorage);
  const router = useRouter();

  const dummyDocuments: DocumentMetadata[] = [
    {
      paper_id: "1234",
      owner_id: "1234",
      group_id: "1234",
      url: "https://example.com/1234",
      file_name: "example.pdf",
      created_at: "2023-03-01T00:00:00.000Z",
    },
    {
      paper_id: "5678",
      owner_id: "5678",
      group_id: "5678",
      url: "https://example.com/5678",
      file_name: "example.pdf",
      created_at: "2023-03-02T00:00:00.000Z",
    },
  ];


  useEffect(() => {
    console.log(user?.id)
    const fetchDocumentsBaseUrl= new URL(process.env.NEXT_PUBLIC_INFERENCE_SERVER_API + "/user-documents/")
    fetchDocumentsBaseUrl.searchParams.append("owner_id", user?.id);
    fetchDocumentsBaseUrl.searchParams.append("group_id", "public");
    fetch(fetchDocumentsBaseUrl.toString())
      .then((res) => res.json())
      .then((data) => {
        setDocuments(data);
      });
  }, []);

  const [documents, setDocuments] = useState<DocumentMetadata[]>(
  []
  );


  async function upload(files: File[]) {
    if (files.length === 0) {
      console.log("No files selected");
      return;
    }
    const formData = new FormData();
    if(!user?.id) {
      console.log("No user id");
      return;
    }
    formData.append("user_id", user?.id);
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
    router.push(`/read/${paperId}`);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="w-2/3">
        <Search />
      </div>
      <div className="w-1/10 ">
        <FileUpload callback={upload} />
      </div>
      <h1>My Documents</h1>
      <div className="flex bg-gray-100 w-2/3 h-2/3 justify-center items-center">
        {documents.length > 0 && (
          <div className="flex gap-4 ">
            {documents.map((document) => (
              <div
                key={document.paper_id}
                className="flex justify-center border"
              >
                <Card>
                  <CardHeader>
                    <a
                      onClick={() => handleDocumentClick(document.paper_id)}
                      className="text-foreground"
                    >
                      {document.file_name}
                    </a>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-center">
                      Created At: {document.created_at}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}