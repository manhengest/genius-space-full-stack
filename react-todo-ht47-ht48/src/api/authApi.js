import { API_BASE } from "../config/api";

export const fetchAuthStatus = async () => {
  const res = await fetch(`${API_BASE}/auth/1`);
  if (!res.ok) throw new Error("Не вдалося перевірити авторизацію");
  const data = await res.json();
  return data?.isAuthenticated ?? false;
};

export const login = async () => {
  const res = await fetch(`${API_BASE}/auth/1`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 1, isAuthenticated: true }),
  });
  if (!res.ok) throw new Error("Не вдалося увійти");
  const data = await res.json();
  return data?.isAuthenticated ?? true;
};

export const logout = async () => {
  const res = await fetch(`${API_BASE}/auth/1`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: 1, isAuthenticated: false }),
  });
  if (!res.ok) throw new Error("Не вдалося вийти");
  const data = await res.json();
  return data?.isAuthenticated ?? false;
};
