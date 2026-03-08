import ListItem from "./ListItem.jsx";

const ListComponent = ({
  taskList,
  onToggleChecked,
  onDelete,
  onEdit,
}) => {
  return (
    <ol className="task-list">
      {taskList.map((todo) => (
        <ListItem
          key={todo.id}
          todo={todo}
          onToggleChecked={onToggleChecked}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ol>
  );
};

export default ListComponent;
