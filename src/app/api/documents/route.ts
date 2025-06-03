import { NextResponse } from "next/server";
import {
  getDocument,
  getAuthorizationTokenFromBackblaze,
} from "@/data/documents";

export async function GET() {
  let owner_id = "ishan";
  let paper_title = "NIPS-2017-attention-is-all-you-need-Paper.pdf";
  console.log(
    process.env.BACKBLAZE_KEY_ID,
    process.env.BACKBLAZE_B2_API_KEY
  )
  const authorizationToken = await getAuthorizationTokenFromBackblaze(
    process.env.BACKBLAZE_KEY_ID,
    process.env.BACKBLAZE_B2_API_KEY
  );
  if (!authorizationToken) {
    console.log("Failed to get authorization token");
    return NextResponse.json({ error: "Failed to get authorization token" }, { status: 500 });
  }
  const response = await getDocument(
    owner_id,
    paper_title,
    "research-papers-docs",
    authorizationToken
  );
  return new NextResponse(response, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
    },
  });
  return NextResponse.json({ message: "Hello World" });
}