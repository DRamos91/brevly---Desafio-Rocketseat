import Fastify from "fastify";
import cors from "@fastify/cors";

import { linksRoutes } from "./routes/links";
import { exportRoutes } from "./routes/export";

export const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true, // em produção, restrinja ao VITE_FRONTEND_URL
  methods: ["GET", "POST", "DELETE"],
});

await app.register(linksRoutes, { prefix: "/links" });
await app.register(exportRoutes, { prefix: "/export" });