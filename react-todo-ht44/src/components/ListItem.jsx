const ListItem = ({ todo, onToggleChecked, onDelete, onEdit }) => {
  const isChecked = todo.checked === "true" || todo.checked === true;

  return (
    <li className="task-list__item">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onToggleChecked(todo)}
        className="task-list__checkbox"
      />
      <div className="task-list__content">
        <span
          className={`task-list__item-title ${isChecked ? "task-list__item_done" : ""}`}
        >
          {todo.title}
        </span>
        {todo.description && (
          <span className="task-list__item-description">{todo.description}</span>
        )}
      </div>
      <div className="task-list__actions">
        <button
          type="button"
          onClick={() => onEdit(todo)}
          className="task-list__btn task-list__btn--edit"
        >
          Редагувати
        </button>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          className="task-list__btn task-list__btn--delete"
        >
          Видалити
        </button>
      </div>
    </li>
  );
};

export default ListItem;
