"use server";

import { createClient } from "@/app/lib/s3/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function presignObject(key: string) {
  const s3client = createClient();
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: key,
  });
  try {
    console.log(key);
    const url = await getSignedUrl(s3client, command, { expiresIn: 2400 });
    return url;
  } catch (error) {
    console.error("Error presigning object", error);
  }
}
