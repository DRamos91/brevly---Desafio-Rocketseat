import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),

  // Cloudflare R2 (opcional no dev; obrigatório apenas para exportar CSV)
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string().optional(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_BUCKET: z.string().optional(),
  CLOUDFLARE_PUBLIC_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export function requireR2Env() {
  const required = [
    "CLOUDFLARE_ACCOUNT_ID",
    "CLOUDFLARE_ACCESS_KEY_ID",
    "CLOUDFLARE_SECRET_ACCESS_KEY",
    "CLOUDFLARE_BUCKET",
    "CLOUDFLARE_PUBLIC_URL",
  ] as const;

  for (const key of required) {
    const value = env[key];
    if (!value || value.trim().length === 0) {
      throw new Error(`Missing required env var: ${key}`);
    }
  }

  return {
    accountId: env.CLOUDFLARE_ACCOUNT_ID!,
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    bucket: env.CLOUDFLARE_BUCKET!,
    publicUrl: env.CLOUDFLARE_PUBLIC_URL!,
  };
}