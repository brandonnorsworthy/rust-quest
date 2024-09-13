import React from 'react';

interface MenuButtonProps {
  text: string;
  type?: 'info' | 'cancel' | 'confirm';
  onClick: () => void;
}

const Button: React.FC<MenuButtonProps> = ({ text, onClick, type }) => {
  let typeStyles = "";
  switch (type) {
    case "info":
      typeStyles = `bg-buttonBackground-info text-buttonText-info`;
      break;
    case "cancel":
      typeStyles = `bg-buttonBackground-cancel text-buttonText-cancel`;
      break;
    case "confirm":
      typeStyles = `bg-buttonBackground-confirm text-buttonText-confirm`;
      break;
    default:
      typeStyles = "bg-buttonBackground text-buttonText";
      break;
  }

  return (
    <button
      className={[`text-xl font-bold font-roboto py-3 px-6 min-w-full sm:min-w-36`, typeStyles].join(" ")}
      onClick={onClick}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default Button;