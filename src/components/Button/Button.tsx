import React from 'react';

interface MenuButtonProps {
  text: string;
  type?: 'info' | 'cancel' | 'confirm';
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<MenuButtonProps> = ({ text, onClick, type, htmlType = "button", disabled }) => {
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

  return (
    <button
      className={`text-xl font-bold font-roboto py-3 px-6 min-w-full sm:min-w-36 transition-colors ${typeStyles}`}
      onClick={onClick}
      disabled={disabled}
      type={htmlType}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default Button;