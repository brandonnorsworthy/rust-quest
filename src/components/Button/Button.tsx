import React from 'react';

interface MenuButtonProps {
  type?: 'info' | 'cancel' | 'confirm';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<MenuButtonProps> = ({ onClick, type, htmlType = "button", disabled, children }) => {
  let typeStyles = "";
  switch (type) {
    case "info":
      typeStyles = `bg-buttonBackground-info disabled:bg-buttonBackground text-buttonText-info hover:bg-buttonBackground-info-hover`;
      break;
    case "cancel":
      typeStyles = `bg-buttonBackground-cancel disabled:bg-buttonBackground text-buttonText-cancel hover:bg-buttonBackground-cancel-hover`;
      break;
    case "confirm":
      typeStyles = `bg-buttonBackground-confirm disabled:bg-buttonBackground text-buttonText-confirm hover:bg-buttonBackground-confirm-hover`;
      break;
    default:
      typeStyles = "bg-buttonBackground disabled:bg-buttonBackground text-buttonText hover:bg-buttonBackground-hover";
      break;
  }

  const renderChildren = () => {
    if (typeof children === 'string') {
      return children.toUpperCase();
    }
    return children;
  };

  return (
    <button
      className={`text-xl font-bold font-roboto py-3 px-6 min-w-full sm:min-w-36 transition-colors ${typeStyles}`}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {renderChildren()}
    </button>
  );
};

export default Button;