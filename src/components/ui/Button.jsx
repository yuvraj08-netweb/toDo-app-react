/* eslint-disable react/prop-types */

const Button = ({ buttonText,bgColor,fun}) => {
  return (
  <button 
  type="button"
  onClick={fun}
  style={{backgroundColor:bgColor}}
  className="text-white ml-5 font-semibold px-4 py-1 rounded-lg min-w-max"
  >
    {buttonText}
  </button>)
};

export default Button;
