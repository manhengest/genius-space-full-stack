import ListItem from "./ListItem.jsx";

const ListComponent = ({ taskList, markAsDone, deleteTask }) => {
    return (
        <ol className="task-list">
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