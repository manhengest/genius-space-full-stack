const ListItem = ({ task, index, markAsDone, deleteTask }) => {
    return <li className="task-list__item" key={ index }>
        <span className={ `task-list__item-text ${ task.isDone ? "task-list__item_done" : "" }` }>
            { task.text }
        </span>
        <button onClick={ () => markAsDone(index) }>✅</button>
        <button onClick={ () => deleteTask(index) }>❌</button>
    </li>
}

export default ListItem;