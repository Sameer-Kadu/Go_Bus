import propTypes from 'prop-types';
const Button = ({ title, id, rightIcon, leftIcon, containerClass, change }) => {
  return (
    <button
    onClick={change}
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      

      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};
Button.propTypes = {
  title: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  rightIcon: propTypes.element,
  leftIcon: propTypes.element,
  containerClass: propTypes.string,
  change: propTypes.func,
};
export default Button;
