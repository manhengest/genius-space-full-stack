import ListItem from "./ListItem.jsx";
import styles from "./ListComponent.module.css";

const ListComponent = ({ taskList, markAsDone, deleteTask }) => {
    return (
        <ol className={styles.list}>
            {taskList.map((todo) => (
                <ListItem
                    key={todo.id}
                    todo={todo}
                    markAsDone={markAsDone}
                    deleteTask={deleteTask}
                />
            ))}
        </ol>
    );
};

export default ListComponent;