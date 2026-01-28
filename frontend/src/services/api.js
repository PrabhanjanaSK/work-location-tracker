const API_BASE = import.meta.env.VITE_API_URL;

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include", // 🔒 enforced, cannot be overridden
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Response(text || null, { status: res.status });
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
