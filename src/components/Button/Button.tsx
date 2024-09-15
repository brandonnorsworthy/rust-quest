import React from 'react';

interface ButtonProps {
  type?: 'info' | 'cancel' | 'confirm';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type, htmlType = "button", disabled, children }) => {
  let typeStyles = "";
  switch (type) {
    case "info":
      typeStyles = `bg-buttonBackground-info text-buttonText-info hover:bg-buttonBackground-info-hover`;
      break;
    case "cancel":
      typeStyles = `bg-buttonBackground-cancel text-buttonText-cancel hover:bg-buttonBackground-cancel-hover`;
      break;
    case "confirm":
      typeStyles = `bg-buttonBackground-confirm text-buttonText-confirm hover:bg-buttonBackground-confirm-hover`;
      break;
    default:
      typeStyles = "bg-buttonBackground text-buttonText hover:bg-buttonBackground-hover";
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
      className={`text-xl h-fit font-bold font-roboto select-none disabled:bg-buttonBackground/50 disabled:text-buttonText/25 py-3 px-6 min-w-full sm:min-w-36 transition-colors ${typeStyles}`}
      onClick={onClick}
      disabled={disabled || (!onClick && htmlType !== "submit")}
      type={htmlType}
    >
      {renderChildren()}
    </button>
  );
};

export default Button;