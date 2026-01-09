import type { FastifyInstance } from "fastify";
import { stringify } from "csv-stringify/sync";
import { randomUUID } from "node:crypto";

import { db } from "../db";
import { links } from "../db/schema";
import { requireR2Env } from "../env";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function makeS3Client(r2: {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
}) {
  return new S3Client({
    region: "auto",
    endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2.accessKeyId,
      secretAccessKey: r2.secretAccessKey,
    },
  });
}

export async function exportRoutes(app: FastifyInstance) {
  app.post("/links", async (_req, reply) => {
    const r2 = requireR2Env();
    const s3 = makeS3Client(r2);

    const fileKey = `exports/${randomUUID()}.csv`;

    // Busca do banco
    const rows = await db
      .select({
        originalUrl: links.originalUrl,
        shortCode: links.shortCode,
        accessCount: links.accessCount,
        createdAt: links.createdAt,
      })
      .from(links)
      .orderBy(links.createdAt);

    // Gera CSV (em memória, estável com R2)
    const csvText = stringify(
      rows.map((r) => ({
        original_url: r.originalUrl,
        short_code: r.shortCode,
        access_count: r.accessCount,
        created_at: r.createdAt.toISOString(),
      })),
      {
        header: true,
        columns: ["original_url", "short_code", "access_count", "created_at"],
      }
    );

    const body = Buffer.from(csvText, "utf-8");

    await s3.send(
      new PutObjectCommand({
        Bucket: r2.bucket,
        Key: fileKey,
        Body: body,
        ContentType: "text/csv; charset=utf-8",
        ContentLength: body.length,
      })
    );

    const publicUrl = `${r2.publicUrl.replace(/\/$/, "")}/${fileKey}`;

    return reply.status(201).send({
      url: publicUrl,
      key: fileKey,
    });
  });
}