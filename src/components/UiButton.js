const UiButton = ({ onClick, children, withBorder, className = '', type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ui-button${withBorder ? ' ui-button_border' : ''}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default UiButton;
