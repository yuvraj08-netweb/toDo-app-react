/* eslint-disable react/prop-types */
const InputField = ({
  _id = "addTask",
  fun,
  inType,
  value,
  addTask,
}) => {
  return (
    <input
      onChange={fun}
      id={_id}
      value={value}
      type={inType}
      onKeyDown={addTask}
      placeholder="Enter New Task"
      className="px-3 py-1 rounded-lg text-sm outline-none w-full text-black"
    />
  );
};

export default InputField;
