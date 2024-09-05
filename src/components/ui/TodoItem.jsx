/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import EditField from "../form/EditField";
import Bin from "../../assets/Bin.svg";
import Edit from "../../assets/Edit.svg";
import Cross from "../../assets/Cross.svg";
import Save from "../../assets/Save.svg";
const TodoItem = ({ task, onRemove,onUpdate }) => {
  const [isChecked, setIsChecked] = useState(task.completed);
  const [isEdit, setIsEdit] = useState(task.isEdit);
  const [currentTitle, setCurrentTitle] = useState(task.title);
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];

  function onToggleComplete(event) {
    const checked = event.target.checked;
    setIsChecked(checked);

    const updatedTasks = tasksArray.map((tsk) => {
      if (tsk._id === task._id) {
        return { ...tsk, completed: checked };
      } else {
        return tsk;
      }
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
 
    // setTimeout(()=>{
    //   onRemove();
    // },1000)
   
  }

  function onEdit() {
    setIsEdit(true);
  }
  function onSave() {
    onUpdate(task._id, currentTitle); 
    setIsEdit(false);  
  }
  function onCancle() {
    setIsEdit(false);
    setCurrentTitle(task.title);
  }
  // Handle input change
  function handleChange(event) {
    setCurrentTitle(event.target.value);
  }
  // Handle enter key press for saving
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      onSave();
    }
  }

  return (
    <li className="list-none">
      <div className="liContent flex items-center justify-between mb-5 border-b pb-2">
        <div className="toDoLeft flex">
          {!isEdit && (
            <input
              type="checkbox"
              checked={isChecked}
              name="check"
              id="_check"
              onChange={onToggleComplete}
            />
          )}
          <p
            className={`w-[70%] text-justify ml-3 ${
              isChecked ? "line-through" : ""
            }`}
          >
            {isEdit ? (
              <EditField
                value={currentTitle}
                handleEnter={handleKeyPress}
                onChange={handleChange}
              />
            ) : (
              task.title
            )}
          </p>
        </div>
        <div className={`primaryActions flex gap-3 ${isEdit ? "hidden" : ""}`}>
          <Button
            className={`editButton`}
            bgColor={isChecked? "#a6aba9" : "#BDA042"}
            fun={onEdit}
            disabled={isChecked}
            icon ={Edit}
          />
          <Button
            className="delButton"
            bgColor="#ca3e35"
            icon={Bin}
            fun={onRemove}
          />
        </div>
        <div className={`secondaryActions flex gap-3 ${isEdit ? "block" : "hidden"}`}>
          <Button
            className="saveButton"
            bgColor="#45BA6D"
            fun={onSave}
            icon={Save}
          />
          <Button
            className="cancelButton"
            bgColor="#FF7043"
            fun={onCancle}
            icon={Cross}
          />
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
