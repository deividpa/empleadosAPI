import propTypes from 'prop-types';

const Button = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
    children: propTypes.node.isRequired,
    onClick: propTypes.func,
    type: propTypes.string,
    className: propTypes.string,
};

export default Button;