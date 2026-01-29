const BASE_URL = process.env.BL_API_BASE!;
const TOKEN = process.env.BL_TOKEN!;
const FIX_MCHID = '99999';

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,

};

export async function blGet<T>(
  path: string,
  params: Record<string, string | number | undefined>
): Promise<T> {
  debugger;
  const query = new URLSearchParams(
    Object.entries({
      ...params,
      mchid: FIX_MCHID, 
    }).map(([k, v]) => [k, String(v)])
  ).toString();

  const res = await fetch(`${BASE_URL}${path}?${query}`, {
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`BL GET failed ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ===== POST =====
export async function blPost<TResponse, TRequest>(
  path: string,
  body: TRequest
): Promise<TResponse> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      ...body,
      mchid: FIX_MCHID, 
    }),
  });

  if (!res.ok) {
    throw new Error(`BL POST failed ${res.status}`);
  }

  return res.json() as Promise<TResponse>;
}
