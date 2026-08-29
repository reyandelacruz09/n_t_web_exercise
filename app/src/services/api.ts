const API_URL = import.meta.env.VITE_API_URL || "";

export async function getApiErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const body = await response.json();

    if (body?.message) {
      return body.message;
    }
  } catch {
    // response body was not JSON
  }

  return `${fallback} (HTTP ${response.status})`;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers,
  });

  return response;
}
