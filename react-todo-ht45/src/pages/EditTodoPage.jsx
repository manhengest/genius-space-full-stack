import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTodoByIdQuery } from "../hooks/useTodos";
import { useUpdateTodoMutation } from "../hooks/useTodos";
import Loader from "../components/Loader.jsx";

const EditTodoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: todo, isLoading: isLoadingTodo } = useTodoByIdQuery(id, !!id);
  const updateMutation = useUpdateTodoMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || "");
      setDescription(todo.description || "");
      setChecked(todo.checked === "true" || todo.checked === true);
    }
  }, [todo]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!todo) return;
    try {
      await updateMutation.mutateAsync({
        id: todo.id,
        todo: {
          ...todo,
          title: title.trim(),
          description: description.trim(),
          checked: String(checked),
        },
      });
      navigate("/todo-list");
    } catch (err) {
      console.error(err);
    }
  };

  const isBusy = updateMutation.isPending || isLoadingTodo;

  if (isLoadingTodo && !todo) {
    return <Loader />;
  }

  if (!todo && !isLoadingTodo) {
    return (
      <div className="error-message">
        <p>Завдання не знайдено</p>
        <Link to="/todo-list" className="link-btn link-btn--primary">
          Назад до списку
        </Link>
      </div>
    );
  }

  return (
    <div className="edit-todo-page">
      <form className="todo-form" onSubmit={handleSave}>
        <h3>Редагувати завдання</h3>
        <div className="todo-form__field">
          <label htmlFor="edit-title">Назва завдання</label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введіть назву"
            required
            disabled={isBusy}
          />
        </div>
        <div className="todo-form__field">
          <label htmlFor="edit-description">Опис завдання</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введіть опис"
            rows={3}
            disabled={isBusy}
          />
        </div>
        <div className="todo-form__field todo-form__field--checkbox">
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              disabled={isBusy}
            />
            Виконана
          </label>
        </div>
        <div className="todo-form__actions">
          <Link
            to="/todo-list"
            className={`link-btn link-btn--primary ${isBusy ? "link-btn--disabled" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (!isBusy) handleSave(e);
            }}
          >
            {isBusy ? "Збереження…" : "Зберегти"}
          </Link>
          <Link
            to="/todo-list"
            className={`link-btn link-btn--secondary ${isBusy ? "link-btn--disabled" : ""}`}
            onClick={isBusy ? (e) => e.preventDefault() : undefined}
          >
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTodoPage;
