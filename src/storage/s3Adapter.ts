import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

export interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region?: string;
}

export async function uploadToS3(
  config: S3Config,
  filePath: string,
  key: string
): Promise<string> {
  const s3 = new S3Client({
    region: config.region || "us-east-1",
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  const fileStream = fs.createReadStream(filePath);
  await s3.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: fileStream,
    })
  );

  const url = `https://${config.bucket}.s3.amazonaws.com/${key}`;
  console.log(`✅ Uploaded to S3: ${url}`);
  return url;
}
