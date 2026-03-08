import { API_BASE } from "../config/api";

export const fetchTodos = async () => {
  const res = await fetch(`${API_BASE}/todos`);
  if (!res.ok) throw new Error("Не вдалося завантажити завдання");
  return res.json();
};

export const fetchTodoById = async (id) => {
  const res = await fetch(`${API_BASE}/todos/${id}`);
  if (!res.ok) throw new Error("Не вдалося завантажити завдання");
  return res.json();
};

export const createTodo = async (todo) => {
  const res = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Не вдалося додати завдання");
  return res.json();
};

export const updateTodo = async (id, todo) => {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Не вдалося оновити завдання");
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Не вдалося видалити завдання");
};
