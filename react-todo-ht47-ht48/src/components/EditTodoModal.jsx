import { useState, useEffect } from "react";

const EditTodoModal = ({ todo, onSave, onClose, isLoading, isLoadingTodo }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...todo,
      title: title.trim(),
      description: description.trim(),
      checked: String(checked),
    });
  };

  const isBusy = isLoading || isLoadingTodo;

  if (isLoadingTodo && !todo) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal__loader">
            <div className="loader__spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (!todo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <form className="todo-form" onSubmit={handleSubmit}>
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
            <button type="submit" disabled={isBusy}>
              {isBusy ? "Збереження…" : "Зберегти"}
            </button>
            <button type="button" onClick={onClose} disabled={isBusy}>
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
