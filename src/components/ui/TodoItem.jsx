/* eslint-disable react/prop-types */
import Button from "./Button";

const TodoItem = ({ task, onRemove, onEdit }) => {

  function onToggleComplete (){
    task.completed = true;
  };

  return (
    <li className={task.completed ? "completed" : "list-none"}>
      <div className="liContent flex items-center justify-between mb-5 border-b pb-2">
      <span onClick={onToggleComplete}>{task.title}</span>
      <div className="actions">
        <Button
          bgColor="#BDA042"
          buttonText="Edit"
          fun={onEdit}
        />
        <Button
          bgColor="#ca3e35"
          buttonText="Delete"
          fun={onRemove}
        />
      </div>
      </div>
      
    </li>
  );
};

export default TodoItem;
