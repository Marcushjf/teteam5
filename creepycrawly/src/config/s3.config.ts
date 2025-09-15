import { S3Client } from "@aws-sdk/client-s3";
import { config } from "./server.config";

const s3Client = new S3Client({
  region: config.aws_region || "ap-southeast-1",
  credentials: {
    accessKeyId: config.aws_access || "",
    secretAccessKey: config.aws_secret || "",
  },
});

export default s3Client;