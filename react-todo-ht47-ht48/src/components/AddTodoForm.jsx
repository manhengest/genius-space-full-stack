import { useState } from "react";

const AddTodoForm = ({ onSubmit, onCancel, isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const creationDate = new Date().toISOString();
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      checked: String(checked),
      creationDate,
    });
    setTitle("");
    setDescription("");
    setChecked(false);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>Додати завдання</h3>
      <div className="todo-form__field">
        <label htmlFor="add-title">Назва завдання</label>
        <input
          id="add-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введіть назву"
          required
          disabled={isLoading}
        />
      </div>
      <div className="todo-form__field">
        <label htmlFor="add-description">Опис завдання</label>
        <textarea
          id="add-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введіть опис"
          rows={3}
          disabled={isLoading}
        />
      </div>
      <div className="todo-form__field todo-form__field--checkbox">
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            disabled={isLoading}
          />
          Виконана
        </label>
      </div>
      <div className="todo-form__actions">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Додавання…" : "Додати"}
        </button>
        <button type="button" onClick={onCancel} disabled={isLoading}>
          Скасувати
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
