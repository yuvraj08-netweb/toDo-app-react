/* eslint-disable react/prop-types */
const InputField = ({
  fun,
  value,
  addTask,
}) => {
  return (
    <input
      onChange={fun}
      value={value}
      type="text"
      onKeyDown={addTask}
      placeholder="Enter New Task"
      className="px-3 py-1 rounded-lg text-sm outline-none w-full text-black"
    />
  );
};

export default InputField;
