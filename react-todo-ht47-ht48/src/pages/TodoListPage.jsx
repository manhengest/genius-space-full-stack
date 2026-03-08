import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../store/api/todosApi";
import ListComponent from "../components/ListComponent.jsx";
import AddTodoForm from "../components/AddTodoForm.jsx";
import Loader from "../components/Loader.jsx";

const TodoListPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const { data: todos = [], isLoading, isError } = useGetTodosQuery();

  useEffect(() => {
    if (isError) {
      navigate("/error-page", { replace: true });
    }
  }, [isError, navigate]);

  const [createTodo, { isLoading: isCreatePending }] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleAddTodo = async (todo) => {
    try {
      await createTodo(todo).unwrap();
      setShowAddForm(false);
    } catch {
      navigate("/error-page", { replace: true });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap();
    } catch {
      navigate("/error-page", { replace: true });
    }
  };

  const handleToggleChecked = async (todo) => {
    const newChecked =
      todo.checked === "true" || todo.checked === true ? "false" : "true";
    try {
      await updateTodo({
        id: todo.id,
        todo: { ...todo, checked: newChecked },
      }).unwrap();
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
              isLoading={isCreatePending}
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
