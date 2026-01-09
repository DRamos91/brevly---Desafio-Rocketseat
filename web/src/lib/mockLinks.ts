import type { CreateLinkFormData } from "./validators";

export type MockLink = {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
};

const links: MockLink[] = [];

export async function mockCreateLink(data: CreateLinkFormData): Promise<MockLink> {
  await new Promise((r) => setTimeout(r, 600));

  const exists = links.some(
    (l) => l.shortCode.toLowerCase() === data.shortCode.toLowerCase()
  );

  if (exists) {
    const err: any = new Error("duplicado");
    err.code = "DUPLICATE";
    throw err;
  }

  const link: MockLink = {
    id: crypto.randomUUID(),
    originalUrl: data.originalUrl,
    shortCode: data.shortCode,
    accessCount: 0,
  };

  links.unshift(link);
  return link;
}

export async function mockListLinks(): Promise<MockLink[]> {
  await new Promise((r) => setTimeout(r, 250));
  return [...links];
}

export async function mockDeleteLink(id: string) {
  await new Promise((r) => setTimeout(r, 250));
  const index = links.findIndex((l) => l.id === id);
  if (index >= 0) links.splice(index, 1);
}
