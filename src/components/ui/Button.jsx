/* eslint-disable react/prop-types */

const Button = ({
  className = "",
  buttonText = "",
  bgColor,
  fun,
  disabled = false,
  icon = "",
}) => {
  return (
    <button
      onClick={fun}
      type="button"
      disabled={disabled}
      style={{ backgroundColor: bgColor }}
      className={`text-white  font-semibold px-4 py-1 rounded-lg min-w-max ${className}`}
    >
      {/* checks if the provided value is text or img and dispalys accordingly */}
      {buttonText !== "" ? (
        buttonText
      ) : (
        <img src={icon} alt="Bin" className="!h-6 !w-6" />
      )}
    </button>
  );
};

export default Button;
