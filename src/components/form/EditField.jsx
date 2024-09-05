/* eslint-disable react/prop-types */

const EditField = ({ value, handleEnter, onChange }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type="text"
      onKeyDown={handleEnter}
      className="px-3 py-1 rounded-lg text-sm outline-none w-full text-black"
    />
  );
};

export default EditField;
