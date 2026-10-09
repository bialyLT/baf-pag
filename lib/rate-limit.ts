/**
 * Rate limiting simple en memoria: 10 pedidos / 60s por IP y ámbito.
 * NOTA: en serverless (Vercel) cada instancia lleva su propio contador,
 * por lo que es mitigación básica, no garantía. Para garantía real usar
 * KV/Upstash o el firewall de Vercel. Suficiente para frenar abuso casual
 * incluso con sesión válida.
 */

const WINDOW_MS = 60_000;
const LIMIT = 10;

const hits = new Map<string, { count: number; reset: number }>();

export function checkRateLimit(req: Request, scope: string): boolean {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();

  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + WINDOW_MS });
    if (hits.size > 5000) {
      const nowMs = now;
      hits.forEach((v, k) => {
        if (v.reset < nowMs) hits.delete(k);
      });
    }
    return true;
  }

  entry.count += 1;
  return entry.count <= LIMIT;
}
