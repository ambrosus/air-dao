import PropTypes from 'prop-types';

const UiButton = ({
  onClick = () => {},
  children,
  withBorder,
  className = '',
  type = 'button',
  disabled = false,
  id,
}) => {
  return (
    <button
      id={id}
      onClick={(e) => {
        onClick();
        e.target.blur();
      }}
      className={`${className} ui-button ${
        withBorder ? 'ui-button_border' : ''
      } ${disabled ? 'ui-button_disabled' : ''}`}
      type={type}
      disabled={disabled}
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
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

export default UiButton;
