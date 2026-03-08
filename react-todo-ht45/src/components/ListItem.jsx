import { Link } from "react-router-dom";

const ListItem = ({ todo, onToggleChecked, onDelete }) => {
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
        <Link
          to={`/todo-list/${todo.id}`}
          className="task-list__btn task-list__btn--edit task-list__link"
        >
          Редагувати
        </Link>
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
