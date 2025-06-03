import { Buffer } from "node:buffer";
import { DocumentMetadata } from "@/types/Document";

/**
 * Fetches an Authorization Token from Backblaze B2 using the provided Key ID and Application Key
 * @returns Authorization Token
 */
export async function getAuthorizationTokenFromBackblaze(
  BACKBLAZE_KEY_ID: string,
  BACKBLAZE_APPLICATION_KEY: string
): Promise<string | undefined> {
  const authString = `${BACKBLAZE_KEY_ID}:${BACKBLAZE_APPLICATION_KEY}`;
  const encodedAuth = Buffer.from(authString, "utf-8").toString("base64");
  console.log(authString, encodedAuth);
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${encodedAuth}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  return fetch(
    "https://api.backblazeb2.com/b2api/v3/b2_authorize_account",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result.authorizationToken;
    });
}

/**
 * Fetches an Upload URL from Backblaze B2 using the provided Authorization Token
 * @param authorizationToken - Authorization Token recieved from getAuthorizationTokenBackblaze()
 * @returns JSON Object containing the Upload URL and Upload Authorization Token
 */
export async function getUploadUrlFromBackblaze(
  authorizationToken: string,
  bucketId: string
): Promise<any> {
  const response = await fetch(
    `https://api004.backblazeb2.com/b2api/v3/b2_get_upload_url?bucketId=${bucketId}`,
    {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    }
  );
  return await response.json();
}

/**
 * Uploads file to Backblaze B2 using the provided upload URL and upload authorization token
 * @param file Blob | File | Uint8Array | ArrayBuffer | SharedArrayBuffer
 * @param fileName - Name of the file to be uploaded
 * @param uploadUrl - URL to upload the file to, recieved from getUploadUrlBackblaze()
 * @param uploadAuthToken - Authorization Token to upload the file, recieved from getUploadUrlBackblaze()
 * @returns
 */
export async function uploadFileToBackblaze(
  file: Blob | File,
  fileName: string,
  uploadUrl: string,
  uploadAuthToken: string
) {
  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      Authorization: uploadAuthToken,
      "Content-Type": "b2/x-auto",
      "X-Bz-File-Name": fileName,
      "X-Bz-Content-Sha1": "do_not_verify",
      "Content-Length": file.size.toString(),
    },
    body: file,
  });
  return await response.json();
}

export async function getDocument(
  ownerId: string,
  fileName: string,
  bucketName: string,
  authorizationToken: string
): Promise<any> {
  if(!authorizationToken) {
    return null;
  }
  const fileDownloadUrl = `https://api004.backblazeb2.com/b2api/v4/b2_download_file_by_name/${bucketName}/${fileName}/`;
  const response = await fetch(
    fileDownloadUrl,
    {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },
    }
  );

  return fetch(
    "https://api004.backblazeb2.com/file/research-papers-docs/NIPS-2017-attention-is-all-you-need-Paper.pdf",
    {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.blob())
    .catch((error) => console.error(error));
}