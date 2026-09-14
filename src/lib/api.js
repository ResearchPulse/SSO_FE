const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.description || data.error || 'API request failed');
  return data;
}

export const api = {
  login: (payload) => request('/api/v1/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/api/v1/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  forgotPassword: (payload) => request('/api/v1/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),
  resetPassword: (payload) => request('/api/v1/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
  me: () => request('/api/v1/auth/me'),
};

export const API_BASE = API_BASE_URL;
