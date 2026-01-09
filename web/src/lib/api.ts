const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error("VITE_BACKEND_URL is not set");
}

export type LinkDTO = {
  id: string;
  originalUrl: string;
  shortCode: string;
  accessCount: number;
  createdAt: string;
};

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);

  // ✅ só define JSON se tiver body
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    let body: any = null;
    try {
      body = await res.json();
    } catch {
      // ignore
    }

    const message = body?.message ?? `HTTP ${res.status}`;
    const code = body?.code;

    const err: any = new Error(message);
    err.status = res.status;
    err.code = code;
    throw err;
  }

  if (res.status === 204) return null as T;
  return (await res.json()) as T;
}
