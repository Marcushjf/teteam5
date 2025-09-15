import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const envSchema = z.object({
  PORT: z.string().default("4000"),
  AWS_DEFAULT_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  LAMBDA_ENDPOINT_URL: z.string()
});

const env = envSchema.parse(process.env)

export const config = {
  port: parseInt(env.PORT),
  aws_region: env.AWS_DEFAULT_REGION,
  aws_access: env.AWS_ACCESS_KEY_ID,
  aws_secret: env.AWS_SECRET_ACCESS_KEY,
  lambda_url: env.LAMBDA_ENDPOINT_URL
}