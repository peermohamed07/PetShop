const JSON_HEADERS = {
  'Content-Type': 'application/json',
};

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null && 'error' in data
        ? String((data as { error?: string }).error)
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return parseResponse<T>(response);
}

export async function postJson<TBody, TResult>(url: string, body: TBody): Promise<TResult> {
  const response = await fetch(url, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  });

  return parseResponse<TResult>(response);
}
