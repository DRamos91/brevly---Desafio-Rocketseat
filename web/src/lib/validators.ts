import { z } from "zod";

// Ajuste estas regras depois se o backend exigir outro padrão
export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .url("Informe uma URL válida (com http/https)."),
  shortCode: z
    .string()
    .trim()
    .min(3, "O encurtamento deve ter no mínimo 3 caracteres.")
    .max(40, "O encurtamento deve ter no máximo 40 caracteres.")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Use apenas letras, números, hífen (-) ou underline (_)."
    ),
});

export type CreateLinkFormData = z.infer<typeof createLinkSchema>;
