// Shared by the Vercel function (api/status.ts) and the browser
// (hooks/useProductStatus.ts). It must not import anything.

export type Health = 'up' | 'down';

// Asks one health URL. Only a 200 counts as up; a non-200, a network error
// or no answer within `timeoutMs` is down. It never throws.
export const checkHealth = async (
  url: string,
  fetchImpl: typeof fetch = fetch,
  timeoutMs = 3000
): Promise<Health> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, {
      signal: controller.signal,
      redirect: 'manual',
    });
    return response.status === 200 ? 'up' : 'down';
  } catch {
    return 'down';
  } finally {
    clearTimeout(timer);
  }
};

// Reads the function's answer. Anything other than a plain object holding
// 'up' or 'down' for every expected slug is rejected, so a missing function
// or an HTML error page never looks like "down".
export const parseStatus = (
  body: unknown,
  slugs: string[]
): Record<string, Health> | null => {
  if (typeof body !== 'object' || body === null) return null;
  const answer = body as Record<string, unknown>;
  const result: Record<string, Health> = {};
  for (const slug of slugs) {
    const value = answer[slug];
    if (value !== 'up' && value !== 'down') return null;
    result[slug] = value;
  }
  return result;
};
