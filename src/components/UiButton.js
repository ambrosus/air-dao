import PropTypes from 'prop-types';

const UiButton = ({
  onClick = () => {},
  children,
  withBorder,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.target.blur();
      }}
      className={`${className} ui-button${
        withBorder ? ' ui-button_border' : ''
      }`}
      type={type}
    >
      {children}
    </button>
  );
};

UiButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  withBorder: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default UiButton;
