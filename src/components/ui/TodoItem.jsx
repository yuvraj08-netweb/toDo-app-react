/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";
import EditField from "../form/EditField";
import Bin from "../../assets/Bin.svg";
import Edit from "../../assets/Edit.svg";
import Cross from "../../assets/Cross.svg";
import Save from "../../assets/Save.svg";

const TodoItem = ({ task, onRemove, onUpdate, onToggleComplete }) => {

  const [isChecked, setIsChecked] = useState(task.completed);
  const [isEdit, setIsEdit] = useState(task.isEdit);
  const [currentTitle, setCurrentTitle] = useState(task.title);

  // Updates the checked state and updates task.completed value in the local storage 
  function handleToggleComplete(event) {
    const checked = event.target.checked;
    setIsChecked(checked);
    onToggleComplete(task._id, checked);
  }

  // Provokes the edit mode ( sets the task title to input field and hides the primary buttons and show the seondary button)
  function onEdit() {
    setIsEdit(true);
  }

  // updates the value of the edited task to the latest one
  function onSave() {
    onUpdate(task._id, currentTitle);
    setIsEdit(false);
  }

  // Sets the current title to the original one when the user cancels the edit 
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
        {/* Task title and checkbox container */}
        <div className="toDoLeft flex break-all max-w-[55%]">
          {!isEdit && (
            <input
              type="checkbox"
              checked={isChecked}
              name="check"
              id="_check"
              onChange={handleToggleComplete}
            />
          )}
          <p className={`ml-3 ${isChecked ? "line-through" : ""}`}>
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
        {/* Primary Buttons Container */}
        <div className={`primaryActions flex gap-3 ${isEdit ? "hidden" : ""}`}>
          <Button
            className={`editButton`}
            bgColor={isChecked ? "#a6aba9" : "#BDA042"}
            fun={onEdit}
            disabled={isChecked}
            icon={Edit}
          />
          <Button
            className="delButton"
            bgColor="#ca3e35"
            icon={Bin}
            fun={onRemove}
          />
        </div>
        {/* Secondary Buttons Container */}
        <div
          className={`secondaryActions flex gap-3 ${
            isEdit ? "block" : "hidden"
          }`}
        >
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
