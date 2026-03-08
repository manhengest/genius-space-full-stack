import styles from "./ListItem.module.css";

const ListItem = ({ todo, markAsDone, deleteTask }) => {
    return (
        <li className={styles.item}>
            <span className={`${styles.text} ${todo.isDone ? styles.textDone : ""}`}>
                {todo.name}
            </span>
            <div className={styles.actions}>
                <button className={styles.iconButton} onClick={() => markAsDone(todo.id)}>✅</button>
                <button className={styles.iconButton} onClick={() => deleteTask(todo.id)}>❌</button>
            </div>
        </li>
    );
};

export default ListItem;