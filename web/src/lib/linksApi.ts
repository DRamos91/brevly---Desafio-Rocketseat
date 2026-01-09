import { apiRequest, type LinkDTO } from "./api";

export async function createLink(input: {
  originalUrl: string;
  shortCode: string;
}): Promise<LinkDTO> {
  return apiRequest<LinkDTO>("/links", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listLinks(): Promise<LinkDTO[]> {
  return apiRequest<LinkDTO[]>("/links");
}

export async function deleteLink(id: string): Promise<void> {
  await apiRequest<void>(`/links/${id}`, { method: "DELETE" });
}

export async function resolveLink(shortCode: string): Promise<LinkDTO> {
  return apiRequest<LinkDTO>(`/links/resolve/${encodeURIComponent(shortCode)}`);
}

export async function incrementAccess(id: string): Promise<LinkDTO> {
  return apiRequest<LinkDTO>(`/links/${id}/access`, { method: "POST" });
}

export async function exportLinksCsv(): Promise<{ url: string; key: string }> {
  return apiRequest<{ url: string; key: string }>("/export/links", {
    method: "POST",
  });
}