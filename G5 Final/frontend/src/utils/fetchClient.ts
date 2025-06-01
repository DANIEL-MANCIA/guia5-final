
const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchClient<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`);
  return handleResponse<T>(response);
}

export async function postClient<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function putClient<T>(endpoint: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export async function deleteClient(endpoint: string): Promise<void> {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}