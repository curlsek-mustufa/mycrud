const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081/api/users';

async function request(path = '', options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function getAllUsers() {
  return request('');
}

export async function getUserById(id) {
  return request(`/${id}`);
}

export async function createUser(user) {
  return request('', { method: 'POST', body: JSON.stringify(user) });
}

export async function updateUser(id, user) {
  return request(`/${id}`, { method: 'PUT', body: JSON.stringify(user) });
}

export async function deleteUser(id) {
  return request(`/${id}`, { method: 'DELETE' });
}
