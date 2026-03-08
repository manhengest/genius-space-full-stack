import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/todosApi";

export const useTodosQuery = () =>
  useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

export const useTodoByIdQuery = (id, enabled) =>
  useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodoById(id),
    enabled: !!id && enabled,
  });

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, todo }) => updateTodo(id, todo),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
};
