const ListItem = ({ todo, markAsDone, deleteTask }) => {
    return (
        <li className="task-list__item">
            <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => markAsDone(todo.id)}
                className="task-list__checkbox"
            />
            <span className={`task-list__item-text ${todo.isDone ? "task-list__item_done" : ""}`}>
                {todo.name}
            </span>
            <button onClick={() => deleteTask(todo.id)}>❌</button>
        </li>
    );
};

export default ListItem;