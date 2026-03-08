import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../hooks/useTodos";
import ListComponent from "../components/ListComponent.jsx";
import AddTodoForm from "../components/AddTodoForm.jsx";
import Loader from "../components/Loader.jsx";

const TodoListPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const { data: todos = [], isLoading, isError } = useTodosQuery();

  useEffect(() => {
    if (isError) {
      navigate("/error-page", { replace: true });
    }
  }, [isError, navigate]);
  const createMutation = useCreateTodoMutation();
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleAddTodo = async (todo) => {
    try {
      await createMutation.mutateAsync(todo);
      setShowAddForm(false);
    } catch {
      navigate("/error-page", { replace: true });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch {
      navigate("/error-page", { replace: true });
    }
  };

  const handleToggleChecked = async (todo) => {
    const newChecked =
      todo.checked === "true" || todo.checked === true ? "false" : "true";
    try {
      await updateMutation.mutateAsync({
        id: todo.id,
        todo: { ...todo, checked: newChecked },
      });
    } catch {
      navigate("/error-page", { replace: true });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return null;
  }

  const isEmpty = !todos || todos.length === 0;

  return (
    <div className="todo-list-page">
      {isEmpty && !showAddForm ? (
        <div className="empty-state">
          <p className="empty-state__text">Наразі у вас немає ще завдань</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setShowAddForm(true)}
          >
            Додати завдання
          </button>
        </div>
      ) : (
        <>
          {!showAddForm && (
            <button
              type="button"
              className="btn btn--primary btn--add"
              onClick={() => setShowAddForm(true)}
            >
              Додати завдання
            </button>
          )}

          {showAddForm && (
            <AddTodoForm
              onSubmit={handleAddTodo}
              onCancel={() => setShowAddForm(false)}
              isLoading={createMutation.isPending}
            />
          )}

          {!isEmpty && !showAddForm && (
            <ListComponent
              taskList={todos}
              onToggleChecked={handleToggleChecked}
              onDelete={handleDeleteTodo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TodoListPage;
