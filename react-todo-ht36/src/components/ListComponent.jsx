import ListItem from "./ListItem.jsx";

const ListComponent = ({ taskList, markAsDone, deleteTask }) => {
    return <ol className="task-list">
        {
            taskList.map((task, index) => (
                <ListItem
                    key={ index }
                    task={ task }
                    index={ index }
                    markAsDone={ markAsDone }
                    deleteTask={ deleteTask }
                />
            ))
        }
    </ol>
};

export default ListComponent;