import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../db";
import { links } from "../db/schema";
import { and, eq, ilike } from "drizzle-orm";

const createLinkBodySchema = z.object({
  originalUrl: z.string().url(),
  shortCode: z
    .string()
    .min(3)
    .max(40)
    .regex(/^[a-zA-Z0-9-_]+$/),
});

export async function linksRoutes(app: FastifyInstance) {
  // Criar link
  app.post("/", async (request, reply) => {
    const body = createLinkBodySchema.parse(request.body);

    // checar duplicado (case-insensitive)
    const existing = await db
      .select({ id: links.id })
      .from(links)
      .where(ilike(links.shortCode, body.shortCode))
      .limit(1);

    if (existing.length > 0) {
      return reply.status(409).send({
        code: "SHORT_CODE_ALREADY_EXISTS",
        message: "URL encurtada já existente.",
      });
    }

    const [created] = await db
      .insert(links)
      .values({
        originalUrl: body.originalUrl,
        shortCode: body.shortCode,
      })
      .returning();

    return reply.status(201).send(created);
  });

  // Listar links
  app.get("/", async () => {
    const all = await db
      .select()
      .from(links)
      .orderBy(links.createdAt);

    return all;
  });

  // Deletar por ID
  app.delete("/:id", async (request, reply) => {
    const params = z.object({ id: z.string().uuid() }).parse(request.params);

    const deleted = await db.delete(links).where(eq(links.id, params.id)).returning();

    if (deleted.length === 0) {
      return reply.status(404).send({ code: "NOT_FOUND", message: "Link não encontrado." });
    }

    return reply.status(204).send();
  });

  // Resolver por shortCode (pegar URL original)
  app.get("/resolve/:shortCode", async (request, reply) => {
    const params = z
      .object({
        shortCode: z.string().min(1),
      })
      .parse(request.params);

    const found = await db
      .select()
      .from(links)
      .where(ilike(links.shortCode, params.shortCode))
      .limit(1);

    if (found.length === 0) {
      return reply.status(404).send({ code: "NOT_FOUND", message: "Link não encontrado." });
    }

    return found[0];
  });

  // Incrementar acessos por ID (padrão consistente)
  app.post("/:id/access", async (request, reply) => {
    const params = z.object({ id: z.string().uuid() }).parse(request.params);

    // Incremento atômico no banco
    const updated = await db
      .update(links)
      .set({
        accessCount: (links.accessCount as any) + 1,
      })
      .where(eq(links.id, params.id))
      .returning();

    if (updated.length === 0) {
      return reply.status(404).send({ code: "NOT_FOUND", message: "Link não encontrado." });
    }

    return updated[0];
  });
}
