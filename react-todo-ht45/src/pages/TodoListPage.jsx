import { useState } from "react";
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

  const { data: todos = [], isLoading, isError, error } = useTodosQuery();
  const createMutation = useCreateTodoMutation();
  const updateMutation = useUpdateTodoMutation();
  const deleteMutation = useDeleteTodoMutation();

  const handleAddTodo = async (todo) => {
    try {
      await createMutation.mutateAsync(todo);
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="error-message">
        <p>{error?.message || "Помилка завантаження"}</p>
        <p className="error-message__hint">
          Переконайтесь, що JSON-server запущено: <code>npm run server</code>
        </p>
      </div>
    );
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
