const ListItem = ({ todo, markAsDone, deleteTask }) => {
    return (
        <li className="task-list__item">
            <span className={`task-list__item-text ${todo.isDone ? "task-list__item_done" : ""}`}>
                {todo.name}
            </span>
            <button onClick={() => markAsDone(todo.id)}>✅</button>
            <button onClick={() => deleteTask(todo.id)}>❌</button>
        </li>
    );
};

export default ListItem;