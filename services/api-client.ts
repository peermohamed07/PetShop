import axios, { AxiosError } from 'axios';

type RequestOptions = {
  headers?: Record<string, string>;
};

export const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

function extractAxiosMessage(error: unknown) {
  if (!axios.isAxiosError(error)) {
    return 'Unexpected network error';
  }

  const axiosError = error as AxiosError<{
    error?: string;
    message?: string;
  }>;

  const responseData = axiosError.response?.data;
  const messageFromBody = responseData?.message ?? responseData?.error;

  if (messageFromBody) {
    return messageFromBody;
  }

  const rawResponseData = axiosError.response?.data as unknown;

  if (typeof rawResponseData === 'string' && rawResponseData.trim()) {
    return `Request failed with status ${axiosError.response?.status ?? 'unknown'}. The server did not return JSON.`;
  }

  if (axiosError.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  return axiosError.message || 'Network request failed';
}

export async function getJson<T>(url: string, options?: RequestOptions): Promise<T> {
  try {
    const response = await apiClient.get<T>(url, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractAxiosMessage(error));
  }
}

export async function postJson<TBody, TResult>(
  url: string,
  body: TBody,
  options?: RequestOptions
): Promise<TResult> {
  try {
    const response = await apiClient.post<TResult>(url, body, {
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(extractAxiosMessage(error));
  }
}
