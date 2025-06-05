import { NextResponse, NextRequest } from "next/server";
import {
  getDocument,
  getAuthorizationTokenFromBackblaze,
} from "@/data/documents";

export async function GET(request: NextRequest,) {
  const params = request.nextUrl.searchParams;
  const path = params.get("path");
  const authorizationToken = await getAuthorizationTokenFromBackblaze(
    process.env.BACKBLAZE_KEY_ID,
    process.env.BACKBLAZE_B2_API_KEY
  );
  if (!authorizationToken) {
    console.log("Failed to get authorization token");
    return NextResponse.json({ error: "Failed to get authorization token" }, { status: 500 });
  }
  const response = await getDocument(
    path,
    "research-papers-docs",
    authorizationToken
  );
  return new NextResponse(response, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "redirect": "follow",
    },
  });
}
