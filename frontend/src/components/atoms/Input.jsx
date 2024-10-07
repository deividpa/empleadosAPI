import propTypes from 'prop-types';

const Input = ({ type = 'text', value, onChange, placeholder, name, className = '', required = false }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={`input border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-2 ${className}`}
      required={required}
    />
  );
};

export default Input;

Input.propTypes = {
    type: propTypes.string,
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    name: propTypes.string,
    className: propTypes.string,
    required: propTypes.bool,
};