import type { CreateLinkFormData } from "./validators";

export type MockLink = {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
};

const STORAGE_KEY = "brevly.links.v1";

function loadLinks(): MockLink[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MockLink[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveLinks(links: MockLink[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

function getLinksRef(): MockLink[] {
  // Sempre lê do storage para não depender de memória
  return loadLinks();
}

export async function mockCreateLink(
  data: CreateLinkFormData
): Promise<MockLink> {
  await new Promise((r) => setTimeout(r, 250));

  const links = getLinksRef();

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
  saveLinks(links);

  return link;
}

export async function mockListLinks(): Promise<MockLink[]> {
  await new Promise((r) => setTimeout(r, 150));
  return loadLinks();
}

export async function mockDeleteLink(id: string) {
  await new Promise((r) => setTimeout(r, 150));

  const links = loadLinks().filter((l) => l.id !== id);
  saveLinks(links);
}

/**
 * Resolve o encurtamento, incrementa acessos e retorna o link
 */
export async function mockResolveAndIncrement(
  shortCode: string
): Promise<MockLink> {
  await new Promise((r) => setTimeout(r, 200));

  const links = loadLinks();
  const idx = links.findIndex(
    (l) => l.shortCode.toLowerCase() === shortCode.toLowerCase()
  );

  if (idx === -1) {
    const err: any = new Error("not-found");
    err.code = "NOT_FOUND";
    throw err;
  }

  const updated: MockLink = {
    ...links[idx],
    accessCount: (links[idx].accessCount ?? 0) + 1,
  };

  links[idx] = updated;
  saveLinks(links);

  return updated;
}