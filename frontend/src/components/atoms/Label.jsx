import propTypes from 'prop-types';

const Label = ({ htmlFor, children, className = '' }) => {
  return (
    <label htmlFor={htmlFor} className={`label font-semibold text-gray-700 ${className}`}>
      {children}
    </label>
  );
};

Label.propTypes = {
    htmlFor: propTypes.string.isRequired,
    children: propTypes.node.isRequired,
    className: propTypes.string,
};

export default Label;
